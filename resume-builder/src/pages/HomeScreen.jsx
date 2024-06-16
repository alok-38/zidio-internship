import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, MainSpinner } from "../components";
import { HomeContainer } from "../containers";
import {
  CreateTemplate,
  UserProfile,
  CreateResume,
  TemplateDesignPinDetails,
} from "../pages";

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <Header />
      <main className="w-full">
        {/* custom routes */}
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

export default HomeScreen;
