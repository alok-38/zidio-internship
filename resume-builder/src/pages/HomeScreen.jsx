import React, { Suspense, lazy } from "react";
import { Header, MainSpinner } from "../components";
import { Routes, Route } from "react-router-dom";
import { HomeContainer } from "../containers";

// Lazy load the CreateTemplate page
const CreateTemplate = lazy(() => import("../pages/CreateTemplate"));

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header />
      <main className="w-full">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/template/create" element={<CreateTemplate />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default HomeScreen;
