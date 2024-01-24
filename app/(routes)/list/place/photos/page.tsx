"use client";

import { useDispatch, useSelector } from "react-redux";
import { updatePhotos } from "@/app/redux/features/listing/listingFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import PhotoUpload from "./PhotoUpload";
  import { useEffect, useState } from 'react';
import ListingUploadCarousel from "@/app/components/carousels/ListingUploadCarousel";

const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();
const [objectURLs, setObjectURLs] = useState<string[]>([]);

const handlePhotoSelect = (files: FileList | null) => {
  if (files) {
    // Create a new array that includes the existing photos plus the new ones
    const updatedPhotosArray = [
      ...propertyDetails.photos,
      ...Array.from(files),
    ];
    // Dispatch the updatePhotos action with the updated array
    dispatch(updatePhotos(updatedPhotosArray));
    console.log(propertyDetails.photos); // After dispatching updatePhotos
  }
};

useEffect(() => {
  if (propertyDetails.photos.length > 0) {
    const newObjectURLs = propertyDetails.photos
      .filter((file) => file instanceof File)
      .map((file) => URL.createObjectURL(file));
    setObjectURLs(newObjectURLs);

    return () => newObjectURLs.forEach(URL.revokeObjectURL);
  }
}, [propertyDetails.photos]);


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
            <PhotoUpload onPhotoSelect={handlePhotoSelect} />

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
