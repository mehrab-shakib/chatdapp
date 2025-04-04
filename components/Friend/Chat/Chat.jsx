import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//Icons
import { FaSmile } from "react-icons/fa";
import{TiAttachment} from "react-icons/ti"
import {BsFillSendFill } from "react-icons/bs"


import style from "./Chat.module.css";
import { ChatDappContext } from "@/context/ChatDappContext";
import { Modal } from "../../index";
import images from "../../../assets";
import { convertTime } from "@/utils/apiFeatures";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsgs,
  account,
  userName,
  Loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    accountAddress: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { accountAddress } = router.query;

    // Check if accountAddress exists before proceeding
    if (accountAddress) {
      setChatData(router.query);
      readUser(accountAddress); // Only call readUser when accountAddress is available
      readMessage(accountAddress); // Same for readMessage
    }
  }, [router.isReady, router.query]);

  console.log(friendMsgs);
  return (
    <div className={style.chat}>
      {currentUserName && currentUserAddress ? (
        <div className={style.chat_user_info}>
          <Image
            src={images.accountName}
            alt="username"
            width={70}
            height={70}
          />
          <div className={style.chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.chat_box_box}>
        <div className={style.chat_box}>
          <div className={style.chat_box_left}>
            {friendMsgs &&
              friendMsgs.map((item, index) => (
                <div>
                  {item.senderAddress === chatData.accountAddress ? (
                    <div className={style.chat_box_left_title}>
                      <Image
                        src={images.accountName}
                        alt="username"
                        width={50}
                        height={50}
                      />
                      <span className="style.">
                        {" "}
                        {chatData.name} {""}{""}
                        <small>Sent {convertTime(item.timestamp)}</small>{" "}
                      </span>
                    </div>
                  ) : (
                    <div className={style.chat_box_left_title}>
                      <Image
                        src={images.accountName}
                        alt="username"
                        width={50}
                        height={50}
                      />
                      <span>
                        {" "}
                        {userName} {""}{" "}
                        <small>Sent {convertTime(item.timestamp)}</small>{" "}
                      </span>
                    </div>
                  )}
                  <p
                    key={index + 1}
                    className={
                      item.senderAddress === chatData.accountAddress
                        ? style.chat_box_right_p
                        : style.chat_box_left_p
                    }
                  >
                    {item.message} {""} {""}{" "}
                  </p>
                </div>
              ))}
          </div>
        </div>
        {currentUserName && currentUserAddress ? (
          <div className={style.chat_box_send}>
            <div className={style.chat_box_send_img}>
              <FaSmile color="#9df6f8"  size={35} className={style.chat_box_send_img_bttns}  />
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
             {/* <TiAttachment  size={35} color="#9df6f8"/> */}
              {Loading == true ? (
                <Loader />
              ) : (
                <BsFillSendFill
                  color="#9df6f8"
                  size= {35}
                  className={style.chat_box_send_img_bttns}
                  onClick={() =>
                    functionName({
                      friendAddress: chatData.accountAddress,
                      message: message,
                    })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
