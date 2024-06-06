import React from "react";
import { Logo } from "../assets";
import { Footer } from "../containers";

const Authentication = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-start gap-6 px-6 py-4">
      {/* top section */}
      <img src={Logo} alt="Logo" className="w-12 h-auto object-contain" />
      {/* Main */}
      <div className="w-full flex flex-1 flex-col items-center gap-6 justify-center"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
