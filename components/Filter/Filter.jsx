import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

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
            <Image src={images.search} alt="search" width={20} height={20} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className={style.filter_box_right}>
          <button>
            {" "}
            <Image src={images.clear} alt="clear" width={20} height={20} />
            Clear Chat
          </button>
          <button onClick={() => setAddFriends(true)}>
            {" "}
            <Image src={images.user} alt="add friend" width={20} height={20} />
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
