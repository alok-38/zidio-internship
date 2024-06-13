import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import MainSpinner from "../components/MainSpinner";
import HomeContainer from "../containers/HomeContainer";
import CreateTemplate from "../pages/CreateTemplate";
import UserProfile from "../pages/UserProfile";
import CreateResume from "../pages/CreateResume";
import TemplateDesignPinDetails from "../pages/TemplateDesignPinDetails";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* header */}
      <Header />
      <main className="w-full">
        {/* main component */}
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/template/create" element={<CreateTemplate />} />
            <Route path="/profile/:uid" element={<UserProfile />} />
            <Route path="/resume/*" element={<CreateResume />} />
            <Route
              path="/resumeDetail/:templateID"
              element={<TemplateDesignPinDetails />}
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
