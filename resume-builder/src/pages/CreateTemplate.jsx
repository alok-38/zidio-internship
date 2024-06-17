import React, { useState, useEffect } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { initialTags } from "../utils/helpers";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { useTemplates } from "../hooks/useTemplates";
import { db } from "../config/firebase.config";
import { doc } from "firebase/firestore";

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

  const [selectedTags, setSelectedTags] = useState([]);

  const {
    data: templates,
    isError: templatesIsError,
    isLoading: templatesIsLoading,
    refetch: templatesRefetch,
  } = useTemplates();

  const [isTrashHovered, setIsTrashHovered] = useState(false);
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
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progress,
          }));
        },
        (error) => {
          if (error.code === "storage/unauthorized") {
            toast.error(`Error: Authorization revoked`);
          } else {
            toast.error(`Error: ${error.message}`);
          }
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            isImageLoading: false,
          }));
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

  // action to delete an image from the cloud
  const deleteAnImageObject = async () => {
    if (!imageAsset.uri) return;

    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const deleteRef = ref(storage, imageAsset.uri);

    deleteObject(deleteRef)
      .then(() => {
        toast.success("Image removed");
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          progress: 0,
          uri: null,
          isImageLoading: false,
        }));
      })
      .catch((error) => {
        toast.error(`Error deleting image: ${error.message}`);
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          isImageLoading: false,
        }));
      });
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleSelectedTags = (tag) => {
    // check if the tag is selected or not
    if (selectedTags.includes(tag)) {
      // if selected then remove it
      setSelectedTags(selectedTags.filter((selected) => selected !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const pushToCloud = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const nextTemplateName =
      templates && templates.length > 0
        ? `Template${templates.length + 1}`
        : "Template1";

    const _doc = {
      _id: id,
      title: formData.title,
      imageURL: imageAsset.uri,
      tags: selectedTags,
      name: nextTemplateName,
      timeStamp: timeStamp,
    };

    await setDoc(doc(db, "templates", id), _doc)
      .then(() => {
        setFormData((prevData) => ({ ...prevData, title: "", imageURL: "" }));
        setImageAsset((prevAsset) => ({ ...prevAsset, uri: null }));
        setSelectedTags([]);
        templatesRefetch();
        toast.success("Data pushed to the cloud");
      })
      .catch((error) => {
        toast.error(`Error : ${error.message}`);
      });
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
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="orange" size={40} />
              <p>{imageAsset.progress.toFixed(2)}%</p>
            </div>
          ) : !imageAsset.uri ? (
            <label className="w-full cursor-pointer h-full">
              <div className="flex items-center justify-center h-full w-full">
                <div
                  className={`flex items-center justify-center cursor-pointer text-5xl transition duration-200 ${
                    isHovered || isFocused ? "text-orange-500" : "text-gray-400"
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
          ) : (
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <img
                src={imageAsset.uri}
                className="w-full h-full object-cover"
                loading="lazy"
                alt=""
              />
              {/* delete actions */}
              <div
                onClick={deleteAnImageObject}
                className={`absolute top-4 right-4 w-8 h-8 rounded-md flex items-center
                  justify-center cursor-pointer
                  ${
                    isTrashHovered
                      ? "bg-red-600"
                      : "bg-gray-600 hover:bg-red-600"
                  }
                `}
                onMouseEnter={() => setIsTrashHovered(true)}
                onMouseLeave={() => setIsTrashHovered(false)}
              >
                <FaTrash className="text-white text-sm hover:text-lg" />
              </div>
            </div>
          )}
        </div>

        {/* Tags section */}
        <div className="w-full flex items-center flex-wrap gap-2 mt-4">
          {initialTags.map((tag, index) => (
            <div
              key={index}
              className={`border border-orange-300 px-2 py-1 rounded-md cursor-pointer ${
                selectedTags.includes(tag) ? "bg-orange-500 text-white" : ""
              }`}
              onClick={() => handleSelectedTags(tag)}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
        {/* button action */}
        <button
          onClick={pushToCloud}
          type="button"
          className="w-full bg-orange-700 text-white rounded-md py-3 hover:bg-orange-500 transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          style={{
            transition: "transform 0.1s ease",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Save
        </button>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        {/* Right container content */}
      </div>
    </div>
  );
};

export default CreateTemplate;
