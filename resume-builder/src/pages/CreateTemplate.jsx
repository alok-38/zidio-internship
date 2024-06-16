import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { progress } from "framer-motion";

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

  const [isHovered, setIsHovered] = useState(false);

  // handling the input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  // handle the image file changes
  const handleFileSelect = async (e) => {
    setImageAsset((preAsset) => ({ ...preAsset, isImageLoading: true }));
    const file = e.target.files[0];
    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progress: (snapShot.bytesTransferred / snapShot.totalBytes) * 100,
          }));
        },
        (error) => toast.error(`Error : ${error.message}`),
        () => {}
      );
    } else {
      toast.info("Invalid file format...");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txpPrimary">Create a new Template</p>
        </div>
        {/* template ID section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID :
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">
            Template 1
          </p>
        </div>
        {/* template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border-orange-200 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md focus:font-semibold outline-none focus:border-orange-600 border-2"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {/* file uploader section */}
        <div
          className="w-full bg-gray-200 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-orange-30 cursor-pointer flex items-center justify-center hover:bg-orange-100 hover:shadow-lg transition duration-300 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {imageAsset.isImageLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="orange" size={40} />
              <p>{imageAsset.progress.toFixed(2)}%</p>
            </div>
          ) : (
            <label className="w-full cursor-pointer h-full">
              <div className="flex items-center justify-center h-full w-full">
                <div
                  className={`flex items-center justify-center cursor-pointer flex-col ${
                    isHovered ? "text-orange-600" : "text-gray-600"
                  }`}
                >
                  <FaUpload className="text-5xl" />
                </div>
              </div>
              <input
                type="file"
                className="w-0 h-0"
                accept=".jpeg, .jpg, .png"
                onChange={handleFileSelect}
              />
            </label>
          )}
        </div>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-red-200">
        {/* Content for the right container */}
      </div>
    </div>
  );
};

export default CreateTemplate;
