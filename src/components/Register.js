import React, { useState, useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TiLockClosed } from "react-icons/ti";
import AuthContext from "./context/AuthContext";
import BtnLoader from "./BtnLoader";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {
    user,
    register,
    message,
    emailError,
    passError,
    userError,
    emailMess,
    userMess,
    passMess,
    loading,
    error,
    approved,
  } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    // console.log(email, username, password);

    register({ username, email, password });
  };

  return (
    <div>
      {user && <Navigate to="/" replace={true} />}
      <div className=" w-[80%] mx-auto">
        <h1 className=" text-[1rem] my-[2rem] font-semibold">Register</h1>

        {approved && <SuccessMessage />}

        {error && message && !userError && !emailError && !passError && (
          <ErrorMessage />
        )}

        <form
          action=" "
          className=" w-full my-[1rem]"
          onSubmit={handleRegister}
        >
          <div className=" relative">
            {userError && (
              <p className=" text-red-800 text-[12px] absolute -top-[1rem]">
                {userMess}
              </p>
            )}
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={` ${
                userError
                  ? "border-red-800 mb-[2rem] placeholder-red-800"
                  : "border-light_grey mb-[2rem]"
              } " border  rounded-md px-[2rem] py-[0.5rem] w-full mb-[2rem]"`}
              placeholder="Username"
            />
            <div
              className={` ${
                userError && "text-red-800"
              } absolute text-dark_grey top-3 left-2`}
            >
              <FaUserAlt />
            </div>
          </div>
          <div className=" relative">
            {emailError && (
              <p className=" text-red-800 text-[12px] absolute -top-[1rem]">
                {emailMess}
              </p>
            )}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={` ${
                emailError
                  ? "border-red-800 mb-[2rem] placeholder-red-800"
                  : "border-light_grey mb-[2rem]"
              } " border  rounded-md px-[2rem] py-[0.5rem] w-full mb-[2rem]"`}
              placeholder="Email"
            />
            <div
              className={` ${
                emailError && "text-red-800"
              } absolute text-dark_grey top-3 left-2`}
            >
              <IoMdMail />
            </div>
          </div>
          <div className=" relative">
            {passError && (
              <p className=" text-red-800 text-[12px] absolute -top-[1rem]">
                {passMess}
              </p>
            )}
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={` ${
                passError
                  ? "border-red-800 mb-[2rem] placeholder-red-800"
                  : "border-light_grey mb-[2rem]"
              } " border  rounded-md px-[2rem] py-[0.5rem] w-full mb-[2rem]"`}
              placeholder="Password"
            />
            <div
              className={` ${
                passError && "text-red-800"
              } absolute text-dark_grey top-3 left-2`}
            >
              <TiLockClosed />
            </div>
          </div>
          {loading ? (
            <BtnLoader />
          ) : (
            <button className=" bg-bg_blue text-white rounded-md w-full py-[0.6rem] hover:bg-hover transition-all duration-300 ease-in-out ">
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
