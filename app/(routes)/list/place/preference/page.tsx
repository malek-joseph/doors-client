"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import {
  selectPropertyDetails,
  updatePropertyDetails,
} from "@/app/redux/features/listing/placeFormSlice";
import { useEffect, useState } from 'react';
import PreferenceOptions from "@/app/components/PreferenceOptions";

const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();

    const handleSelectPreference = (preference: string) => {
    // Use existing reducer to update roommate preference
    dispatch(updatePropertyDetails({ roommatePreference: preference }));
  };

  const handleBackClick = () => {
    router.push("/list/place/photos");
  };

  const handleNextClick = () => {
      router.push("/list/place/accepting");
  };

  const isNextButtonDisabled = !propertyDetails.roommatePreference;

   const options = [
    "Women only",
    "Men only",
    "Anyone ",
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-20 lg:mt-0 md:mt-0">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Roommate preference
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
           <PreferenceOptions
           options={options}
      onSelect={handleSelectPreference}
      selectedPreference={propertyDetails.roommatePreference}
            />
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
