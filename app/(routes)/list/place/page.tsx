/** @format */
"use client";
import { accommodationTypes } from "@/app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAccommodationType,
  resetForm,
  selectAccommodationType,
} from "@/app/redux/features/listing/placeFormSlice";
import { useRouter } from "next/navigation";
import NextBackBtns from "@/app/components/buttons/NextBackBtns";
import AccommodationTypeButton from "@/app/components/buttons/AccommodationTypeButton";
import LoadingDoor from '@/app/components/loaders/door/LoadingDoor';
import useLoading from "@/app/hooks/useLoading"; 

const Page = () => {
  const accommodationType = useSelector(selectAccommodationType);
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useLoading(); 

  const handleBackClick = () => {
    dispatch(resetForm());
    router.push("/");
  };

  const handleNextClick = () => {
    router.push("/list/place/about");
  };

  const handleTypeSelect = (typeName: string) => {
    dispatch(updateAccommodationType(typeName));
  };

  const isNextButtonDisabled = !accommodationType;

  return (
    <div className="flex flex-col items-center justify-center md:net_height mt-20 lg:mt-0 md:mt-0">
      <div className="w-11/12 py-8 md:net_height">
        <h2 className="lg:text-2xl font-bold text-teal-600 mb-6 lg:mb-10">
          What type of accommodation are you offering?
        </h2>
        {loading ? (
          <div className="h-screen flexCenter">
            <LoadingDoor size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-12 lg:mb-12 mb-24">
            {accommodationTypes.map((type) => (
              <AccommodationTypeButton
                key={type.name}
                type={type}
                isSelected={accommodationType === type.name}
                onClick={handleTypeSelect}
              />
            ))}
          </div>
        )}

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
