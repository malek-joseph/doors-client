/** @format */

"use client";

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePersonDetails } from "@/app/redux/features/listing/personFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/components/shared/buttons/NextBackBtns";
import { useSelector } from "react-redux";
import { selectPersonDetails } from "@/app/redux/features/listing/personFormSlice";
import NumberInput from "@/components/inputs/NumberInput"; // Import the Input component
import CheckboxWithLabel from "@/components/inputs/CheckboxWithLabel";

const Page = () => {
  const personDetails = useSelector(selectPersonDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      name === "monthlyRent" || name === "deposit" ? parseFloat(value) : value;
    dispatch(updatePersonDetails({ [name]: newValue }));
  };
  const handleBillsIncludedChange = (checked: boolean) => {
    dispatch(updatePersonDetails({ billsIncluded: checked }));
  };

  const handleMonthlyBillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number and update the state
    dispatch(
      updatePersonDetails({ monthlyBills: parseFloat(e.target.value) || 0 })
    );
  };

  const handleBackClick = () => {
    router.push("/list/person/features");
  };

  const handleNextClick = () => {
    router.push("/list/person/photos");
  };

  const isNextButtonDisabled = !personDetails.monthlyRent;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Details about rent, deposit and bills
        </h2>
        <div className="flex justify-center  ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            <NumberInput
              label="Monthly Rent Budget"
              type="number"
              id="monthlyRent"
              value={String(personDetails.monthlyRent)}
              onChange={handleInputChange}
              required
              autocomplete="off"
            />
            <CheckboxWithLabel
              label="Bills included in rent"
              checked={personDetails.billsIncluded}
              onChange={handleBillsIncludedChange}
            />
            {!personDetails.billsIncluded && (
              <NumberInput
                label="Monthly Bills Budget"
                type="number"
                id="monthlyBills"
                value={String(personDetails.monthlyBills || "")} // Ensure you have 'monthlyBills' in your state
                onChange={handleMonthlyBillsChange}
                required
                autocomplete="off"
              />
            )}

            <NumberInput
              label="Security Deposit Budget"
              type="number"
              id="deposit"
              value={String(personDetails.deposit)}
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
