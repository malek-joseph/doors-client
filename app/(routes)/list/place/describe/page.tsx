"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import {
  selectPropertyDetails,
  updatePropertyDetails,
} from "@/app/redux/features/listing/placeFormSlice";
import FeaturesSelector from "@/app/components/inputs/FeaturesSelector";
import TextArea from "./TextArea";


const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDescriptionChange = (description: string) => {
    dispatch(updatePropertyDetails({ ...propertyDetails, description }));
  };

  const handleBackClick = () => {
    router.push("/list/place/accepting");
  };

  const handleNextClick = () => {
      router.push("/list/place/property");
  };

  // Calculate the number of words in the description
  const wordCount = propertyDetails.description?.trim().split(/\s+/).length || 0;

  // Check if the description is less than 5 words to disable the Next button
  const isNextButtonDisabled = wordCount < 5;



  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
         About you and other roommates
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <TextArea
        label="Say something about yourself..."
        value={propertyDetails.description || ''} // Assuming there's a description field in propertyDetails
        placeholder="Tell your potential flatmate a little about yourself and the other flatmates living in the home. Describe what you do for work, where you're all from and what you do for fun."
        onChange={handleDescriptionChange}
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
