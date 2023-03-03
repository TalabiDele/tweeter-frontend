import { useState, createContext, useEffect } from "react";
import { API_URL } from "../config";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [message, setMessage] = useState("");
  const [emailMess, setEmailMess] = useState("");
  const [passMess, setPassMess] = useState("");
  const [userMess, setUserMess] = useState("");
  const [token, setToken] = useState();

  const cookies = new Cookies();

  useEffect(() => {
    checkUserloggedIn();

    // console.log(user);
  }, []);

  const register = async ({ username, email, password }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setApproved(true);
      setMessage("Login successful!");

      setToken(data.jwt);

      const decoded = jwt(data.jwt);

      cookies.set("tweeter_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      setTimeout(() => {
        setApproved(false);
      }, 10000);
    } else {
      setError(true);

      if (data.error.details.errors) {
        data.error.details.errors.forEach((e) => {
          if (e.path[0] === "email") {
            setEmailError(true);
            setEmailMess(e.message);

            setTimeout(() => {
              setEmailError(false);
            }, 10000);
          } else if (e.path[0] === "username") {
            setUserError(true);
            setUserMess(e.message);

            setTimeout(() => {
              setUserError(false);
            }, 10000);
          } else if (e.path[0] === "password") {
            setPassError(true);
            setPassMess(e.message);

            setTimeout(() => {
              setPassError(false);
            }, 10000);
          }
        });
      } else {
        setError(true);
        setMessage(data.error.message);

        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 10000);
      }
    }

    console.log(data);

    // setError(false);

    setLoading(false);
  };

  const login = async ({ identifier, password }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/auth/local?populate=*`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      // setUser(data.user);
      setApproved(true);
      setMessage("Login successful!");

      setToken(data.jwt);

      const decoded = jwt(data.jwt);

      cookies.set("tweeter_authorization", data.jwt, {
        expires: new Date(decoded.exp * 1000),
      });

      checkUserloggedIn();

      setTimeout(() => {
        setApproved(false);
      }, 10000);
    } else {
      setError(true);

      if (data.error.details.errors) {
        data.error.details.errors.forEach((e) => {
          if (e.path[0] === "identifier") {
            setEmailError(true);
            setEmailMess(e.message);

            setTimeout(() => {
              setEmailError(false);
            }, 10000);
          } else if (e.path[0] === "password") {
            setPassError(true);
            setPassMess(e.message);

            setTimeout(() => {
              setPassError(false);
            }, 10000);
          }
        });
      } else {
        setError(true);
        setMessage(data.error.message);

        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 10000);
      }
    }

    console.log(data);

    // setError(false);

    setLoading(false);
  };

  const checkUserloggedIn = async () => {
    const res = await fetch(`${API_URL}/users/me?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("tweeter_authorization")}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }

    console.log(user);
  };

  const logout = () => {
    setUser(null);
    cookies.remove("tweeter_authorization", "", {
      expires: new Date(0),
    });

    // setIsLoggedOut(true);
    setUser(null);

    return <Navigate to="/register" replace={true} />;
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        message,
        emailError,
        passError,
        userError,
        emailMess,
        passMess,
        userMess,
        loading,
        error,
        approved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
