import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const HomeScreen = lazy(() => import("../pages/HomeScreen"));
const Authentication = lazy(() => import("../pages/Authentication"));

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<HomeScreen />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </Suspense>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
