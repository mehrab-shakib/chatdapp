import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "@/utils/apiFeatures";

export const ChatDappContext = React.createContext();

export const ChatDappProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [userName, setUserName] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [userList, setUserList] = useState(null);
  const [friendMsgs, setFriendMsgs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CHAT USER DATA (who i am chatting with)

  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserAddress, setCurrentUserAddress] = useState(null);

  const router = useRouter();

  //FETCH DATAA TIME OF PAGE LOAD

  const fetchData = async () => {
    try {
      //GET Contract
      const contract = await connectingWithContract();
      //GET Account
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);
      //GET FRIEND LIST
      const friendList = await contract.getMyFriend();
      const formattedFriendList = friendList.map((friend, index) => ({
        index: index,
        accountAddress: friend.pubkey, // Correct field name
        name: friend.name,
      }));
      setFriendList(formattedFriendList);

      //GET USER LIST
      const userList = await contract.getAllAppUser();

      const formattedUserList = userList.map((user, index) => ({
        index: index,
        accountAddress: user.accountAddress,
        name: user.name,
      }));
      setUserList(formattedUserList);
    } catch (error) {
      // setError("Please install and connect your wallet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // READ MESSGAE

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);

      // Format the data properly
      const formattedMessages = read.map((msg) => ({
        senderAddress: msg[0],
        timestamp: Number(msg[1]), // Convert BigInt to Number
        message: msg[2],
      }));

      setFriendMsgs(formattedMessages);
      console.log(formattedMessages); // Check the cleaned structure
    } catch (error) {
      console.log(error);
      // setError("You dont have any messages!");
    }
  };

  // CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress) return setError("All fields are required");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating account");
      console.log(error);
    }
  };

  // ADD FRIEND
  const addFriend = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress) return setError("All fields are required");

      const contract = await connectingWithContract();
      const addFriendTx = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addFriendTx.wait();
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError("Error while adding friend");
    }
  };

  // SEND MESSAGE
  const sendMessage = async ({ friendAddress, message } = {}) => {
    try {
      // if (!message || !friendAddress)
      //   return setError("All fields are required");

      const address = ethers.getAddress(friendAddress);

      const contract = await connectingWithContract();
      const sendMessageTx = await contract.sendMessage(address, message);
      setLoading(true);
      await sendMessageTx.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while sending message");
      console.log(error);
    }
  };

  const readUser = async (userAddress) => {
    console.log(userAddress);
    const contract = await connectingWithContract();
    const userName = await contract.getUserName(userAddress);
    setCurrentUserAddress(userAddress);
    setCurrentUserName(userName);
  };

  return (
    <ChatDappContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriend,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletConnected,
        account,
        userName,
        friendList,
        userList,
        friendMsgs,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatDappContext.Provider>
  );
};
