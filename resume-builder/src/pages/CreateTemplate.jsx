import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";

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

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // handling the input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  // handle the image file changes
  const handleFileSelect = async (e) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
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
        (error) => {
          if (error.message.includes("Storage/unauthorized")) {
            toast.error(`Error: Authorization revoked`);
          } else {
            toast.error(`Error: ${error.message}`);
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              uri: downloadURL,
            }));
          });
          toast.success("Image uploaded");
          setTimeout(() => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              isImageLoading: false,
            }));
          }, 2000);
        }
      );
    } else {
      toast.info("Invalid file format.");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>

        {/* Template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:border-2 focus:text-txtDark focus:outline-none focus:border-orange-600 focus:ring-blue-500
            hover:border-orange-500 hover:text-gray-700 transition duration-200 cursor-pointer"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />

        {/* File uploader section */}
        <div
          tabIndex={0}
          className={`relative w-full bg-gray-200 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md cursor-pointer flex items-center justify-center border-2 border-gray-300
            ${isHovered || isFocused ? "border-orange-500" : ""}
            focus:outline-none`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {imageAsset.isImageLoading ? (
            <React.Fragment>
              <div className="flex flex-col items-center justify-center gap-4">
                <PuffLoader color="orange" size={40} />
                <p>{imageAsset.progress.toFixed(2)}%</p>
              </div>
            </React.Fragment>
          ) : !imageAsset.uri ? (
            <React.Fragment>
              <label className="w-full cursor-pointer h-full">
                <div className="flex items-center justify-center h-full w-full">
                  <div
                    className={`flex items-center justify-center cursor-pointer text-5xl transition duration-200 ${
                      isHovered || isFocused
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    <FaUpload />
                  </div>
                </div>
                <input
                  type="file"
                  className="w-0 h-0"
                  accept=".jpeg,.jpg,.png"
                  onChange={handleFileSelect}
                />
              </label>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={imageAsset.uri}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  alt=""
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        {/* Right container content */}
      </div>
    </div>
  );
};

export default CreateTemplate;
