/** @format */

"use client";

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePersonDetails } from "@/app/redux/features/listing/personFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
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
    router.push("/list/person/roommates");
  };

  const handleNextClick = () => {
    if (personDetails) {
      dispatch(updatePersonDetails(personDetails));
      router.push("/list/person/features");
    }
  };

  const isNextButtonDisabled =
    !personDetails.furnishing ||
    !personDetails.roomType ||
    !personDetails.roomBathroom;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-11/12 py-8 overflow-y-auto mb-20">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10 ">
          Details about what you prefer for a room
        </h2>
        <div className="flex justify-center ">
          <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center flex-col">
            <NumericSelector
              title="Room Furnishing"
              range={["Furnished", "Unfurnished"]}
              selectedNumber={personDetails.furnishing}
              onSelectNumber={(value) =>
                handleUniversalChange({
                  target: { name: "furnishing", value },
                })
              }
            />
            <NumericSelector
              title="Room type"
              range={["Private", "Shared"]}
              selectedNumber={personDetails.roomType}
              onSelectNumber={(value) =>
                handleUniversalChange({
                  target: { name: "roomType", value },
                })
              }
            />

            <NumericSelector
              title="Bathroom"
              range={["Private", "Shared"]}
              selectedNumber={personDetails.roomBathroom}
              onSelectNumber={(value) =>
                handleUniversalChange({
                  target: { name: "roomBathroom", value },
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
