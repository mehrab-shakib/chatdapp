import React, { useState, useEffect, useContext } from 'react';
import style from "../styles/alluser.module.css";
import { UserCard } from '@/components/index';
import { ChatDappContext } from '../context/ChatDappContext';

const AllUser = () => {
  const { userList, addFriend } = useContext(ChatDappContext);
  console.log(userList);

  return (
    <div>
      <div className={style.allUser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={style.allUser}>
        {userList && userList.length > 0 ? (
          userList.map((item, index) => (
            <UserCard
              key={item.accountAddress} // Use a unique value as key (accountAddress)
              index={index}
              item={item}
              addFriend={addFriend}
            />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AllUser;
