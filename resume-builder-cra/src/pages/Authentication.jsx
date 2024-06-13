import React from "react";
import { Logo } from "../assets";

const Authentication = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-start px-6 py-4 gap-6">
        {/* top */}
        <img src={Logo} className="w-12 h-auto object-contain" alt="" />
    </div>
  )
};

export default Authentication;
