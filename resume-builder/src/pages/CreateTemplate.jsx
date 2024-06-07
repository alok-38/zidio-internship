import React, { useState } from "react";

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });
  // Handling the input field
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding property in the state object
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };
  return (
    <div
      className="w-full px-4 lg:px-10 2xl:px-32 py-4
    grid grid-cols-1 lg:grid-cols-12"
    >
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new template</p>
        </div>
        {/* template id section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID :{" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">Template1</p>
        </div>
        {/* template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          value={formData.title}
          placeholder="Template Title"
          onChange={handleInputChange}
        />
      </div>
      {/* right container */}
      <div
        className="col-span-12 lg:col-span-8 2xl:col-span-9 w-full flex-1 flex
      items-center justify-center flex-col gap-4 px-2"
      >
        2
      </div>
    </div>
  );
};

export default CreateTemplate;
