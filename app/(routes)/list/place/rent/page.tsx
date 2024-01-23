/** @format */

"use client";

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import NumericSelector from "@/app/components/inputs/NumericSelector";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import NumberInput from "@/app/components/inputs/NumberInput"; // Import the Input component


const Page = () => {
  const propertyDetails = useSelector(selectPropertyDetails);
  const router = useRouter();
  const dispatch = useDispatch();


const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  const newValue =
    name === "monthlyRent" || name === "deposit" ? parseFloat(value) : value;
  dispatch(updatePropertyDetails({ [name]: newValue }));
};
   const handleBillsIncludedChange = (checked: boolean) => {
    dispatch(updatePropertyDetails({ billsIncluded: checked }));
  };

  const handleBackClick = () => {
    router.push("/list/place/features");
  };

  const handleNextClick = () => {
      router.push("/list/place/features");
  };

  const isNextButtonDisabled = !propertyDetails.furnishing || !propertyDetails.roomType || !propertyDetails.roomBathroom;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Details about rent, deposit and bills
        </h2>
        <div className="flex justify-center  ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            <NumberInput
              label="Monthly Rent"
              type="number"
              id="monthlyRent"
              value={String(propertyDetails.monthlyRent)} 
              onChange={handleInputChange}
              required
              autocomplete="off"
            />
             <CheckboxWithLabel
          label="Bills included in rent"
          checked={propertyDetails.billsIncluded}
          onChange={handleBillsIncludedChange}
        />
            <NumberInput
              label="Security Deposit"
              type="number"
              id="deposit"
              value={String(propertyDetails.deposit)} 
              onChange={handleInputChange}
              required
              autocomplete="off"
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
