import React from "react";
import { Logo } from "../assets";
import AuthButtonWithProvider from "../components/AuthButtonWithProvider";
import Footer from "../containers/Footer";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} alt="logo" className="w-12 h-auto object-contain" />
      {/* main */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="3xl lg:text-4xl text-orange-500">
          Welcome To Express Resume
        </h1>
        <p className="text-2xl text-gray-600">Express way to create resume</p>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label="Sign in with Google"
            provider="GoogleAuthProvider"
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            label="Sign in with GitHub"
            provider="GitHubAuthProvider"
          />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
