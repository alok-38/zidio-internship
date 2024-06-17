import React, { useState } from "react";

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });
  // handling the input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };
  return (
    <div
      className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1
      lg:grid-cols-12"
    >
      {/* left container */}
      <div
        className="col-span-12 lg:col-span-4 2xl:col-span-3
      w-full flex-1 flex items-center justify-start flex-col gap-4 px-2"
      >
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>
        {/* template id section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID :{" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">Template1</p>
        </div>
        {/* Template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:border-2
    focus:text-txtDark focus:outline-none focus:border-orange-600 focus:ring-blue-500
    hover:border-orange-500 hover:text-gray-700 transition duration-200 cursor-pointer"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-red-300">
        2
      </div>
    </div>
  );
};

export default CreateTemplate;
