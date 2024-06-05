/** @format */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/components/shared/buttons/NextBackBtns";
import { selectPersonDetails } from "@/app/redux/features/listing/personFormSlice";
import PhotoUpload from "./PhotoUpload";
import { useEffect, useState } from "react";
import ListingUploadCarousel from "@/components/carousels/ListingUploadCarousel";
import Spinner from "@/components/shared/spinner/Spinner";
import localforage from "localforage";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { selectAccommodationType } from "@/app/redux/features/listing/personFormSlice";
// import publishPerson from "../submit/publishPerson";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const userDetails = useSelector(selectUserDetails);
  const personDetails = useSelector(selectPersonDetails);
  const accommodationType = useSelector(selectAccommodationType);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    localforage
      .getItem<File[]>("personImages")
      .then((storedImages) => {
        if (storedImages) {
          setImageFiles(storedImages);
          const updatedImageURLs = storedImages.map((file) =>
            URL.createObjectURL(file)
          );

          setImageURLs(updatedImageURLs);
        }
      })
      .catch((error) => {
        console.error("Error getting item:", error);
      });
  }, []);

  // Convert File array to FileList
  const arrayToFileList = (files: (File | Blob)[]): FileList => {
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

  const fileListToArray = (fileList: FileList | null): File[] => {
    if (!fileList) return [];

    const array: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      array.push(fileList[i]);
    }
    return array;
  };

  // Updated handlePhotoUpload function
  const handlePhotoUpload = async (selectedFiles: FileList | null) => {
    setLoading(true);
    if (!selectedFiles) return;

    const validFiles = validateImageFiles(selectedFiles);
    if (validFiles.length === 0) {
      toast.error("Please upload valid image files (JPEG, PNG, GIF, or BMP)");
      return;
    }

    const validFilesFilelist = arrayToFileList(validFiles);
    const compressedFiles = await compressImages(validFilesFilelist);
    // Update image files state with new files
    const updatedFiles = [...imageFiles, ...compressedFiles];
    setImageFiles(updatedFiles);

    const updatedImages = arrayToFileList(updatedFiles);

    //     const updatedPersonDetails = { ...personDetails, type: "person" };

    // publishPerson(
    //   updatedImages,
    //   userDetails,
    // updatedPersonDetails,
    // accommodationType
    // );
    // Generate object URLs for new files
    const updatedImageURLs = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImageURLs(updatedImageURLs);
    setLoading(false);
    // Update local storage with new files
    localforage
      .setItem("personImages", fileListToArray(updatedImages))
      .then(() => {
        // Item stored successfully
      })
      .catch((error) => {
        // Handle error
        console.error("Error storing item:", error);
      });
  };

  // Updated validateImageFiles function
  const validateImageFiles = (files: FileList): File[] => {
    const validFormats = ["image/jpeg", "image/png", "image/gif", "image/bmp"];
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validFormats.includes(file.type)) {
        validFiles.push(file);
      } else {
        console.warn(`Invalid file format: ${file.type}`);
        toast.warn(`Invalid file format: ${file.name}`);
      }
    }
    return validFiles;
  };

  const compressImages = async (files: FileList): Promise<File[]> => {
    const compressedFiles: File[] = [];

    // Compression options
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    for (let i = 0; i < files.length; i++) {
      try {
        // Compress each file
        const compressedFile = await imageCompression(files[i], options);

        // Use a canvas to resize and crop the image
        const originalFile = files[i];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(compressedFile);

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set canvas dimensions to the desired square size
            const size = 900;
            canvas.width = size;
            canvas.height = size;

            // Calculate the dimensions and position for cropping
            const aspectRatio = img.width / img.height;
            let sx, sy, sWidth, sHeight;

            if (aspectRatio > 1) {
              // Landscape orientation
              sWidth = img.height;
              sHeight = img.height;
              sx = (img.width - sWidth) / 2;
              sy = 0;
            } else {
              // Portrait or square orientation
              sWidth = img.width;
              sHeight = img.width;
              sx = 0;
              sy = (img.height - sHeight) / 2;
            }

            // Draw the cropped image on the canvas
            ctx?.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);

            // Convert canvas to Blob and then to File
            canvas.toBlob((blob) => {
              if (blob) {
                const compressedFileWithOriginalName = new File(
                  [blob],
                  originalFile.name,
                  {
                    type: blob.type,
                  }
                );
                compressedFiles.push(compressedFileWithOriginalName);
                resolve();
              }
            }, originalFile.type);
          };
        });
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }

    return compressedFiles;
  };

  const handleClearPhotosClick = () => {
    //  localStorage.removeItem("personImages");
    localforage
      .removeItem("personImages")
      .then(() => {
        // Item removed successfully
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
    // Revoke object URLs
    imageURLs.forEach(URL.revokeObjectURL);

    // Clear state
    setImageFiles([]);
    setImageURLs([]);
  };

  const handleBackClick = () => {
    router.push("/list/person/rent");
  };

  const handleNextClick = () => {
    router.push("/list/person/preference");
  };

  const isNextButtonDisabled = !imageURLs?.length;
  // console.log(imageURLs);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Photos and activities
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <PhotoUpload
              onPhotoSelect={handlePhotoUpload}
              onClearPhotos={handleClearPhotosClick}
            />
            {imageURLs.length > 0 && (
              <ListingUploadCarousel images={imageURLs} />
            )}
            {loading && (
              <div className="mt-10">
                <Spinner size={30} />
              </div>
            )}
          </div>
        </div>

        <NextBackBtns
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
          isNextDisabled={isNextButtonDisabled}
        />
      </div>
    </div>
  );
};

export default Page;
