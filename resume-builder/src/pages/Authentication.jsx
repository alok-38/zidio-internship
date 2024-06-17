import React from "react";
import { Logo } from "../assets";
import { Footer } from "../containers";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} alt="logo" className="w-12 h-auto object-contain" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center"></div>
      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
