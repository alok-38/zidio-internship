import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import { FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { initialTags } from "../utils/helpers";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useTemplates from "../hooks/useTemplates"; // Import your custom hook
import { db } from "../config/firebase.config";

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

  const [isUploadContainerHovered, setIsUploadContainerHovered] =
    useState(false);

  // Custom hook for fetching templates using React Query
  const {
    templates,
    isLoading: templatesLoading,
    error: templatesError,
    refetch: refetchTemplates,
  } = useTemplates();

  // Handling the input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle the image file changes
  const handleFileSelect = async (e) => {
    setImageAsset({ isImageLoading: true, uri: null, progress: 0 });
    const file = e.target.files[0];
    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageAsset((prevAsset) => ({ ...prevAsset, progress }));
        },
        (error) => {
          if (error.message.includes("storage/unauthorized")) {
            toast.error(`Error: Authorization Revoked`);
          } else {
            toast.error(`Error: ${error.message}`);
          }
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            isImageLoading: false,
          }));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImageAsset((prevAsset) => ({
                ...prevAsset,
                uri: downloadURL,
              }));
              toast.success("Image uploaded");
            })
            .catch((error) => {
              toast.error(`Error: ${error.message}`);
            })
            .finally(() => {
              setTimeout(() => {
                setImageAsset((prevAsset) => ({
                  ...prevAsset,
                  isImageLoading: false,
                }));
              }, 2000);
            });
        }
      );
    } else {
      toast.info("Invalid file format");
    }
  };

  // Action to delete an image from the cloud
  const deleteAnImageObject = async () => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const deleteRef = ref(storage, imageAsset.uri);
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Image removed");
        setTimeout(() => {
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progress: 0,
            uri: null,
            isImageLoading: false,
          }));
        }, 2000);
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
    // check if the tag is selected
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selected) => selected !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const pushToCloud = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formData.title,
      imageURL: imageAsset.uri,
      tags: selectedTags,
      name:
        templates && templates.length > 0
          ? `Template${templates.length + 1}`
          : "Template1",
      timestamp: timestamp,
    };
    try {
      await setDoc(doc(db, "templates", id), _doc);
      setFormData({ title: "", imageURL: null });
      setImageAsset({ isImageLoading: false, uri: null, progress: 0 });
      setSelectedTags([]);
      refetchTemplates(); // Trigger refetch of templates after successful save
      toast.success("Template saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error saving template. Please try again.");
    }
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
          <p className="text-sm text-txtDark capitalize font-bold">
            {templates && templates.length > 0
              ? `Template${templates.length + 1}`
              : "Template1"}
          </p>
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
          className={`relative w-full bg-orange-50 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-orange-300 cursor-pointer flex items-center justify-center ${
            isUploadContainerHovered ? "hovered" : ""
          }`}
          onMouseEnter={() => setIsUploadContainerHovered(true)}
          onMouseLeave={() => setIsUploadContainerHovered(false)}
        >
          {imageAsset.isImageLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="orange" size={40} />
              <p>{imageAsset.progress.toFixed(2)}%</p>
            </div>
          ) : (
            <React.Fragment>
              {imageAsset.uri && (
                <img
                  src={imageAsset.uri}
                  alt="Uploaded"
                  className="max-h-full max-w-full"
                />
              )}
              {!imageAsset.uri && (
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
              )}
              {imageAsset.uri && (
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-md
          flex items-center justify-center bg-red-400 cursor-pointer
          hover:bg-red-600 transition duration-300"
                  onClick={deleteAnImageObject}
                >
                  <FaTrash className="text-white" />
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        {/* tags */}
        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag, index) => (
            <div
              className={`border-2 border-orange-400 p-1 rounded-md cursor-pointer ${
                selectedTags.includes(tag) ? "bg-orange-400" : ""
              }`}
              key={index}
              onClick={() => handleSelectedTags(tag)}
            >
              <p className="text-sm text-txtPrimary">{tag}</p>
            </div>
          ))}
        </div>
        {/* Button actions */}
        <button
          type="button"
          className="w-full bg-orange-400 hover:bg-orange-600 text-white rounded-md py-3 transition duration-300 ease-in-out transform hover:scale-100 focus:outline-none focus:ring-2 focus:ring-orange-500 active:transform active:scale-90"
          onClick={pushToCloud}
        >
          Save
        </button>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        Right Container Content
      </div>
    </div>
  );
};

export default CreateTemplate;
