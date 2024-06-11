/** @format */
"use client";
// Page.tsx
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePersonDetails } from "@/app/redux/features/listing/personFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import NumericSelector from "@/app/components/inputs/NumericSelector";
import { useSelector } from "react-redux";
import { selectPersonDetails } from "@/app/redux/features/listing/personFormSlice";

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
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

    dispatch(updatePersonDetails({ [name]: processedValue }));
  };

  const handleBackClick = () => {
    router.push("/list/person/about");
  };

  const handleNextClick = () => {
    router.push("/list/person/room");
  };

  const isNextButtonDisabled = !personDetails.totalRoommates;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Roommates details
        </h2>
        <div className="flex justify-center ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            <NumericSelector
              title="What's the maximum number of roommates you can live with?"
              range={[1, 2, 3, 4, 5, "6+"]}
              selectedNumber={personDetails.totalRoommates}
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
