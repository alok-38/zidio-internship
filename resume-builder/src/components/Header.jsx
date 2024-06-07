import React from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

const Header = () => {
  const { data, isLoading, isError } = useUser();
  return (
    <header
      className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b
	border-gray-300 bg-bgPrimary z-50 gap-12 sticky top-0"
    >
      {/* logo */}
      <Link to={"/"}>
        <img className="w-12 h-auto object-contain" src={Logo} alt="logo" />
      </Link>
      {/* input */}
      <div
        className="flex-1 border border-gray-300 px-4 py-1 rounded-md
	  flex items-center justfy-between bg-gray-200"
      >
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1
		h-10 bg-transparent text-base outline-none border-none"
        />
      </div>
      {/* profile */}
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#498fcd" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div></motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button>Login</motion.button>
              </Link>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
