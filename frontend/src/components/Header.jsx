import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../redux/movieSlice";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);

  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(setToggle());
  };
  const logoutHandler = async () => {};
  return (
    <div className="absolute z-10 w-full px-6 py-3 flex items-center justify-between bg-gradient-to-b from-black">
      <img
        className="w-56"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
        alt="netflix-logo"
      />

      {user && (
        <div className="flex items-center space-x-4">
          <IoIosArrowDropdown size="24px" color="white" />
          <h1 className="text-lg font-semibold text-white">{user.fullName}</h1>
          <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
            Logout
          </button>
          <button
            onClick={toggleHandler}
            className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            {toggle ? "Home" : "Search Movie"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
