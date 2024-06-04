import React from "react";
import { PuffLoader } from "react-spinners";

function MainSpinner() {
  return (
    <div className="w-screen flex h-screen items-center justify-center">
      <PuffLoader color="#498fcd" size={80} />
    </div>
  );
}

export default MainSpinner;
