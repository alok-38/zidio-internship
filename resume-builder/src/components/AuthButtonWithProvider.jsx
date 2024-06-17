import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getButtonStyle = () => {
    let buttonStyle = {
      backgroundColor: "transparent",
      color: provider === "GoogleAuthProvider" ? "#4285F4" : "#333333",
      border: `1px solid ${provider === "GoogleAuthProvider" ? "#4285F4" : "#333333"}`,
    };

    if (isHovered) {
      buttonStyle.backgroundColor = provider === "GoogleAuthProvider" ? "#4285F4" : "#333333";
      buttonStyle.color = "#ffffff";
    }

    return buttonStyle;
  };

  return (
    <div
      className="w-full px-4 py-3 rounded-md flex items-center justify-center cursor-pointer active:scale-95 duration-150 hover:shadow-md"
      style={getButtonStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <Icon className="text-xl mr-2" />
      </div>
      <span className="flex-grow">{label}</span>
      <FaChevronRight />
    </div>
  );
};

export default AuthButtonWithProvider;
