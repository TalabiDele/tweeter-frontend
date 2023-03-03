import React, { useContext, useEffect, useState } from "react";
import logo from "./imgs/tweeter.svg";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import userImg from "./imgs/user.png";
import { FaChevronDown } from "react-icons/fa";
import NavDropdown from "./NavDropdown";

const Nav = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  const { user } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log(user.profile_image);

      console.log(user);
    }
  }, []);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <>
      {isDropdown && <NavDropdown />}
      <div className=" bg-white">
        <div className=" flex justify-between w-[80%] mx-auto">
          <img src={logo} alt="" />

          <ul className=" flex justify-between w-[20%] items-center h-[5rem] relative text-center">
            <li
              className={`${
                location.pathname === "/"
                  ? " font-bold text-bg_blue"
                  : " text-dark_grey font-medium"
              } w-[5rem] `}
            >
              <Link to={"/"} className="  ">
                Home
              </Link>
              {location.pathname === "/" && (
                <div className=" rounded-t-[8px] bg-bg_blue w-[5rem] h-[3px] mx-auto absolute bottom-0"></div>
              )}
            </li>
            <li
              className={`${
                location.pathname === "/explore"
                  ? " font-bold text-bg_blue"
                  : " text-dark_grey font-medium"
              } w-[5rem] `}
            >
              <Link to={"/explore"} className="">
                Explore
              </Link>
              {location.pathname === "/explore" && (
                <div className=" rounded-t-[8px] bg-bg_blue w-[5rem] h-[3px] mx-auto absolute bottom-0"></div>
              )}
            </li>
            <li
              className={`${
                location.pathname === "/bookmark"
                  ? " font-bold text-bg_blue"
                  : " text-dark_grey font-medium"
              } w-[5rem] `}
            >
              <Link to={"/bookmark"} className="">
                Bookmark
              </Link>
              {location.pathname === "/bookmark" && (
                <div className=" rounded-t-[8px] bg-bg_blue w-[5rem] h-[3px] mx-auto absolute bottom-0"></div>
              )}
            </li>
          </ul>

          <div className=" flex items-center w-[10rem] justify-between">
            {user && (
              <img
                src={
                  user.profile_image
                    ? user.profile_image.formats.thumbnail.url
                    : userImg
                }
                alt=""
                className="w-[2rem] rounded object-cover h-[2rem] "
              />
            )}

            <h1 className=" font-bold">{user && user.username}</h1>

            <FaChevronDown
              className={`${
                isDropdown ? "rotate-180" : "rotate-0"
              } transition duration-500 ease-in-out cursor-pointer`}
              onClick={() => handleDropdown()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
