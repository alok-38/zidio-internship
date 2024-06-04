import React from "react";
import { Logo } from "../assets";
import { AuthButtonWithProvider } from "../components";
import { Footer } from "../containers";

import {FaGoogle, FaGithub} from "react-icons/fa6"

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} className="w-12 h-auto object-contain" alt="" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:text-4xl text-blue-700">
          Welcome to Resume Rocket
        </h1>
        <p className="text-base text-gray-600">Stand Out in the Job Market</p>
        <h2 className="text-2xl text-gray-600">Authenticate</h2>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider Icon={FaGoogle} label={"SignIn with Google"} provider={"GoogleAuthProvider"}/>
          <AuthButtonWithProvider Icon={FaGithub} label={"SignIn with GitHub"} provider={"GitHubAuthProvider"}/>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
