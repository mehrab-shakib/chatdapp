import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//Icons
import { IoIosSend } from "react-icons/io";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

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
                
                <FaUserAlt size={30} color="#9df6f8" />
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.modal_box_right_name_info}>
              <FaWallet  size={30} color="#9df6f8"/>
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
                  
                  <IoIosSend size={30} />
                  
                  {" "}
                  Submit{" "}
                </button>

                <button onClick={() => openBox(false)}>
                  {" "}
                  {""}{" "}
                  <MdCancel size={30} color="#9df6f8" />{" "}
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
