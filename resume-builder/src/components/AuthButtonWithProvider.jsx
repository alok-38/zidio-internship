import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { auth } from "../config/firebase.config";

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const handleClick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error : ${err.Message}`);
          });
        break;
      case "GitHubAuthProvider":
        await signInWithRedirect(auth, githubAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error : ${err.Message}`);
          });
        break;
      default:
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error : ${err.Message}`);
          });
        break;
    }
  };

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
      border: `1px solid ${
        provider === "GoogleAuthProvider" ? "#4285F4" : "#333333"
      }`,
    };

    if (isHovered) {
      buttonStyle.backgroundColor =
        provider === "GoogleAuthProvider" ? "#4285F4" : "#333333";
      buttonStyle.color = "#ffffff";
    }

    return buttonStyle;
  };

  return (
    <div
      onClick={handleClick}
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
