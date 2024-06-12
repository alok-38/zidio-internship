import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const gitAuthProvider = new GithubAuthProvider();
  const handleClick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        console.log("Inside the Google Auth");
        break;

      case "GitHubAuthProvider":
        console.log("Inside the GitHub Auth");
        break;

      default:
        console.log("Inside the Google Auth");
        break;
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
