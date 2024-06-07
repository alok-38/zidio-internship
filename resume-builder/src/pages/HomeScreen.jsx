import React from "react";
import { Header } from "../components";

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <Header />
      <main>{/* custom rules */}</main>
    </div>
  );
};

export default HomeScreen;
