import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomeScreen = lazy(() => import("../pages/HomeScreen"));
const Authentication = lazy(() => import("../pages/Authentication"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<HomeScreen />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </Suspense>
  );
};

export default App;