// Authentication.js
import React, { useEffect, useState } from "react";
import { Logo } from "../assets";
import { AuthButtonWithProvider } from "../components";
import { Footer } from "../containers";
import "../index.css";
import { FaGoogle, FaGithub } from "react-icons/fa";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Set a timeout to remove the animation class after the animation finishes
    const timeout = setTimeout(() => {
      setAnimationFinished(true);
    }, 5000); // Adjust to match the animation duration

    return () => clearTimeout(timeout);
  }, []);

  const { data, isLoading, isError } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data]);

  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} alt="logo" className="w-12 h-auto object-contain" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:text-4xl text-orange-600">
          Welcome to Zidio Resume
        </h1>
        <p
          className={`italic text-gray-500 text-base ${
            animationFinished ? "" : "slide-in"
          }`}
        >
          Innovative way to create resume
        </p>
        <div className="text-2xl lg:w-96 rounded-md flex flex-col items-center justify-center text-center gap-6 p-2">
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label={"Sign in with Google"}
            provider={"GoogleAuthProvider"}
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Sign in with GitHub"}
            provider={"GitHubAuthProvider"}
          />
        </div>
      </div>
      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
