/** @format */
"use client";
// Page.tsx
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePersonDetails } from "@/app/redux/features/listing/personFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import { useSelector } from "react-redux";
import { selectPersonDetails } from "@/app/redux/features/listing/personFormSlice";
import SelectInput from "@/app/components/inputs/SelectInput"; // Import the shared SelectInput component
import DateInput from "@/app/components/inputs/DateInput";
import LocationInput from "@/app/components/inputs/LocationInput"; 


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
    router.push("/list/person");
  };

  const handleNextClick = () => {
    if (personDetails) {
      dispatch(updatePersonDetails(personDetails));
      router.push("/list/person/roommates");
    }
  };

  const isNextButtonDisabled =
    !personDetails.locationDetails ||
    !personDetails.moveInDate ||
    !personDetails.internet;

  return (
    <div className="flex flex-col items-center justify-center mt-20 lg:mt-0  md:mt-0">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10">
          My Preferences
        </h2>
        <div className="flex justify-center ">
          <div className="w-9/10 md:w-1/2 lg:w-2/5 flex items-center flex-col">
            <LocationInput
              label="Your Address"
              type="person"
              address={personDetails.address}
              placeholder="city, governorate"
            />

            <DateInput
              label="Move In Date"
              name="moveInDate"
              value={personDetails.moveInDate || ""}
              onChange={handleUniversalChange}
            />

            <SelectInput
              label="Internet"
              name="internet"
              value={personDetails.internet || ""}
              options={[
                "Internet is a must",
                "Internet is a plus",
                "Don't need internet",
              ]}
              onChange={handleUniversalChange}
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
