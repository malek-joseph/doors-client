/** @format */

"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import {
  selectPersonDetails,
  updatePersonDetails,
} from "@/app/redux/features/listing/personFormSlice";
import { useEffect, useState } from "react";
import PreferenceOptions from "@/app/components/PreferenceOptions";

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelectPreference = (preference: string) => {
    // Use existing reducer to update roommate preference
    dispatch(updatePersonDetails({ roommatePreference: preference }));
  };

  const handleBackClick = () => {
    router.push("/list/person/photos");
  };

  const handleNextClick = () => {
    router.push("/list/person/accepting");
  };

  const isNextButtonDisabled = !personDetails.roommatePreference;

  const options = ["Women only", "Men only", "Anyone "];

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Roommate preference
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <PreferenceOptions
              options={options}
              onSelect={handleSelectPreference}
              selectedPreference={personDetails.roommatePreference}
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
