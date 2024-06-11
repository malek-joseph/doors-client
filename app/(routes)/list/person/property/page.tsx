/** @format */

"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import {
  selectPersonDetails,
  updatePersonDetails,
} from "@/app/redux/features/listing/personFormSlice";
import TextArea from "./TextArea";

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDescriptionChange = (personDescription: string) => {
    dispatch(
      updatePersonDetails({ ...personDetails, personDescription })
    );
  };

  const handleBackClick = () => {
    router.push("/list/person/describe");
  };

  const handleNextClick = () => {
    router.push("/list/person/submit");
  };

  // Calculate the number of words in the description
  const wordCount =
    personDetails.personDescription?.trim().split(/\s+/).length || 0;

  // Check if the description is less than 5 words to disable the Next button
  const isNextButtonDisabled = wordCount < 5;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          About the person
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <TextArea
              label="What do you prefer in the place you want to move in?"
              value={personDetails.personDescription || ""} // Assuming there's a description field in personDetails
              placeholder="What are your expectations of the place, your roommates or any other requests or preference you would like to add."
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
