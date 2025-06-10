import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.isLoading);

  const toggleLogin = () => {
    setLogin(!login);
  };

  const getButtonText = () => {
    if (isLoading) return "Loading...";
    return login ? "Signup" : "Login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login) {
      const user = { email, password };
      try {
        dispatch(setIsLoading(true));
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("Login successful:", res.data);
        }

        if (res.data.success) {
          toast.success(res.data.message);
          console.log("User data:", res.data.user);
          dispatch(setUser(res.data.user));
          navigate("/browse");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      try {
        dispatch(setIsLoading(true));
        const user = { email, password, fullName };
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.loading("Waiting...");
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
          navigate("/browse");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
    const user = { email, password };
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(`${API_END_POINT}/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("Login successful:", res.data);
      }
      dispatch(setUser(res.data.user));
      navigate("/browse");
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/browse");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  return (
    <div className="flex flex-col items-center h-screen relative bg-black">
      {/* Header component */}
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh]  bg-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="banner"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/12 p-12 my-36 mx-auto items-center justify-center absolute rounded-md bg-black opacity-90"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">
          {login ? "register" : "login"}
        </h1>
        <div className="flex flex-col w-full">
          {/* Full Name (only for signup view) */}
          {login ? (
            <input
              value={fullName}
              type="text"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              name="fullName"
              placeholder="Fullname"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          ) : (
            ""
          )}
          <input
            value={email}
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />

          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
          >
            {getButtonText()}
          </button>

          <p className="text-white mt-2">
            {login ? "Already have an account?" : "New to Netflix?"}
            <span
              onClick={toggleLogin}
              className="ml-1 text-blue-900 font-medium cursor-pointer"
            >
              {login ? "Login" : "Signup"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
