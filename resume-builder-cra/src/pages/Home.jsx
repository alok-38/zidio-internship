import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* header */}
      <Header />
      <main>{/* main component */}</main>
    </div>
  );
};

export default Home;
