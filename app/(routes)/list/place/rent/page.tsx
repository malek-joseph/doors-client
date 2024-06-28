/** @format */

"use client";

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "@/app/redux/features/listing/placeFormSlice";
import NumberInput from "@/app/components/inputs/NumberInput"; // Import the Input component
import CheckboxWithLabel from "@/app/components/inputs/CheckboxWithLabel";

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

  const handleMonthlyBillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatePropertyDetails({ monthlyBills: parseFloat(e.target.value) || 0 })
    );
  };

  const handleBackClick = () => {
    router.push("/list/place/features");
  };

  const handleNextClick = () => {
    router.push("/list/place/photos");
  };

  const isNextButtonDisabled = !propertyDetails.monthlyRent;

  return (
    <div className="flex flex-col items-center justify-center mt-20 lg:mt-0 md:mt-0">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Details about rent, deposit and bills
        </h2>
        <div className="flex justify-center  ">
          <div className="w-9/10 md:w-1/2 lg:w-2/5  flex items-center flex-col">
            <NumberInput
              label="Monthly Rent"
              type="number"
              id="monthlyRent"
               value={String(propertyDetails.monthlyRent || "")}
              onChange={handleInputChange}
              required
              autocomplete="off"
            />
            <CheckboxWithLabel
              label="Bills included in rent"
              checked={propertyDetails.billsIncluded}
              onChange={handleBillsIncludedChange}
            />
            {!propertyDetails.billsIncluded && (
              <NumberInput
                label="Monthly Bills"
                type="number"
                id="monthlyBills"
                value={String(propertyDetails.monthlyBills || "")}
                onChange={handleMonthlyBillsChange}
                required
                autocomplete="off"
              />
            )}

            <NumberInput
              label="Security Deposit"
              type="number"
              id="deposit"
              value={String(propertyDetails.deposit || "")}
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
