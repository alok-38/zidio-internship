import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import { FaUpload } from "react-icons/fa";

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });
  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    url: null,
    progress: 0,
  });
  // Handling the input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };
  // handle the image file changes
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  return (
    <div
      className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1
  lg:grid-cols-12"
    >
      {/* Left container */}
      <div
        className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1
      flex items-center justify-start flex-col gap-4 px-2"
      >
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new template</p>
        </div>
        {/* template ID section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID :{" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">
            Template1{" "}
          </p>
        </div>
        {/* template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent
        border border-gray-300 text-lg text-txtPrimary focus-within:text-txtDark
        focus:shadow-md outline-none"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div
          className="w-full bg-gray-100 backdrop:blur-md
      h=[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2
      border-dotted border-gray-300 cursor-pointer flex items-center
      justify-center"
        >
          {imageAsset.isImageLoading ? (
            <React.Fragment>
              <div className="flex flex-col item-center justify-center gap-4">
                <PuffLoader color="#498fcd" size={40} />
                <p>{imageAsset?.progress.toFixed(2)}%</p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!imageAsset?.url ? (
                <React.Fragment>
                  <label className="w-full cursor-pointer h-full">
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <div className="flex items-center justify-center cursor-pointer flex-col">
                        <FaUpload className="text-3xl" />
                      </div>
                    </div>
                    <input
                      type="file"
                      className="w-0 h-0"
                      accept=".jpg, .jpeg, .png"
                      onClick={handleFileSelect}
                    />
                  </label>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      {/* file uploader section */}

      {/* Right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">2</div>
    </div>
  );
};

export default CreateTemplate;
