import React from "react";
import useUser from "../hooks/useUser";
import { Logo } from "../assets";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

const Header = () => {
  const { data, isLoading, isError } = useUser();

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-orange-300 bg-orange-50 z-50 gap-12 sticky top-0">
      {/* logo */}
      <Link to="/">
        <img
          className="w-12 h-auto object-contain transition duration-300 transform hover:scale-110"
          src={Logo}
          alt="logo"
        />
      </Link>
      {/* input */}
      <div className="flex-1 px-4 py-1 rounded-md flex items-center justify-between border-2 focus-within:border-orange-500">
        <input
          type="text"
          placeholder="Search here..."
          className="flex border border-gray-300 px-4 py-1 rounded-md flex-1 items-center justify-between bg-orange-50 border-none outline-none h-10 focus:outline-none font-semibold"
        />
      </div>
      {/* profile */}
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="orange" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div>
                {data?.photoURL ? <div className="w-12 h-12 rounded-md relative flex items-center justify-center">
                  <img src={data?.photoURL} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-md" alt="" />
                </div> : <div></div>}
              </motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button></motion.button>
              </Link>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
