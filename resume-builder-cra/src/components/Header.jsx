import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser"; // Ensure this is correctly imported
import { Logo } from "../assets"; // Ensure Logo is correctly imported
import { AnimatePresence, motion, useScroll } from "framer-motion"; // Ensure these are correctly imported
import { PuffLoader } from "react-spinners"; // Ensure this is correctly imported
import { HiLogout } from "react-icons/hi"; // Ensure this is correctly imported

const Header = () => {
  const { data, isLoading, isError } = useUser();
  const [isMenu, setIsMenu] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 bg-bgPrimary z-50 gap-12 sticky top-0">
      {/* Logo */}
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="w-12 h-auto object-contain" />
      </Link>

      {/* Search input */}
      <div className="flex-1 border-gray-300 px-4 py-1 rounded-md flex items-center justify-between bg-gray-200">
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none"
        />
      </div>

      {/* Profile section */}
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#498FCD" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div
                className="relative"
                onClick={() => setIsMenu(!isMenu)}
              >
                {data?.photoURL ? (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer">
                    <img
                      src={data?.photoURL}
                      alt="profile"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-orange-500 shadow-md cursor-pointer">
                    <p className="text-white text-lg">{data?.displayName[0]}</p>
                  </div>
                )}

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      className="absolute px-4 py-3 rounded-md bg-white right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-12 "
                      onMouseLeave={() => setIsMenu(false)}
                    >
                      {data?.photoURL ? (
                        <div className="w-20 h-20 rounded-md relative flex flex-col items-center justify-center cursor-pointer">
                          <img
                            src={data?.photoURL}
                            alt="profile"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-md relative flex items-center justify-center bg-orange-500 shadow-md cursor-pointer">
                          <p className="text-white text-lg">
                            {data?.displayName[0]}
                          </p>
                        </div>
                      )}
                      {data?.displayName && (
                        <p className="text-txtDark text-3xl">
                          {data?.displayName}
                        </p>
                      )}

                      {/* Menu */}
                      <div className="w-full flex-col items-start flex gap-8 p-6">
                        <Link
                          className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                          to={"/profile"}
                        >
                          My Account
                        </Link>
                        <Link
                          className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                          to={"/template/create"}
                        >
                          Add New Template
                        </Link>
                        <div className="w-full px-2 py-2 border-t border-orange-300 flex items-center justify-between group">
                          <p className="group-hover:text-txtDark text-txtLight cursor-pointer">
                            Sign Out
                          </p>
                          <HiLogout className="group-hover:text-txtDark text-txtLight" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
