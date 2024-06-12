import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { adminIds, initialTags } from "../utils/helpers";
import useTemplates from "../hooks/useTemplates";
import { PuffLoader } from "react-spinners";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase.config";
import { FaTrash, FaUpload } from "react-icons/fa6";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const CreateTemplate = () => {
  const { data: user, isLoading, isError } = useUser();
  const {
    data: templates,
    isLoading: t_isLoading,
    isError: t_isError,
    refetch,
  } = useTemplates();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imgUrl: null,
  });

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    imageURL: null,
    progress: 0,
  });

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (!isLoading && (!user || !adminIds.includes(user.uid))) {
      toast.error("You are not authorized to access this page.");
      navigate("/", { replace: true });
    }
  }, [isLoading, user, navigate]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const pushTemplateData = async () => {
    if (!user) {
      toast.error("User is not authenticated");
      return;
    }

    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formData.title,
      imageURL: imageAsset.imageURL,
      tags: selectedTags,
      name:
        templates && templates.length > 0
          ? `Template${templates.length + 1}`
          : "Template1",
      timeStamp: timeStamp,
    };

    try {
      await setDoc(doc(db, "templates", id), _doc);
      setFormData({ title: "", imgUrl: null });
      setImageAsset({ isImageLoading: false, imageURL: null, progress: 0 });
      setSelectedTags([]);
      refetch();
      toast.success("Template created successfully");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleFileSelect = async (event) => {
    setImageAsset({ ...imageAsset, isImageLoading: true });
    const file = event.target.files[0];
    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setImageAsset({
            ...imageAsset,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          });
        },
        (error) => {
          setImageAsset({ ...imageAsset, isImageLoading: false });
          if (error.message.includes("storage/unauthorized")) {
            toast.error("Error: Authorization revoked");
          } else {
            toast.warning("Something went wrong, please try again later");
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset({
              isImageLoading: false,
              imageURL: downloadURL,
              progress: 0,
            });
            toast.success("File uploaded to server");
          });
        }
      );
    } else {
      setImageAsset({ ...imageAsset, isImageLoading: false });
      toast.error("Invalid file format");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const deleteImageObject = () => {
    const deleteRef = ref(storage, imageAsset.imageURL);
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Image removed from the cloud");
        setImageAsset({ isImageLoading: false, imageURL: null, progress: 0 });
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  const removeTemplate = async (template) => {
    const deleteRef = ref(storage, template.imageURL);
    try {
      await deleteObject(deleteRef);
      await deleteDoc(doc(db, "templates", template._id));
      toast.success("Template removed");
      refetch();
    } catch (error) {
      toast.error("Something went wrong, try again later");
    }
  };

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      <div className="w-full flex-1 flex flex-col items-center justify-start gap-4 px-2 col-span-12 lg:col-span-4 2xl:col-span-3">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>

        {t_isLoading ? (
          <PuffLoader color="#498FCD" size={40} />
        ) : (
          <div className="w-full flex items-center justify-end">
            <p className="text-base text-txtLight uppercase font-semibold">
              TempId:{" "}
            </p>
            <p className="text-sm text-txtDark font-bold tracking-wider">
              {templates && templates.length > 0
                ? `Template${templates.length + 1}`
                : "Template1"}
            </p>
          </div>
        )}

        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          value={formData.title}
          placeholder="Template Title"
          onChange={handleInputChange}
        />

        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
          {imageAsset.isImageLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="#498FCD" size={40} />
              <p>{imageAsset.progress.toFixed(2)}%</p>
            </div>
          ) : (
            <>
              {!imageAsset.imageURL ? (
                <label className="w-full cursor-pointer h-full">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <p className="font-bold text-2xl">
                        <FaUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
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
                    src={imageAsset.imageURL}
                    alt="uploadedimage"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer"
                    onClick={deleteImageObject}
                  >
                    <FaTrash className="text-sm text-white" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border rounded-md bg-primary text-txtPrimary shadow-md hover:shadow-lg focus:shadow-lg"
            onClick={pushTemplateData}
          >
            <p>Create Template</p>
          </button>
        </div>
        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${
                selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""
              }`}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 w-full flex-1 py-4 col-span-12 lg:col-span-8 2xl:col-span-9">
        {t_isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#498FCD" size={40} />
          </div>
        ) : (
          <>
            {templates && templates?.length > 0 ? (
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                {templates?.map((template) => (
                  <div
                    key={template._id}
                    className="w-full h-[500px] rounded-md overflow-hidden relative"
                  >
                    <img
                      src={template.imageURL}
                      className="w-full h-full object-cover"
                      alt=""
                    />

                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer"
                      onClick={() => removeTemplate(template)}
                    >
                      <FaTrash className="text-sm text-white" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
                <PuffLoader color="#498FCD" size={40} />
                <p className="text-xl tracking-wider capitalize text-txtPrimary">
                  No data
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;
