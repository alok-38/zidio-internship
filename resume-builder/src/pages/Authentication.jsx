import React from "react";
import { FaGoogle, FaGithub, FaChevronRight } from "react-icons/fa";
import { Footer } from "../containers";
import Logo from "../assets/img/logo.png";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* Top section */}
      <img
        className="w-12 h-auto object-contain transition-colors duration-300 ease-in-out hover:bg-gray-200 rounded-full p-1"
        src={Logo}
        alt="logo"
      />
      {/* Main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-orange-500 text-3xl lg:text-4xl">
          Welcome to Zidio Resume
        </h1>
        <p className="text-xl text-gray-700 italic">
          Innovative way to create resume
        </p>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          {/* Google Sign-in Button */}
          <button className="flex items-center justify-between px-4 py-3 rounded-md border-2 text-gray-800 border-gray-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 ease-in-out bg-transparent hover:bg-blue-500 hover:text-white hover:border-blue-500">
            <FaGoogle className="mr-2 " />
            <span className="flex-1">Sign-in with Google</span>
            <FaChevronRight className="ml-2" />
          </button>

          {/* GitHub Sign-in Button */}
          <button className="flex items-center justify-between px-4 py-3 rounded-md border-2 text-gray-800 border-gray-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 ease-in-out bg-transparent hover:bg-black outline-0 hover:text-white hover:border-gray-400">
            <FaGithub className="mr-2 text-black-600" />
            <span className="flex-1">Sign-in with GitHub</span>
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
