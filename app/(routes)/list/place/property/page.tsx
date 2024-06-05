"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/components/shared/buttons/NextBackBtns";
import {
  selectPropertyDetails,
  updatePropertyDetails,
} from "@/app/redux/features/listing/placeFormSlice";
import TextArea from "./TextArea";


const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDescriptionChange = (propertyDescription: string) => {
    dispatch(updatePropertyDetails({ ...propertyDetails, propertyDescription }));
  };

  const handleBackClick = () => {
    router.push("/list/place/describe");
  };

  const handleNextClick = () => {
      router.push("/list/place/submit");
  };

  // Calculate the number of words in the description
  const wordCount = propertyDetails.propertyDescription?.trim().split(/\s+/).length || 0;

  // Check if the description is less than 5 words to disable the Next button
  const isNextButtonDisabled = wordCount < 5;



  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
         About the property
        </h2>
        <div className="flex justify-center  ">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center flex-col">
            <TextArea
        label="Say something about your property..."
        value={propertyDetails.propertyDescription || ''} // Assuming there's a description field in propertyDetails
        placeholder="what makes your share property shine?"
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
