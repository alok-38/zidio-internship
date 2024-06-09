import React, { useEffect } from "react";
import { Logo } from "../assets";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Footer from "../containers/Footer";
import AuthButtonWithProvider from "../components/AuthButtonWithProvider";
import MainSpinner from "../components/MainSpinner";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const pushUserDataToFirestore = async (user) => {
      try {
        // Construct the document reference
        const userRef = doc(db, "users", user.uid);

        // Construct the user data to be written to Firestore
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
        };

        // Log document reference and user data for verification
        console.log("Document Reference:", userRef.path);
        console.log("User Data:", userData);

        // Log that setDoc function is about to be called
        console.log("About to call setDoc function");

        // Write user data to Firestore
        await setDoc(userRef, userData, { merge: true });

        // Log that setDoc function was called successfully
        console.log("setDoc function called successfully");

        console.log("User data successfully written!");
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error writing user data:", error);
      }
    };

    if (!isLoading && data) {
      pushUserDataToFirestore(data);
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-start px-6 py-4 gap-6">
      {/* top */}
      <img src={Logo} className="w-12 h-auto object-contain" alt="Logo" />
      {/* main */}
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
          />

          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Signin with GitHub"}
            provider={"signInWithGitHub"}
          />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Authentication;
