import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import style from "./Card.module.css";
import { ChatDappContext } from "@/context/ChatDappContext";
import { Modal } from "../../index";
import images from "../../../assets";

const Card = ({ index, item, readMessage, readUser }) => {
  return (
    
      <Link
        href={{
          pathname: "/",
          query: {
            name:`${item.name}`,
            accountAddress: `${item.accountAddress}`,
          },
        }}
      >
        <div
          className={style.card}
          onClick={() => (
            readMessage(item.accountAddress), readUser(item.accountAddress)
          )}
        >
          <div className={style.card_box}>
            <div className={style.card_box_left}>
              <Image
                src={images.accountName}
                alt="username"
                width={50}
                height={50}
                className={style.card_box_left_img}
              />
            </div>
            <div className={style.card_box_right}>
              <div className={style.card_box_right_middle}>
                <h4>{item.name}</h4>
                <small> {item.accountAddress?.slice(0, 25)}... </small>
              </div>
              <div className={style.card_box_right_end}>
                <small>{index + 1}</small>
              </div>
            </div>
          </div>
        </div>
      </Link>
   
  );
};

export default Card;
