import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MainSpinner, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates";
import { useQuery } from "react-query";
import { getSavedResumes } from "../api";
import { NoData } from "../assets";

const CreateProfile = () => {
  const { data: user } = useUser();
  const { uid } = useParams();
  const [activeTab, setActiveTab] = useState("collections");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const {
    data: templates,
    isLoading: tempIsLoading,
    isError: tempIsError,
  } = useTemplates();

  const {
    data: savedResumes,
    isLoading: resumesLoading,
    isError: resumesError,
  } = useQuery(["savedResumes", user?.uid], () => getSavedResumes(user?.uid), {
    enabled: !!user?.uid,
  });

  if (tempIsLoading || resumesLoading) {
    return <MainSpinner />;
  }

  if (tempIsError) {
    return <div>Error loading templates</div>;
  }

  if (resumesError) {
    return <div>Error loading resumes</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start py-12">
      <UserProfileHeader user={user} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
        <AnimatePresence>
          {activeTab === "collections" ? (
            <TemplateGrid
              templates={templates?.filter((template) =>
                user?.collections?.includes(template?._id)
              )}
              emptyMessage="No data"
            />
          ) : (
            <TemplateGrid
              templates={savedResumes}
              emptyMessage="No Saved Resumes"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const UserProfileHeader = ({ user }) => (
  <div className="w-full h-72 bg-blue-500 relative">
    <img
      src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      alt=""
      className="w-full h-full object-cover"
    />
    <div className="flex items-center justify-center flex-col gap-4 absolute inset-0">
      <img
        src={
          user?.photoURL ||
          "https://img.freepik.com/premium-vector/adorable-cyberpunk-dj-vector_868778-499.jpg"
        }
        className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
        alt="User"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <p className="text-2xl text-txtDark">{user?.displayName}</p>
    </div>
  </div>
);

const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="flex items-center justify-center mt-12">
    {["collections", "resumes"].map((tab) => (
      <div
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer ${
          activeTab === tab
            ? "bg-white shadow-md text-blue-600"
            : "text-txtPrimary group-hover:text-blue-600"
        }`}
      >
        <p
          className={`text-base px-4 py-1 rounded-full ${
            activeTab === tab && "bg-white shadow-md text-blue-600"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </p>
      </div>
    ))}
  </div>
);

const TemplateGrid = ({ templates, emptyMessage }) => (
  <>
    {templates?.length > 0 ? (
      templates.map((template, index) => (
        <TemplateDesignPin key={template?._id} data={template} index={index} />
      ))
    ) : (
      <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
        <img
          src={NoData}
          className="w-32 h-auto object-contain"
          alt="No data"
        />
        <p>{emptyMessage}</p>
      </div>
    )}
  </>
);

export default CreateProfile;
