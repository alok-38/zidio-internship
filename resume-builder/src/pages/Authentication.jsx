import React from "react";
import { Logo } from "../assets";
import { Footer } from "../containers";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img className="w-12 h-auto object-contain" src={Logo} alt="logo" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6"></div>
      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
