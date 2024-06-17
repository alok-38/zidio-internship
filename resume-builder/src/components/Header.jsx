import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { Logo } from "../assets";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { HiLogout } from "react-icons/hi";
import { FadeInOutWIthOpacity, slideUpDownMenu } from "../animations";
import { auth } from "../config/firebase.config";
import { useQueryClient } from "react-query";
import { adminIds } from "../utils/helpers";
import useFilters from "../hooks/useFilters";

const Header = () => {
  const { data, isLoading } = useUser();
  const [isMenu, setIsMenu] = useState(false);
  const queryClient = useQueryClient();
  const { data: filterData = {} } = useFilters(); // Ensure filterData is always an object

  const signOutUser = async () => {
    await auth.signOut();
    queryClient.setQueryData("user", null);
  };

  const handleSearchTerm = (e) => {
    queryClient.setQueryData("globalFilter", (prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  useEffect(() => {
    setIsMenu(false);
  }, [data]);

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-orange-300 bg-gray-200 z-50 gap-12 sticky top-0">
      <Link to="/">
        <img
          className="w-12 h-auto object-contain transition duration-300 transform hover:scale-110"
          src={Logo}
          alt="logo"
        />
      </Link>
      <div className="flex-1 px-4 py-1 rounded-md flex items-center justify-between border-2 focus-within:border-orange-500 hover:border-orange-600">
        <input
          onChange={handleSearchTerm}
          value={
            filterData && filterData.searchTerm ? filterData.searchTerm : ""
          }
          type="text"
          placeholder="Search here..."
          className="flex border px-4 py-1 rounded-md flex-1 items-center justify-between bg-gray-200 border-none outline-none h-10 focus:outline-none font-semibold cursor-pointer"
        />
        <AnimatePresence>
          {filterData.searchTerm.length > 0 && (
            <motion.div
              {...FadeInOutWIthOpacity}
              className="w-8 h-8 flex items-center justify-center bg-gray-300
          rounded-md cursor-pointer active:scale-95 duration-150"
            >
              <p className="text-2xl text-black">x</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* profile section */}
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="orange" size={40} />
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
                      src={data.photoURL}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-md"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-orange-500 shadow-md cursor-pointer">
                    <p className="text-lg text-white">{data.displayName[0]}</p>
                  </div>
                )}

                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      {...slideUpDownMenu}
                      className="absolute px-4 py-3 rounded-md right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-12"
                      onMouseLeave={() => setIsMenu(false)}
                    >
                      {data?.photoURL ? (
                        <div className="w-20 h-20 rounded-full relative flex flex-col items-center justify-center cursor-pointer">
                          <img
                            src={data.photoURL}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-orange-500 shadow-md cursor-pointer">
                          <p className="text-lg text-white">
                            {data.displayName[0]}
                          </p>
                        </div>
                      )}
                      {data.displayName && (
                        <p className="text-3xl text-orange-600">
                          {data.displayName[0]}
                        </p>
                      )}

                      <div className="w-full flex flex-col items-start gap-8 pt-6">
                        <Link
                          className="text-txtLight hover:text-orange-600 text-base whitespace-nowrap"
                          to="/profile"
                        >
                          My Account
                        </Link>
                        {adminIds.includes(data.uid) && (
                          <Link
                            className="text-txtLight hover:text-orange-600 text-base whitespace-nowrap"
                            to="/template/create"
                          >
                            Add New Template
                          </Link>
                        )}
                        <div
                          className="w-full px-2 py-2 border-t border-orange-300 flex items-center justify-between cursor-pointer"
                          onClick={signOutUser}
                        >
                          <p className="group-hover:text-orange-600 text-txtLight hover:text-orange-600 text-base whitespace-nowrap">
                            Sign Out
                          </p>
                          <HiLogout className="group-hover:text-orange-600 text-txtLight hover:text-orange-600" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <Link to="/auth">
                <motion.button
                  {...FadeInOutWIthOpacity}
                  className="px-4 py-2 rounded-md border border-orange-400 hover:bg-orange-400 hover:text-white hover:shadow-md active:scale-95 duration-150"
                  type="button"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
