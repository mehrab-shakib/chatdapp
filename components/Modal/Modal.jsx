import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import Style from "./Modal.module.css";
import images from "../../assets";
import { ChatDappContext } from "@/context/ChatDappContext";
import { Loader } from "../index";

// Start video from 1:40:19

const Modal = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatDappContext);
  return (
    <div className={Style.modal}>
      <div className={Style.modal_box}>
        <div className={Style.modal_box_left}>
          <Image src={image} alt="Chat-Dapp" width={700} height={700} />
        </div>
        <div className={Style.modal_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p> {info} </p>
          <small> {smallInfo} </small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.modal_box_right_name}>
              <div className={Style.modal_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.modal_box_right_name_info}>
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  type="text"
                  placeholder={address || "Enter Address"}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className={Style.modal_box_right_name_btn}>
                <button onClick={() => functionName({ name, accountAddress })}>
                  {" "}
                  {""}{" "}
                  <Image src={images.send} alt="send" width={30} height={30} />{" "}
                  Submit{" "}
                </button>

                <button onClick={() => openBox(false)}>
                  {" "}
                  {""}{" "}
                  <Image src={images.close} alt="send" width={30} height={30} />{" "}
                  Cancel{" "}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
