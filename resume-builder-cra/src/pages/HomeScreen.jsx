import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, MainSpinner } from "../components";
import HomeContainer from "../containers/HomeContainer";
import { Suspense } from "react";
import CreateTemplate from "./CreateTemplate";

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <Header />
      <main>
        {/* custom routes */}
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<HomeContainer />}></Route>
            <Route path="/template/create" element={<CreateTemplate />}></Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default HomeScreen;
