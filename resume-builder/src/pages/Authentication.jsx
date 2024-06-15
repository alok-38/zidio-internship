import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Footer } from "../containers";
import Logo from "../assets/img/logo.png";
import AuthButtonWithProvider from "../components/AuthButtonWithProvider";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* Top section */}
      <img
        className="w-12 h-auto object-contain transition-all duration-300 ease-in-out hover:bg-gray-200 rounded-full p-1"
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
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label={"Sign-In with Google"}
            provider={"GoogleAuthProvider"}
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Sign-In with GitHub"}
            provider={"GitHubAuthProvider"}
          />
        </div>
      </div>
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
