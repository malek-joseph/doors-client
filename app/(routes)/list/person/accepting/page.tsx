/** @format */

"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import {
  selectPersonDetails,
  updatePersonDetails,
} from "@/app/redux/features/listing/personFormSlice";
import FeaturesSelector from "@/app/components/inputs/FeaturesSelector";
import {accepting} from "@/app/constants/index"

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelectFeature = (featureName: string) => {
    // If roommatePreferences is undefined, default to an empty array
    const currentSelectedFeatures = personDetails.roommatePreferences || [];
    const isSelected = currentSelectedFeatures.includes(featureName);
    const newSelectedFeatures = isSelected
      ? currentSelectedFeatures.filter((name) => name !== featureName)
      : [...currentSelectedFeatures, featureName];

    dispatch(
      updatePersonDetails({
        ...personDetails,
        roommatePreferences: newSelectedFeatures,
      })
    );
  };

  const handleBackClick = () => {
    router.push("/list/person/preference");
  };

  const handleNextClick = () => {
    router.push("/list/person/describe");
  };

  const isNextButtonDisabled =
    !personDetails.furnishing ||
    !personDetails.roomType ||
    !personDetails.roomBathroom;





  return (
    <div className="flex flex-col items-center justify-center mt-20 lg:mt-0 md:mt-0 px-5">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Roommate preferences
        </h2>
        <div className="flex justify-center  ">
          <div className="flex items-center flex-col">
            <FeaturesSelector
              title="What do you accept for a portential roommate"
              items={accepting}
              selectedFeatures={personDetails.roommatePreferences}
              onSelectFeature={handleSelectFeature}
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
