import React from 'react';
import Image from 'next/image';
import style from "./UserCard.module.css";
import images from "../../assets";

const UserCard = ({ index, item, addFriend }) => {
  return (
    <div className={style.userCard}>
      <div className={style.userCard_box}>
        {/* Display user image */}
        <Image
          className={style.userCard_box_img}
          src={images[`image${index + 1}`]} // Ensure the image exists in your `images`
          alt="user"
          width={100}
          height={100}
        />

        <div className={style.userCard_box_info}>
          <h3>{item.name}</h3>
          <p>{item.accountAddress?.slice(0, 25)}...</p>
          {/* Add friend button */}
          <button
            onClick={() =>
              addFriend({ name: item.name, accountAddress: item.accountAddress })
            }
          >
            Add Friend
          </button>
        </div>
      </div>
      <small className={style.number}>{index + 1}</small>
    </div>
  );
};

export default UserCard;
