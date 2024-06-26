/** @format */

import AgeAndPlace from "@/app/components/AgeAndPlace";
import React from "react";

interface PersonDetails {
  gender?: string;
  city: string;
  governorate: string;
  roomType: string;
  roommatePreference: string;
  furnishing: string;
  bathroomType: string;
  accommodationType: string | null;
}

const PlaceDetailsSectionOne: React.FC<PersonDetails> = ({
  gender,
  city,
  governorate,
  roommatePreference,
  furnishing,
  bathroomType,
  roomType,
  accommodationType,
}) => {
  // console.log(bathroomType)
  return (
    <div className="">
      <div className=" mb-2">
        <h2 className="text-xl font-semibold text-gray-600">
          {`Avilable for rent in ${city}, ${governorate}.`}
        </h2>
        <h3 className="text-gray-500 flex flex-col">
          {`${furnishing} ${roomType} room in a ${accommodationType}.`}
          {bathroomType === "Private" && (
            <span className="text-xs text-teal-300">
              With private bathroom.
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-700">
          {`Genders to apply: ${roommatePreference}`}
        </p>
      </div>
    </div>
  );
};

export default PlaceDetailsSectionOne;
