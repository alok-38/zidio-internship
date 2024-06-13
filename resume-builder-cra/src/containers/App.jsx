import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Authentication } from "../pages";
import { MainSpinner } from "../components";

const App = () => {
  return (
    <Suspense fallback={<MainSpinner />}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </Suspense>
  );
};

export default App;
