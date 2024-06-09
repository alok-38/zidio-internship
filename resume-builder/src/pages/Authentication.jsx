import React from "react";
import { Logo } from "../assets";
import Footer from "../containers/Footer";
import { AuthButtonWithProvider } from "../components";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const Authentication = () => {
  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} className="w-12 h-auto object-contain" alt="logo" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-3xl lg:text-4xl text-blue-700">
          Welcome to Expressume
        </p>
        <p className="text-base text-txtPrimary">
          express way to create resume
        </p>
        <div className="w-full lg:w-96 p-4 rounded-md flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label={"Signin with Google"}
            provider={"GoogleAuthProvider"}
          />

          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Signin with GitHub"}
            provider={"GitHubAuthProvider"}
          />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
