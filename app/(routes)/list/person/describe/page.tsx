/** @format */

"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/components/shared/buttons/NextBackBtns";
import {
  selectPersonDetails,
  updatePersonDetails,
} from "@/app/redux/features/listing/personFormSlice";
import FeaturesSelector from "@/components/inputs/FeaturesSelector";
import TextArea from "./TextArea";

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDescriptionChange = (description: string) => {
    dispatch(updatePersonDetails({ ...personDetails, description }));
  };

  const handleBackClick = () => {
    router.push("/list/person/accepting");
  };

  const handleNextClick = () => {
    router.push("/list/person/property");
  };

  // Calculate the number of words in the description
  const wordCount =
    personDetails.description?.trim().split(/\s+/).length || 0;

  // Check if the description is less than 5 words to disable the Next button
  const isNextButtonDisabled = wordCount < 5;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          What&apos;s your story
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <TextArea
              label="Say something about yourself..."
              value={personDetails.description || ""} // Assuming there's a description field in personDetails
              placeholder="Tell your potential flatmate a little about yourself. Describe what you do for living, where you're from and what do you want him to know about you."
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
