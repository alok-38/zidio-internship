import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { HiLogout } from "react-icons/hi";

const Header = () => {
  const { data, isLoading, isError } = useUser();
  const [isMenu, setIsMenu] = useState(false);
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
              <motion.div
                className="relative"
                onClick={() => setIsMenu(!isMenu)}
              >
                {data?.photoURL ? (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer">
                    <img
                      src={data?.photoURL}
                      referrerPolicy="no-referrer"
                      className="w-full
					h-full object-cover rounded-md"
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-md relative
				flex bg-blue-700 shadow-md cursor-pointer items-center justify-center"
                  >
                    <p className="text-lg text-white">{data?.displayName[0]}</p>
                  </div>
                )}
                {/* dropdown */}
                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      className="absolute px-4 py-3 rounded-md
				bg-white right-0 flex flex-col justify-start gap-3 w-64 items-center
				pt-12 top-14"
                      onMouseLeave={() => setIsMenu(!isMenu)}
                    >
                      {data?.photoURL ? (
                        <div className="w-20 h-20 rounded-full relative flex flex-col items-center justify-center cursor-pointer">
                          <img
                            src={data?.photoURL}
                            referrerPolicy="no-referrer"
                            className="w-full
					h-full object-cover rounded-full"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div
                          className="w-20 h-20 rounded-md relative
				flex bg-blue-700 shadow-md cursor-pointer items-center justify-center"
                        >
                          <p className="text-lg text-white">
                            {data?.displayName[0]}
                          </p>
                        </div>
                      )}
                      {data?.displayName && (
                        <p className="text-3xl text-dark">
                          {data?.displayName[0]}
                        </p>
                      )}
                      {/* menus */}
                      <div className="w-full flex flex-col items-start gap-8 pt-6">
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
                          Add new template
                        </Link>
                        <div
                          className="w-full px-2 py-2 border-t border-gray-300
					  flex items-center justify-between group"
                        >
                          <p className="group-hover:text-txtDark text-txtLight cursor-pointer">
                            Sign Out
                          </p>
                          <HiLogout className="group-hover:text-txtDark text-txtLight cursor-pointer" />
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
