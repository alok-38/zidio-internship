import React from "react";
import useUser from "../hooks/useUser";
import { Logo } from "../assets";
import { Link } from "react-router-dom";

const Header = () => {
  const { data, isLoading, isError } = useUser();
  return (
    <header
      className="w-full flex items-center justify-between px-4 py-3 lg:px-8
	border-b border-orange-300  bg-orange-50 z-50 gap-12 sticky top-0"
    >
      {/* logo */}
      <Link to={"/"}>
        <img className="w-12 h-auto object-contain" src={Logo} alt="logo" />
      </Link>
      {/* input */}
      <div
        className="flex-1 border border-orange-300 px-4 py-1 rounded-md flex items-center justify-between"
      >
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1
		h-10 bg-transparent text-base font-semibold border-none focus:outline-0"
        />
      </div>
      {/* profile */}
    </header>
  );
};

export default Header;
