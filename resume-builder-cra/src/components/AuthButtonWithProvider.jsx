import React from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleClick = async () => {
    try {
      if (provider === "GoogleAuthProvider") {
        await signInWithRedirect(auth, googleProvider);
        console.log("Redirecting to Google sign-in");
      } else if (provider === "GithubAuthProvider") {
        await signInWithRedirect(auth, githubProvider);
        console.log("Redirecting to GitHub sign-in");
      }
    } catch (err) {
      console.error(`Error during ${provider} sign-in:`, err.message);
    }
  };

  const googleClasses =
    "border-gray-300 text-black hover:bg-blue-500 hover:text-white";
  const githubClasses =
    "border-gray-300 text-black hover:bg-gray-900 hover:text-white";

  return (
    <div
      onClick={handleClick}
      className={`group w-full px-4 py-3 rounded-md border-2 flex items-center justify-between cursor-pointer
      hover:shadow-md active:scale-95 duration-150 ${
        provider === "GoogleAuthProvider" ? googleClasses : githubClasses
      }`}
    >
      <Icon className="text-txtPrimary text-xl group-hover:text-white" />
      <p className="text-txtPrimary text-lg group-hover:text-white">{label}</p>
      <FaChevronRight className="text-txtPrimary text-base group-hover:text-white" />
    </div>
  );
};

export default AuthButtonWithProvider;
