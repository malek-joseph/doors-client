/** @format */

"use client";

import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePhotos } from "@/app/redux/features/listing/listingFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import PhotoUpload from "./PhotoUpload";
import Carousel from "@/app/components/carousels/ListingCarousel";


const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();


  const handlePhotoSelect = (files: FileList | null) => {
    if (files) {
      const photosArray = Array.from(files).map((file) => ({
        id: uniqueId(), // You can use a library like lodash to generate a unique ID
        file: file,
        url: URL.createObjectURL(file), // Temporary URL to display the image
      }));
      dispatch(addPhotos(photosArray));
    }
  };


  const handleBackClick = () => {
    router.push("/list/place/features");
  };

  const handleNextClick = () => {
      router.push("/list/place/features");
  };

  const isNextButtonDisabled = !propertyDetails.furnishing || !propertyDetails.roomType || !propertyDetails.roomBathroom;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Property and Room photos
        </h2>
        <div className="flex justify-center  ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
               <PhotoUpload onPhotoSelect={handlePhotoSelect} />
    <Carousel images={propertyDetails.photos.map(photo => photo.url)} />
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
