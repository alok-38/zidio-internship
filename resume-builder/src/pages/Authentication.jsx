import React, { useEffect } from "react";
import { Logo } from "../assets";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Footer } from "../containers";
import { AuthButtonWithProvider, MainSpinner } from "../components";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase.config";
import { collection, addDoc } from "firebase/firestore";

const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  const addDataToFirestore = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Error adding document: ${error.message}`);
      throw error;
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      console.log("User data:", data);

      // Prepare the data
      const userData = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        // Include other relevant user data
      };

      // Pass data to Firestore function
      addDataToFirestore("users", userData)
        .then((docId) => {
          console.log("Data successfully added with document ID:", docId);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("Error navigating after data upload:", error);
        });
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-start px-6 py-4 gap-6">
      <img src={Logo} className="w-12 h-auto object-contain" alt="" />
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
      <Footer />
    </div>
  );
};

export default Authentication;
