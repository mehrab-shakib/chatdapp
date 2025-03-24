// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ChatDapp {
    // User struct

    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct allUser {
        address accountAddress; 
        string name;
    }

    allUser[] getAllAccounts;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    // CHECK IF THE USER EXISTS
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User Already Exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = name;
        getAllAccounts.push(allUser(msg.sender, name));
    }

    //GET USER NAME
    function getUserName(address pubkey) public view returns (string memory) {
        require(checkUserExists(pubkey), "User does not exist");
        return userList[pubkey].name;
    }

    // ADD A FRIEND

    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User not registered");
        require(msg.sender != friend_key, "Cannot add yourself as a friend");
        require(
            !checkAlreadyFriends(friend_key, msg.sender),
            "Already a friend"
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    // CHECK ALREADY FRIENDS

    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }
        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) {
                return true;
            }
        }

        return false;
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    // GET MY FRIEND

    function getMyFriend() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

// GET CHAT CODE 
    function _getChatCode(address pubkey1, address pubkey2) internal  pure returns (bytes32) {
        if (pubkey1< pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    // SEND MESSAGE 

    function sendMessage (address friend_key, string calldata _msg) external {
        require (checkUserExists(msg.sender), "Create an account first");
        require (checkUserExists(friend_key), "Friend does not exist");
        require (checkAlreadyFriends(msg.sender, friend_key), "Not a friend");
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);

        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);// add to the chat
    }

    // READ MESSAGE 

    function readMessage (address friend_key) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    // GET ALL USER 

    function getAllAppUser() public view returns (allUser[] memory) {
        return getAllAccounts;
    }
}
