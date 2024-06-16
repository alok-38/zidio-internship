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
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* left container */}
      <div
        className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full
      flex items-center justify-start flex-col gap-4 px-2"
      >
        <div className="w-full">
          <p className="text-lg text-txpPrimary">Create a new Template</p>
        </div>
        {/* template ID section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID :{" "}
          </p>
          <p
            className="text-sm text-txtDark capitalize font-bold
          "
          >
            Template 1
          </p>
        </div>
        {/* template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent
        border-orange-200 text-lg text-txtPrimary focus:text-txtDark
        focus:shadow-md outline-none focus:border-orange-600 border-2"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-red-200">
        2
      </div>
    </div>
  );
};

export default CreateTemplate;
