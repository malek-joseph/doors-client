"use client";

import { useDispatch, useSelector } from "react-redux";
import { updatePhotos } from "@/app/redux/features/listing/listingFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import PhotoUpload from "./PhotoUpload";
  import { useEffect, useState } from 'react';
import ListingUploadCarousel from "@/app/components/carousels/ListingUploadCarousel";
import { uploadFileToServer } from "@/app/services/photoUpload";


const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();
const [objectURLs, setObjectURLs] = useState<string[]>([]);

const handlePhotoUpload = async (selectedFiles: FileList | null) => {
  if (selectedFiles) {
    const filesArray = Array.from(selectedFiles);
    try {
      const uploadedUrls = await Promise.all(
        filesArray.map((file) => uploadFileToServer(file)) // This function needs to be adjusted to your backend API
      );
      // Assuming the backend returns URLs as strings
      dispatch(updatePhotos([...propertyDetails.photos, ...uploadedUrls]));
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }
};

 

useEffect(() => {
  // Create object URLs only for File items in the photos array
  const newObjectURLs = propertyDetails.photos
    .filter((item): item is File => item instanceof File) // This line is adjusted
    .map((file) => URL.createObjectURL(file));

  setObjectURLs((prevURLs) => [...prevURLs, ...newObjectURLs]);

  // Cleanup: Revoke URLs when the component unmounts or photos array changes
  return () => newObjectURLs.forEach(URL.revokeObjectURL);
}, [propertyDetails.photos]);

  
console.log(objectURLs); 

  const handleBackClick = () => {
    router.push("/list/place/rent");
  };

  const handleNextClick = () => {
      router.push("/list/place/preference");
  };

  const isNextButtonDisabled = !propertyDetails.furnishing || !propertyDetails.roomType || !propertyDetails.roomBathroom;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Property and Room photos
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <PhotoUpload onPhotoSelect={handlePhotoUpload} />
            {objectURLs.length > 0 && (
              <ListingUploadCarousel images={objectURLs} />
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
