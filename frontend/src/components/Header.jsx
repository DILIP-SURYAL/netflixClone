import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";

const Header = () => {
  return (
    <div className="absolute z-10 w-full px-6 py-3 flex items-center justify-between bg-gradient-to-b from-black">
      <img
        className="w-56"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
        alt="netflix-logo"
      />

      <div className="flex items-center space-x-4">
        <IoIosArrowDropdown size="24px" color="white" />
        <h1 className="text-lg font-semibold text-white">User Full Name</h1>
        <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
          Logout
        </button>
        <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
          Search Movie
        </button>
      </div>
    </div>
  );
};

export default Header;
