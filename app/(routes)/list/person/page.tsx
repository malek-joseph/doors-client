/** @format */
"use client";
import { accommodationTypes } from "@/app/constants";
import { useDispatch } from "react-redux";
import {
  updateAccommodationType,
  resetForm,
} from "@/app/redux/features/listing/personFormSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAccommodationType } from "@/app/redux/features/listing/personFormSlice";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import AccommodationTypeButton from "./components/AccommodationTypeButton";

const Page = () => {
  const accommodationType = useSelector(selectAccommodationType);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(resetForm());
    router.push("/");
  };

  const handleNextClick = () => {
    router.push("/list/person/about");
  };

  const handleTypeSelect = (typeName: string) => {
    dispatch(updateAccommodationType(typeName));
  };

  const isNextButtonDisabled = !accommodationType;

  return (
    <div className="flex flex-col items-center justify-center md:net_height">
      <div className="w-11/12 py-8 md:net_height">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10">
          What type of accommodation are you offering?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {accommodationTypes.map((type) => (
            <AccommodationTypeButton
              key={type.name}
              type={type}
              isSelected={accommodationType === type.name}
              onClick={handleTypeSelect}
            />
          ))}
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
