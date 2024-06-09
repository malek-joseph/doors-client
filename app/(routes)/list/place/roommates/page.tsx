/** @format */
"use client";
// Page.tsx
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import NumericSelector from "@/app/components/inputs/NumericSelector";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "@/app/redux/features/listing/placeFormSlice";

const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  type NumericValue = number | string;

  const handleUniversalChange = (
    e:
      | ChangeEvent<HTMLSelectElement | HTMLInputElement>
      | { target: { name: string; value: string | number } }
  ) => {
    const { name, value } = e.target;
    let processedValue: NumericValue | string;

    if (typeof value === "number") {
      processedValue = value;
    } else if (!isNaN(Number(value))) {
      processedValue = Number(value);
    } else {
      processedValue = value;
    }

    dispatch(updatePropertyDetails({ [name]: processedValue }));
  };

  const handleBackClick = () => {
    router.push("/list/place/about");
  };

  const handleNextClick = () => {
    router.push("/list/place/room");
  };

  const isNextButtonDisabled = !propertyDetails.totalRoommates;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Roommates details
        </h2>
        <div className="flex justify-center ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            <NumericSelector
              title="How many people will live in your home?"
              range={[1, 2, 3, 4, 5, "6+"]}
              selectedNumber={propertyDetails.totalRoommates}
              onSelectNumber={(value) =>
                handleUniversalChange({
                  target: { name: "totalRoommates", value },
                })
              }
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
