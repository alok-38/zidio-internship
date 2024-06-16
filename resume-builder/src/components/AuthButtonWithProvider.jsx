// AuthButtonWithProvider.js

import React from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
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
            console.log(`Error: ${err.message}`);
          });
        break;
      case "GitHubAuthProvider":
        await signInWithPopup(auth, githubAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error: ${err.message}`);
          });
        break;
      default:
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error: ${err.message}`);
          });
        break;
    }
  };

  const getButtonStyles = () => {
    switch (provider) {
      case "GoogleAuthProvider":
        return "bg-white text-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-600 active:text-white active:scale-95 shadow-md";
      case "GitHubAuthProvider":
        return "bg-white text-gray-700 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 active:bg-gray-800 active:text-white active:scale-95 shadow-md";
      default:
        return "bg-white text-gray-700 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:bg-gray-600 active:text-white active:scale-95 shadow-md";
    }
  };

  const getLogoColor = () => {
    switch (provider) {
      case "GoogleAuthProvider":
        return "text-blue-500 group-hover:text-white";
      case "GitHubAuthProvider":
        return "text-gray-700 group-hover:text-white";
      default:
        return "text-gray-700";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full px-4 py-3 rounded-md flex items-center justify-between cursor-pointer outline-none group transition-all duration-300 ease-in-out ${getButtonStyles()}`}
    >
      <Icon
        className={`text-xl ${getLogoColor()} transition-colors duration-300 ease-in-out`}
      />
      <p className="text-lg">{label}</p>
      <FaChevronRight className="text-base" />
    </button>
  );
};

export default AuthButtonWithProvider;
