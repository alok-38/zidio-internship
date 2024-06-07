import React, {useEffect} from "react";
import { Logo } from "../assets";
import { AuthButtonWithProvider } from "../components";
import { Footer } from "../containers";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const { data, isLoading, isError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);


  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-start gap-6 px-6 py-4">
      {/* top section */}
      <img src={Logo} alt="Logo" className="w-12 h-auto object-contain" />
      {/* Main */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:text-4xl text-blue-700">
          Welcome to Expressume
        </h1>
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
            provider={"GithubAuthProvider"}
          />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
