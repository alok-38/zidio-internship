"use client";

import React from 'react';
import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// Define the props interface
interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

// Define the FileUpload component
export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  endpoint
}) => {
  const handleUploadComplete = (res: any) => {
    onChange(res?.[0]?.url); // Extract and pass the URL to onChange
  };

  const handleUploadError = (error: Error) => {
    toast.error(`${error?.message}`);
  };

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
    />
  );
};
