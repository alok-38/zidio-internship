import React from "react";
import { Logo } from "../assets";
import { Footer } from "../containers";
import { AuthButtonWithProvider } from "../components";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img className="w-12 h-auto object-contain" src={Logo} alt="logo" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-orange-500 text-3xl lg:text-4xl">
          Welcome to Zidio Resume
        </h1>
        <p className="text-xl text-gray-700 italic">
          Innovative way to create resume
        </p>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6"></div>
        <AuthButtonWithProvider />
        <AuthButtonWithProvider />
      </div>
      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
