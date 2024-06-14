/** @format */

"use client";

import { useDispatch } from "react-redux";
import { updatePersonDetails } from "@/app/redux/features/listing/personFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import { useSelector } from "react-redux";
import { selectPersonDetails } from "@/app/redux/features/listing/personFormSlice";
import FeaturesSelector from "@/app/components/inputs/FeaturesSelector";
import bedSideTable from "@/public/assets/images/bedSideTable.png";
import wardrobe from "@/public/assets/images/wardrobe.png";
import airConditioner from "@/public/assets/images/airConditioner.png";
import heater from "@/public/assets/images/heater.png";
import table from "@/public/assets/images/table.png";
import chair from "@/public/assets/images/chair.png";
import couch from "@/public/assets/images/couch.png";
import tv from "@/public/assets/images/tv.png";
import balcony from "@/public/assets/images/balcony.png";
import lock from "@/public/assets/images/lock.png";
import type { StaticImageData } from "next/image";

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelectFeature = (featureName: string) => {
    const currentSelectedFeatures = personDetails.selectedFeatures || []; // Fallback to an empty array
    const isSelected = currentSelectedFeatures.includes(featureName);
    const newSelectedFeatures = isSelected
      ? currentSelectedFeatures.filter((name) => name !== featureName)
      : [...currentSelectedFeatures, featureName];

    dispatch(
      updatePersonDetails({
        ...personDetails,
        selectedFeatures: newSelectedFeatures,
      })
    );
  };

  const handleBackClick = () => {
    router.push("/list/person/room");
  };

  const handleNextClick = () => {
    router.push("/list/person/rent");
  };

  const isNextButtonDisabled = !personDetails.selectedFeatures;

  type FurnishingFeature = {
    name: string;
    src: StaticImageData;
  };

  const furnishingItems: FurnishingFeature[] = [
    { name: "Bed side table", src: bedSideTable },
    { name: "Wardrobe", src: wardrobe },
    { name: "Air Conditioner", src: airConditioner },
    { name: "Heater", src: heater },
    { name: "Table", src: table },
    { name: "Chair", src: chair },
    { name: "Couch", src: couch },
    { name: "TV", src: tv },
    { name: "Balcony", src: balcony },
    { name: "Door Lock", src: lock },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-20 lg:mt-0 md:mt-0">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          What features do you require in your room?
        </h2>
        <div className="flex justify-center ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            <FeaturesSelector
              title="Room Furnishing and Features"
              items={furnishingItems}
              selectedFeatures={personDetails.selectedFeatures}
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
