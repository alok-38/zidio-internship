import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, MainSpinner } from "../components";

const HomeContainer = lazy(() => import("../containers/HomeContainer"));
const CreateTemplate = lazy(() => import("./CreateTemplate"));
const UserProfile = lazy(() => import("./UserProfile"));
const CreateResume = lazy(() => import("./CreateResume"));
const TemplateDesignPinDetails = lazy(() =>
  import("./TemplateDesignPinDetails")
);

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header />
      <main className="w-full flex-1">
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
