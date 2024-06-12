import React from "react";
import { Logo } from "../assets";
import Footer from "../containers/Footer";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} alt="logo" className="w-12 h-auto object-contain" />
      {/* main */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">

      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
