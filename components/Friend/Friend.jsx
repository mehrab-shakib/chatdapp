import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import style from "./Friend.module.css";
import { ChatDappContext } from "@/context/ChatDappContext";
import { Modal } from "../index";
import images from "../../assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

const Friend = () => {
  const {
    sendMessage,
    account,
    friendList,
    readMessage,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
    friendMsgs,
  } = useContext(ChatDappContext);
  
  
  return (
    <div className={style.friend}>
      <div className={style.friend_box}>
        <div className={style.friend_box_left}>
          {friendList &&
            friendList.map((item, index) => (
              <Card
                key={index + 1}
                index={index}
                item={item}
                readMessage={readMessage}
                readUser={readUser}
              />
            ))}
        </div>
        <div className={style.friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsgs={friendMsgs}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
