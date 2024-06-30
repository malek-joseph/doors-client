

/** @format */

import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const capitalizeFirstLetter = (str: string | null): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeSlashes = (path: string) => {
  return path.replace(/^\/|\/$/g, '');
};

export const fileListToArray = (fileList: FileList | null): File[] => {
  if (!fileList) return [];

  const array: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    array.push(fileList[i]);
  }
  return array;
};

export const arrayToFileList = (files: (File | Blob)[]): FileList => {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    // If file is a Blob, convert it to a File
    if ((file as Blob) instanceof Blob) {
      const blob = file as Blob;
      const convertedFile = new File([blob], "compressed-image.jpg", {
        type: blob.type,
      });
      dataTransfer.items.add(convertedFile);
    } else if (file instanceof File) {
      dataTransfer.items.add(file);
    }
  });
  return dataTransfer.files;
};

export const validateImageFiles = (files: FileList): File[] => {
  const validFormats = ["image/jpeg", "image/png", "image/gif", "image/bmp"];
  const validFiles: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (validFormats.includes(file.type)) {
      validFiles.push(file);
    } else {
      console.warn(`Invalid file format: ${file.type}`);
      toast.warn(`Invalid file format: ${file.type}`);
    }
  }
  return validFiles;
};

export const compressImages = async (validFiles: FileList) => {
  const compressedFiles: Blob[] = [];
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  for (let i = 0; i < validFiles.length; i++) {
    try {
      const compressedFile = await imageCompression(validFiles[i], options);
      compressedFiles.push(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
      toast.error("Error compressing image. Please try again.");
    }
  }
  return compressedFiles;
};
