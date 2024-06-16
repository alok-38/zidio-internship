// Authentication.jsx

import React, { useEffect } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Footer } from "../containers";
import Logo from "../assets/img/logo.png";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { MainSpinner, AuthButtonWithProvider } from "../components";
import FirebaseTestComponent from "../components/FirebaseTestComponent";
import { auth } from "../config/firebase.config"; // Ensure auth is imported

const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]); // Added 'navigate' to the dependency array

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="auth-section">
      {/* Top section */}
      <img
        className="w-12 h-auto object-contain transition-all duration-300 ease-in-out hover:bg-gray-200 rounded-full p-1"
        src={Logo}
        alt="logo"
      />
      {/* Main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-orange-500 text-3xl lg:text-4xl">
          Welcome to Zidio Resume
        </h1>
        <p className="text-xl text-gray-700 italic">
          Innovative way to create resume
        </p>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label={"Sign-In with Google"}
            provider={"GoogleAuthProvider"}
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Sign-In with GitHub"}
            provider={"GitHubAuthProvider"}
          />
        </div>
      </div>
      {/* Include FirebaseTestComponent for testing */}
      <FirebaseTestComponent />
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
