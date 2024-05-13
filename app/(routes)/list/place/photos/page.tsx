/** @format */

"use client";

import { useDispatch, useSelector } from "react-redux";
import { updatePhotos } from "@/app/redux/features/listing/listingFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import PhotoUpload from "./PhotoUpload";
import { useEffect, useState } from "react";
import ListingUploadCarousel from "@/app/components/carousels/ListingUploadCarousel";
import Spinner from "@/app/components/shared/spinner/Spinner";

const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();
 const [imageFiles, setImageFiles] = useState<File[]>([]);
 const [imageURLs, setImageURLs] = useState<string[]>([]);

  // Load photos from local storage on component mount
  useEffect(() => {
    const storedImages = localStorage.getItem("propertyImages");
    if (storedImages) {
      setImageURLs(JSON.parse(storedImages));
    }

  }, []);




    // Convert Blob URLs to Base64 strings
    const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

   // Convert Base64 strings to Blob URLs
 const base64ToBlobURL = (base64String: string): string => {
   try {
     const byteCharacters = atob(base64String.split(",")[1]);
     const byteNumbers = new Array(byteCharacters.length);
     for (let i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
     }
     const byteArray = new Uint8Array(byteNumbers);
     const blob = new Blob([byteArray], { type: "image/jpeg" });
     return URL.createObjectURL(blob);
   } catch (error) {
     console.error("Error decoding Base64 string:", error);
     return ""; // Return empty string or handle the error accordingly
   }
 };

 const handlePhotoUpload = async (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);

      // Update image files state with new files
      setImageFiles((prevFiles) => [...prevFiles, ...filesArray]);

      // Convert each file to Base64 string and store in local storage
      const newImageURLs = await Promise.all(
        filesArray.map(async (file) => {
          const base64String = await blobToBase64(file);
          return base64String;
        })
      );

      const updatedImageURLs = [...imageURLs, ...newImageURLs];
      setImageURLs(updatedImageURLs);
      localStorage.setItem("propertyImages", JSON.stringify(updatedImageURLs));
    }
  };

  const handleBackClick = () => {
    router.push("/list/place/rent");
  };

  const handleNextClick = () => {
    router.push("/list/place/preference");
  };

  const isNextButtonDisabled = !imageURLs?.length;
// console.log(imageURLs)

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Property and Room photos
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <PhotoUpload onPhotoSelect={handlePhotoUpload} />
             {imageURLs.length > 0 && (
              <ListingUploadCarousel
                images={imageURLs.map((url) => base64ToBlobURL(url))}
              />
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
