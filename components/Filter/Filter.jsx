import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//Icons 
import { IoSearch } from "react-icons/io5";
import { BsBackspaceReverseFill, BsPersonFillAdd } from "react-icons/bs";

import style from "./Filter.module.css";
import images from "../../assets";
import { ChatDappContext } from "../../context/ChatDappContext";
import { Modal } from "../index";

const Filter = () => {
  const { account, addFriend } = useContext(ChatDappContext);

  const [addFriends, setAddFriends] = useState(false);

  return (
    <div className={style.filter}>
      <div className={style.filter_box}>
        <div className={style.filter_box_left}>
          <div className={style.filter_box_left_search}>
          <IoSearch size={20} color="#9df6f8" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className={style.filter_box_right}>
          <button>
            {" "}
            <BsBackspaceReverseFill size={20} color="#9df6f8" />
            Clear Chat
          </button>
          <button onClick={() => setAddFriends(true)}>
            {" "}
            <BsPersonFillAdd size={20} color="#9df6f8" />
            Add Friend
          </button>
        </div>
      </div>
      {/* //MODAL COMPONENT */}
      {addFriends && (
        <div className={style.filter_box_modal}>
          <Modal
            openBox={setAddFriends}
            title="Welcome to"
            head="ChatDapp"
            info=" Your decntralized chat app where you can connect with your friends"
            smallInfo="Kindly select your friend"
            image={images.hero}
            functionName={addFriend}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
