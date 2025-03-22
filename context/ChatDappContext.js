import React, { useState, useEffect } from "react";
import { userRouter } from "next/router";

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

  const router = userRouter;

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
      setFriendList(friendList);
      //GET USER LIST
      const userList = await contract.getAllAppUser();
      setUserList(userList);
    } catch (error) {
      setError("Please install and connect your wallet");
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
      setFriendMsgs(read);
    } catch (error) {
      setError("You don't have Friends!");
    }
  };

  //CREATE ACCOUNT

  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress) return setError("All fields are required");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating account");
    }
  };

  // ADD YOUR FRIEND
  const addFriend = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress) return setError("All fields are required");

      const contract = await connectingWithContract();
      const addFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addFriend.wait();
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError("Error while adding friend");
    }
  };

  const sendMessage = async ({ friendAddress, message }) => {
    try {
      if (message || friendAddress) return setError("All fields are required");
      const contract = await connectingWithContract();
      const sendMessage = await contract.sendMessage(friendAddress, message);
      setLoading(true);
      await sendMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while sending message");
    }
  };

  const readUser = async (userAddress) => {
    const  contract = await connectingWithContract();
    const userName = await contract.getUserName(userAddress);
    setCurrentUserAddress(userAddress);
    setCurrentUserName(userName);
      
  }

  return (
    <ChatDappContext.Provider value={{ readMessage, createAccount, addFriend, sendMessage, readUser, account, userName, friendList, userList, friendMsgs, loading, error, currentUserName, currentUserAddress }}>
      {children}
    </ChatDappContext.Provider>
  );
};
