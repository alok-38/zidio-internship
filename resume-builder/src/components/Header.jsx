import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

const Header = () => {
  const { data, isLoading, isError } = useUser();
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
              <motion.div>
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
