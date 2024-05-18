/** @format */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import PhotoUpload from "./PhotoUpload";
import { useEffect, useState } from "react";
import ListingUploadCarousel from "@/app/components/carousels/ListingUploadCarousel";
import Spinner from "@/app/components/shared/spinner/Spinner";
import localforage from "localforage";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { selectAccommodationType } from "@/app/redux/features/listing/listingFormSlice";
import publishProperty from '../submit/publishProperty'


const persistConfig = {
  key: "root",
  storage: localforage,
};

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const userDetails = useSelector(selectUserDetails);
  const propertyDetails = useSelector(selectPropertyDetails);
  const accommodationType = useSelector(selectAccommodationType);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const storedImages = await localforage.getItem<File[]>("propertyImages");
       if (storedImages && Array.isArray(storedImages)) {
         const urls = storedImages.map((file) => URL.createObjectURL(file));
         setImageFiles(storedImages);
         setImageURLs(urls);
       } else {
         setImageFiles([]);
         setImageURLs([]);
       }
     } catch (error) {
       console.error("Error getting item:", error);
     }
   };

   fetchData();

   return () => {
     // Clean up blob URLs when component unmounts
     imageURLs.forEach(URL.revokeObjectURL);
   };
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



  // Updated handlePhotoUpload function
  const handlePhotoUpload = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

      const validFiles = validateImageFiles(selectedFiles);
      if (validFiles.length === 0) {
        toast.error("Please upload valid image files (JPEG, PNG, GIF, or BMP)");
        return;
      }
    console.log(validFiles);

      const validFilesFilelist = arrayToFileList(validFiles)
    console.log(selectedFiles)

    console.log(validFilesFilelist)

      const compressedFiles = await compressImages(validFilesFilelist);
    console.log(compressedFiles)


      // Update image files state with new files
      const updatedFiles = [...imageFiles, ...compressedFiles];
    setImageFiles(updatedFiles);
    
  const updatedImages = arrayToFileList(updatedFiles);

          const updatedPropertyDetails = { ...propertyDetails, type: "place" };
    // console.log(updatedFiles);
    
      publishProperty(
        updatedImages,
        userDetails,
      updatedPropertyDetails,
      accommodationType
      );
      // Generate object URLs for new files
     const updatedImageURLs = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImageURLs(updatedImageURLs);

      // Update local storage with new files
        localforage
          .setItem("propertyImages", updatedImages)
          .then(() => {
            // Item stored successfully
          })
          .catch((error) => {
            // Handle error
            console.error("Error storing item:", error);
          });

        localforage
          .setItem("propertyImagesURLs", updatedImageURLs)
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

  // Iterate over each file in the FileList
  for (let i = 0; i < files.length; i++) {
    try {
      // Compress each file
      const compressedFile = await imageCompression(files[i], options);
      // Preserve the original file name
      const originalFile = files[i];
      const compressedBlob = compressedFile as Blob;
      const compressedFileWithOriginalName = new File(
        [compressedBlob],
        originalFile.name,
        {
          type: compressedBlob.type,
        }
      );
      compressedFiles.push(compressedFileWithOriginalName);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  }

  return compressedFiles;
};

  const handleClearPhotosClick = () => {
    //  localStorage.removeItem("propertyImages");
    localforage
      .removeItem("propertyImages")
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
    router.push("/list/place/rent");
  };

  const handleNextClick = () => {
    router.push("/list/place/preference");
  };

  const isNextButtonDisabled = !imageURLs?.length;
  // console.log(imageURLs);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Property and Room photos
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
