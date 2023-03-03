import React from "react";
import AccountBottom from "../components/AccountBottom";
import AccountNav from "../components/AccountNav";
import Register from "../components/Register";

const Signup = () => {
  return (
    <div className=" grid items-center h-[100vh]">
      <div className="border border-light_grey w-[35rem] rounded-lg mx-auto py-[2rem]">
        <AccountNav />
        <Register />
        <AccountBottom />
      </div>
    </div>
  );
};

export default Signup;
