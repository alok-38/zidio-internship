import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { HiLogout } from "react-icons/hi";
import { slideUpDownMenu } from "../animations";
import { auth } from "../config/firebase.config";
import { useQueries, useQueryClient } from "react-query";

const Header = () => {
  const { data, isLoading, isError } = useUser();
  const [isMenu, setisMenu] = useState(false);
  const queryClient = useQueryClient();
  const signOutUser = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);
    });
  };
  return (
    <header
      className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300
	bg-bgPrimary z-50 gap-12 sticky top-0"
    >
      {/* logo */}
      <Link to={"/"}>
        <img src={Logo} alt="" className="w-12 h-auto object-contain" />
      </Link>
      {/* Inout */}
      <div
        className="flex-1 border border-gray-300 px-4 py-1 rounded-md
	  flex items-center justify-between bg-gray-200"
      >
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1
		h-10 bg-transparent text-base font-semibold outline-none border-none"
        />
      </div>
      {/* Profile search */}
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#af98fcd" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div
                className="relative"
                onClick={() => setisMenu(!isMenu)}
              >
                {data?.photoURL ? (
                  <div
                    className="w-12 h-12 rounded-md relative flex items-center
				justify-center"
                  >
                    <img
                      src={data?.photoURL}
                      referrerPolicy="no-referrer"
                      alt=""
                      className="w-full
					h-full object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-md relative flex items-center
				justify-center bg-blue-700 shadow-md"
                  >
                    <p className="text-lg text-white">{data?.email[0]}</p>
                  </div>
                )}
                {/* Dropdown menu */}
                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      {...slideUpDownMenu}
                      className="absolute px-4 py-3 rounded-md bg-white
				right-0 top-14 flex flex-col items-center justify-start gap-3
				w-64 pt-12"
                      onMouseLeave={() => setisMenu(false)}
                    >
                      {data?.photoURL ? (
                        <div
                          className="w-20 h-20 rounded-full relative flex items-center
				justify-center"
                        >
                          <img
                            src={data?.photoURL}
                            referrerPolicy="no-referrer"
                            alt=""
                            className="w-full
					h-full object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-20 h-20 rounded-full relative flex items-center
				justify-center bg-blue-700 shadow-md"
                        >
                          <p className="text-lg text-white">{data?.email[0]}</p>
                        </div>
                      )}
                      {data?.displayName && (
                        <p className="text-3xl text-txtDark">
                          {data?.displayName}
                        </p>
                      )}
                      {/* Menus */}
                      <div className="w-full flex-col items-start flex gap-8 pt-6">
                        <Link
                          className="text-txtLight hover:text-txtDark
						text-base whitespace-nowrap"
                          to={"/profile"}
                        >
                          My Account
                        </Link>
                        <Link
                          className="text-txtLight hover:text-txtDark
						text-base whitespace-nowrap"
                          to={"/template/create"}
                        >
                          Add New Template
                        </Link>
                        <div
                          className="w-full px-2 py-2 border-t
					  border-gray-300 flex items-center justify-between group cursor-pointer"
                          onClick={signOutUser}
                        >
                          <p className="group-hover:text-txtDark text-txtLight">
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
