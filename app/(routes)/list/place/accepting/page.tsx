"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import {
  selectPropertyDetails,
  updatePropertyDetails,
} from "@/app/redux/features/listing/placeFormSlice";
import FeaturesSelector from "@/app/components/inputs/FeaturesSelector";
import cigarette from "@/public/assets/images/cigarette.png"
import pet from "@/public/assets/images/pet.png"
import student from "@/public/assets/images/student.png"
import visitors from "@/public/assets/images/visitors.png"
import type { StaticImageData } from "next/image";

const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();

const handleSelectFeature = (featureName: string) => {
  // If roommatePreferences is undefined, default to an empty array
  const currentSelectedFeatures = propertyDetails.roommatePreferences || [];
  const isSelected = currentSelectedFeatures.includes(featureName);
  const newSelectedFeatures = isSelected
    ? currentSelectedFeatures.filter((name) => name !== featureName)
    : [...currentSelectedFeatures, featureName];

  dispatch(
    updatePropertyDetails({
      ...propertyDetails,
      roommatePreferences: newSelectedFeatures,
    })
  );
};

  const handleBackClick = () => {
    router.push("/list/place/preference");
  };

  const handleNextClick = () => {
      router.push("/list/place/describe");
  };

  const isNextButtonDisabled = !propertyDetails.furnishing || !propertyDetails.roomType || !propertyDetails.roomBathroom;

  type Accepting = {
  name: string;
  src: StaticImageData; 
};

   const accepting: Accepting[] = [
     { name: "smokers", src: cigarette },
     { name: "pets", src: pet },
     { name: "students", src: student },
     { name: "visitors", src: visitors },
    
   ];

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
              selectedFeatures={propertyDetails.roommatePreferences}
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
