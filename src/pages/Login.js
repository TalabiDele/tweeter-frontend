import React from "react";
import AccountBottom from "../components/AccountBottom";
import AccountNav from "../components/AccountNav";
import Signin from "../components/Signin";
import { Navigate } from "react-router-dom";

const Login = () => {
  return (
    <div className=" grid items-center h-[100vh]">
      <div className="border border-light_grey w-[35rem] rounded-lg mx-auto py-[2rem]">
        <AccountNav />
        <Signin />
        <AccountBottom />
      </div>
    </div>
  );
};

export default Login;
