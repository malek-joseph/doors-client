/** @format */
"use client";
// Page.tsx
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import NumericSelector from "@/app/components/inputs/NumericSelector";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import SelectInput from "@/app/components/inputs/SelectInput"; 
import DateInput from "@/app/components/inputs/DateInput";
import LocationInput from "@/app/components/inputs/LocationInput"; 
import useLoading from "@/app/hooks/useLoading"; 
import LoadingDoor from '@/app/components/loaders/door/LoadingDoor';




const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false)
  const routerLoading = useLoading(); 


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
    setLoading(true)
    router.push("/list/place");
    setLoading(false)
  };

  const handleNextClick = () => {
    setLoading(true)
    if (propertyDetails) {
      dispatch(updatePropertyDetails(propertyDetails));
      router.push("/list/place/roommates");
    }
    setLoading(false)
  };

  const isNextButtonDisabled =
    !propertyDetails.locationDetails ||
    !propertyDetails.totalBedrooms ||
    !propertyDetails.totalBathrooms ||
    !propertyDetails.internet;

    console.log(propertyDetails)

  return (
    <div className="flex flex-col items-center justify-center mt-20 lg:mt-0 md:mt-0 ">
    
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-5">
          About the property
        </h2>
           {loading ? (<div className="h-screen flexCenter"><LoadingDoor size={50} /></div> ): (
          <div className="flex justify-center w-full">
          <div className="w-9/10 md:w-1/2 lg:w-2/5 flex items-center flex-col">
            <div className="h-24 w-full flexCenter">
              <LocationInput
                label="Place Address"
                type="place"
                address={propertyDetails.address}
                      placeholder="city, governorate"
              />
            </div>

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
            <DateInput
              label="Avilable From"
              name="availableFromDate"
              value={propertyDetails.availableFromDate || ""}
              onChange={handleUniversalChange}
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
       )}
      

        <NextBackBtns
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
          isNextDisabled={isNextButtonDisabled}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Page;
