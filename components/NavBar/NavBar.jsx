import React, { useState, useEffect, useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import Style from "./Navbar.module.css";
import { ChatDappContext } from "@/context/ChatDappContext";
import { Modal, Error } from "../index";
import images from "../../assets";

const NavBar = () => {
  const menuItems = [
    { menu: "All Users", link: "alluser" },
    { menu: "Chat", link: "/" },
    { menu: "Contacts", link: "/" },
    { menu: "Terms of Use", link: "/" },
  ];

  //USE STATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { account, userName, connectWallet, createAccount, error } =
    useContext(ChatDappContext);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((item, index) => (
              <div
                onClick={() => setActive(index + 1)}
                key={index + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active === index + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={item.link}
                >
                  {item.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((item, index) => (
                <div
                  onClick={() => setActive(index + 1)}
                  key={index + 1}
                  className={`${Style.mobile_menu_items} ${
                    active === index + 1 ? Style.active_btn : ""}`
                    }
                >
                  <Link
                    className={Style.mobile_menu_items_link}
                    href={item.link}
                  >
                    {item.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={20}
                  height={20}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* Connect Wallet */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModal(true)}>
                <Image
                  src={userName ? images.accountName : images.create}
                  alt="Account Image"
                  width={20}
                  height={20}
                />
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="menu" width={30} height={30} />
          </div>
        </div>
      </div>
      {/* MODAL COMPONENT */}
      {openModal && (
        <div className={Style.modalBox}>
          <Modal
            openBox={setOpenModal}
            title="Welcome to"
            head="ChatDapp"
            info="Create your account and start your chat with your friends. You can also create groups and invite your friends."
            smallInfo="Kindly Select your name and wallet address."
            image={images.hero}
            functionName={createAccount}
            address= {account}
          />
        </div>
      )}

      {error && <Error error={error} />}

    </div>
  );
};

export default NavBar;
