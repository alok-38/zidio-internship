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
    uri: null,
    progress: 0,
  });

  const [isUploadContainerHovered, setIsUploadContainerHovered] =
    useState(false);

  // handling the input field change
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
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex flex-1 items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>
        {/* template id section*/}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID:{" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">Template1</p>
        </div>
        {/* template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border-2 focus:border-orange-400 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {/* file uploader section */}
        <div
          className={`w-full bg-orange-50 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-orange-300 cursor-pointer flex items-center justify-center ${
            isUploadContainerHovered ? "hovered" : ""
          }`}
          onMouseEnter={() => setIsUploadContainerHovered(true)}
          onMouseLeave={() => setIsUploadContainerHovered(false)}
        >
          {imageAsset.isImageLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="orange" size={40} />
              <p>{imageAsset?.progress.toFixed(2)}%</p>
            </div>
          ) : (
            !imageAsset?.uri && (
              <label className="w-full cursor-pointer h-full">
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="flex items-center justify-center cursor-pointer flex-col">
                    <FaUpload
                      className={`text-5xl ${
                        isUploadContainerHovered
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
                <input
                  type="file"
                  className="w-0 h-0"
                  accept=".jpeg,.jpg,.png"
                  onChange={handleFileSelect}
                />
              </label>
            )
          )}
        </div>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        Right Container Content
      </div>
    </div>
  );
};

export default CreateTemplate;
