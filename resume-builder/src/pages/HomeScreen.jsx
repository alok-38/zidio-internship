import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, MainSpinner } from "../components";
import HomeContainer from "../containers/HomeContainer";

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
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default HomeScreen;
