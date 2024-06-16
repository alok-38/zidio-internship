import React from "react";

const CreateTemplate = () => {
  return (
    <div
      className="w-full px-4 lg:px-10 2xl:px-32
  py-4 grid grid-cols-1 lg:grid-cols-12"
    >
      {/* left container */}
      <div
        className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full
      flex flex-1 items-center justify-start flex-col gap-4 px-2"
      >
        <div className="w-full">
          <p>Create a new Template</p>
        </div>
      </div>
      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">2</div>
    </div>
  );
};

export default CreateTemplate;
