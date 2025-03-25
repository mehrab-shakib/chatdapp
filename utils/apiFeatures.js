import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";

import { ChatDappABI, ChatDappAddress } from "../context/constants";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};
const fetchContract = (signerOrProvider) => {
  return new Contract(ChatDappAddress, ChatDappABI, signerOrProvider);
};

export const connectingWithContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);

    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    return contract;

    // Add any additional logic to interact with the contract here
  } catch (error) {
    console.error("Failed to connect with contract:", error);
    console.log(error);
  }
};

// export const convertTime = (timestamp) => {
//   try {
//     // timestamp is already a bigint, convert to number
//     const timeInSeconds = Number(timestamp); // Safely convert if within JS number limits
//     const timeInMs = timeInSeconds * 1000; // Convert to milliseconds

//     const newTime = new Date(timeInMs);

//     const realTime =
//       newTime.getHours() +
//       ":" +
//       newTime.getMinutes() +
//       ":" +
//       newTime.getSeconds() +
//       " Date: " +
//       newTime.getDate() +
//       "/" +
//       (newTime.getMonth() + 1) +
//       "/" +
//       newTime.getFullYear();

//     return realTime;
//   } catch (error) {
//     console.log("Error converting time:", error);
//     return "Invalid Timestamp";
//   }
// };

export const convertTime = (timestamp) => {
  try {
    const timeInSeconds = Number(timestamp); // Safely convert if within JS number limits
    const timeInMs = timeInSeconds * 1000; // Convert to milliseconds

    const newTime = new Date(timeInMs);

    const now = new Date();
    const diffInMs = now - newTime; // Difference between now and the message timestamp
    const diffInMinutes = diffInMs / (1000 * 60); // Convert to minutes
    const diffInHours = diffInMs / (1000 * 60 * 60); // Convert to hours
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Convert to days

    // Check if the message is from today, yesterday, or a different day
    if (diffInDays < 1) {
      // Today
      const hours = newTime.getHours();
      const minutes = newTime.getMinutes();
      const period = hours >= 12 ? "PM" : "AM"; // Determine if it's AM or PM
      const formattedTime = `${hours % 12 || 12}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${period}`;
      return formattedTime;
    } else if (diffInDays < 2) {
      // Yesterday
      return "Yesterday";
    } else {
      // Show full date for older messages
      const date = newTime.getDate();
      const month = newTime.getMonth() + 1; // Months are zero-based
      const year = newTime.getFullYear();
      return `${date < 10 ? "0" + date : date}/${
        month < 10 ? "0" + month : month
      }/${year}`;
    }
  } catch (error) {
    console.log("Error converting time:", error);
    return "Invalid Timestamp";
  }
};
