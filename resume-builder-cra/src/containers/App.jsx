import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "./HomeContainer"; // Corrected import
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainSpinner } from "../components";
import Authentication from "../pages/Authentication";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<MainSpinner />}>
        <Routes>
          <Route path="/*" element={<HomeContainer />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" theme="dark" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
