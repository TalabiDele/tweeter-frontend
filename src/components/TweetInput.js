import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import userImg from "./imgs/user.png";
import { FaRegImage } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import InputDropdown from "./InputDropdown";

const TweetInput = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  const { user } = useContext(AuthContext);

  const handleIsDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className=" bg-white rounded-md py-[1rem] px-[2rem] w-[60%] mx-auto my-[2rem] relative">
      {isDropdown && <InputDropdown />}
      {/* <InputDropdown /> */}
      <div className=" w-full">
        <h1 className=" pb-[1rem] border-b border-b-hover_bg mb-[1rem] font-bold text-dark_grey">
          Tweet Something
        </h1>

        <div className=" grid grid-cols-[5%_minmax(95%,_1fr)] w-[100%] mx-auto">
          {user && (
            <img
              src={
                user.profile_image
                  ? user.profile_image.formats.small.url
                  : userImg
              }
              alt=""
              className=" w-[3rem] h-[3rem] object-cover rounded mr-[1rem]"
            />
          )}

          <form action=" grid">
            <textarea
              name="tweet"
              id="tweet"
              cols="30"
              rows="3"
              placeholder="What's happening?"
              className=" w-full p-[1rem] mb-[1rem] h-[8rem]"
            ></textarea>

            <div className=" text-bg_blue flex justify-between w-full items-center">
              <div className=" flex">
                <FaRegImage className=" text-2xl cursor-pointer mr-[1rem]" />

                <GoGlobe
                  className=" text-2xl cursor-pointer mr-[1rem]"
                  onClick={() => handleIsDropdown()}
                />
                <p>Everyone can reply</p>
              </div>

              <button className=" bg-bg_blue text-white rounded px-[1rem] py-[0.5rem]">
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;
