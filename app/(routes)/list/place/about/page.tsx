/** @format */
"use client";
// Page.tsx
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/components/shared/buttons/NextBackBtns";
import WarningMessage from "@/components/cards/message/WarningMessage";
import NumericSelector from "@/components/inputs/NumericSelector";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import SelectInput from "@/components/inputs/SelectInput"; // Import the shared SelectInput component

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
    router.push("/list/place");
  };

  const handleNextClick = () => {
    if (propertyDetails) {
      dispatch(updatePropertyDetails(propertyDetails));
      router.push("/list/place/roommates");
    }
  };

  const isNextButtonDisabled =
    !propertyDetails.governance ||
    !propertyDetails.city ||
    !propertyDetails.totalBedrooms ||
    !propertyDetails.totalBathrooms ||
    !propertyDetails.internet;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10">
          About the property
        </h2>
        <div className="flex justify-center ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            {/* <WarningMessage /> */}
            <SelectInput
              label="Governance"
              name="governance"
              value={propertyDetails.governance || ""}
              options={["Cairo", "Giza", "Alexandria"]}
              onChange={handleUniversalChange}
            />
            <SelectInput
              label="City"
              name="city"
              value={propertyDetails.city || ""}
              options={["Cairo", "Giza", "Alexandria"]}
              onChange={handleUniversalChange}
            />
            <NumericSelector
              title="Total Bedrooms"
              range={[1, 2, 3, "4+"]}
              selectedNumber={propertyDetails.totalBedrooms}
              onSelectNumber={(value) =>
                handleUniversalChange({
                  target: { name: "totalBedrooms", value },
                })
              }
            />
            <NumericSelector
              title="Total Bathrooms"
              range={[1, 2, "3+"]}
              selectedNumber={propertyDetails.totalBathrooms}
              onSelectNumber={(value) =>
                handleUniversalChange({
                  target: { name: "totalBathrooms", value },
                })
              }
            />
            <SelectInput
              label="Internet"
              name="internet"
              value={propertyDetails.internet || ""}
              options={[
                "No internet",
                "Included in rent",
                "Not included in rent",
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
