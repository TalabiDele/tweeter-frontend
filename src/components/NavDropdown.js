import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { motion as m } from "framer-motion";
import { Navigate } from "react-router-dom";

const NavDropdown = () => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
      className=" absolute right-[8rem] top-[6rem] overflow-y-hidden"
    >
      {!user && <Navigate to={"/login"} replace={true} />}
      <div className=" bg-white rounded-md shadow-md text-dark_grey font-semibold w-[15rem]">
        <ul className=" px-[2rem] py-[1rem]">
          <div className=" pb-[1rem] mb-[1rem] border-b border-hover_grey">
            <li className=" flex items-center hover:bg-hover_bg rounded-md transition ease-in-out duration-75 p-[1rem] cursor-pointer">
              <FaUserCircle className=" text-2xl mr-[1rem]" />
              <Link to={"/profile"}>My Profile</Link>
            </li>
            <li className=" flex items-center hover:bg-hover_bg rounded-md transition ease-in-out duration-75 p-[1rem] cursor-pointer">
              <FaUserFriends className=" text-2xl mr-[1rem]" />
              <Link to={"/chat"}>Group Chat</Link>
            </li>
            <li className=" flex items-center hover:bg-hover_bg rounded-md transition ease-in-out duration-75 p-[1rem] cursor-pointer">
              <RiSettings5Fill className=" text-2xl mr-[1rem]" />
              <Link to={"/settings"}>Settings</Link>
            </li>
          </div>

          <li
            className=" flex items-center hover:bg-hover_bg rounded-md transition ease-in-out duration-75 p-[1rem] cursor-pointer text-danger"
            onClick={() => handleLogout()}
          >
            <FiLogOut className=" text-2xl mr-[1rem]" />
            <h1>Logout</h1>
          </li>
        </ul>
      </div>
    </m.div>
  );
};

export default NavDropdown;
