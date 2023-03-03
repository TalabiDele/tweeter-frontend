import React from "react";
import { FaGoogle, FaFacebookSquare } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const AccountBottom = () => {
  const location = useLocation();

  return (
    <div>
      <div className=" text-dark_grey w-[80%] mx-auto text-center">
        <p className=" text-[14px] ">or continue with these social profiles</p>

        <div className=" flex w-[5rem] justify-between items-center text-center mx-auto my-[0.5rem] text-dark_grey">
          <div className=" border rounded-full w-[2rem] h-[2rem] border-light_grey hover:border-bg_blue transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer hover:text-bg_blue">
            <FaGoogle />
          </div>
          <div className=" border rounded-full w-[2rem] h-[2rem] border-light_grey hover:border-bg_blue transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer hover:text-bg_blue">
            <FaFacebookSquare />
          </div>
        </div>

        {location.pathname === "/register" ? (
          <p className=" text-[14px]">
            Already a member?{" "}
            <Link to={"/login"}>
              <span className=" text-text_blue cursor-pointer hover:underline-offset-2 hover:underline  transition-all ease-in-out duration-300">
                Login
              </span>
            </Link>
          </p>
        ) : (
          <p className=" text-[14px]">
            Don't have an account yet?{" "}
            <Link to={"/register"}>
              <span className=" text-text_blue cursor-pointer underline hover:underline-offset-2 hover:underline  transition-all ease-in-out duration-300">
                Register
              </span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountBottom;
