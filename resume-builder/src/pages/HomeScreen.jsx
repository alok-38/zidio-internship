import React, { Suspense, lazy } from "react";
import { Header, MainSpinner } from "../components";
import { Routes, Route } from "react-router-dom";
import { HomeContainer } from "../containers";

// Lazy load the pages
const UserProfile = lazy(() => import("../pages/UserProfile"));
const CreateTemplate = lazy(() => import("../pages/CreateTemplate"));
const CreateResume = lazy(() => import("../pages/CreateResume"));
const TemplateDesignPinDetails = lazy(() =>
  import("../pages/TemplateDesignPinDetails")
);

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header />
      <main className="w-full">
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
