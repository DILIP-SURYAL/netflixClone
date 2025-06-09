import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Login = () => {
  const [login, setLogin] = useState(true);
  const isLoading = useSelector((state) => state.isLoading);

  const toggleLogin = () => {
    setLogin(!login);
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

      <form className="flex flex-col w-3/12 p-12 my-36 mx-auto items-center justify-center absolute rounded-md bg-black opacity-90">
        <h1 className="text-3xl text-white mb-5 font-bold">Login</h1>
        <div className="flex flex-col w-full">
          {/* Full Name (only for signup view) */}
          {login ? (
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />

          <button
            type="button"
            className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
          >
            {isLoading ? "Loading..." : login ? "Signup" : "Login"}
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
