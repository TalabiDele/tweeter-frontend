import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { motion as m } from "framer-motion";
import { Navigate } from "react-router-dom";
import { GoGlobe } from "react-icons/go";

const InputDropdown = () => {
  return (
    <m.div
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      exit={{ y: "-100%" }}
      className=" absolute left-[7rem] top-[18rem] overflow-y-hidden"
    >
      <div className=" bg-white rounded-md shadow-lg text-dark_grey font-light w-[20rem]">
        <div className=" px-[2rem] pt-[1rem]">
          <h1 className=" text-md font-semibold">Who can reply?</h1>
          <p className=" font-light text-sm">Choose who can reply this tweet</p>
        </div>
        <ul className=" px-[2rem] py-[1rem]">
          <div className=" mb-[1rem]">
            <li className=" flex items-center hover:bg-hover_bg rounded-md transition ease-in-out duration-75 p-[1rem] cursor-pointer">
              <GoGlobe className=" text-2xl cursor-pointer mr-[1rem]" />
              <p className=" text-sm">Everyone</p>
            </li>
            <li className=" flex items-center hover:bg-hover_bg rounded-md transition ease-in-out duration-75 p-[1rem] cursor-pointer">
              <FaUserFriends className=" text-2xl mr-[1rem]" />
              <p className=" text-sm">People you follow</p>
            </li>
          </div>
        </ul>
      </div>
    </m.div>
  );
};

export default InputDropdown;
