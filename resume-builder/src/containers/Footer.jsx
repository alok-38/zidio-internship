import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-300">
      <div className="py-3">
        <img className="w-8 h-auto object-contain" src={Logo} alt="logo" />
      </div>
      <div className="flex gap-6 items-center justify-center">
        <Link
          to={"/"}
          className="text-orange-500 text-sm transition duration-300 ease-in-out group hover:text-orange-700"
        >
          Home
        </Link>
        <Link
          to={"/"}
          className="text-orange-500 text-sm transition duration-300 ease-in-out group hover:text-orange-700"
        >
          Contact
        </Link>
        <Link
          to={"/"}
          className="text-orange-500 text-sm whitespace-nowrap transition duration-300 ease-in-out group hover:text-orange-700"
        >
          Privacy policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
