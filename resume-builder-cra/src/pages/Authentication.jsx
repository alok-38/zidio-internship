import React, { useEffect } from "react";
import { Logo } from "../assets";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Footer } from "../containers";
import { AuthButtonWithProvider, MainSpinner } from "../components";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const { data, isLoading, isError } = useUser();
  const navigate = useNavigate();

  // Redirect to home if user is authenticated
  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <MainSpinner />;
  }

  if (isError) {
    return <p>Error loading user data. Please try again.</p>;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-start px-6 py-4 gap-6">
      {/* Top section */}
      <img
        src={Logo}
        className="w-12 h-auto object-contain"
        alt="Expressume Logo"
      />

      {/* Main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-3xl lg:text-4xl text-blue-700">
          Welcome to Expressume
        </p>
        <p className="text-base text-txtPrimary">
          express way to create resume
        </p>
        <p className="text-2xl text-gray-600">Authenticate</p>

        <div className="w-full lg:w-96 p-4 rounded-md flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label={"Signin with Google"}
            provider={"GoogleAuthProvider"}
            aria-label="Sign in with Google"
          />

          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Signin with GitHub"}
            provider={"GitHubAuthProvider"}
            aria-label="Sign in with GitHub"
          />
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
