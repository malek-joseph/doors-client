/** @format */


import React from "react";

interface PersonDetails {
  gender?: string;
  city: string;
  governance: string;
  roomType: string;
  roommatePreference: string;
  furnishing: string;
  bathroomType: string;
  accommodationType: string | null;
}

const PersonDetailsSectionOne: React.FC<PersonDetails> = ({
  gender,
  city,
  governance,
  roommatePreference,
  furnishing,
  bathroomType,
  roomType,
  accommodationType
}) => {

// console.log(bathroomType)
  return (
    <div className="">
      <div className=" mb-2">
        <h2 className="text-xl font-semibold text-gray-600">
          {`Wants to rent in ${city}, ${governance}.`}
        </h2>
        <h3 className="text-gray-500 flex flex-col">
          {`${furnishing} ${roomType} room in a ${accommodationType}.`}
          {bathroomType === "Private" && (
            <span className="text-xs text-teal-300">With private bathroom.</span>
          )}
        </h3>
        <p className="text-sm text-gray-700">
          {`Preferred genders to live with: ${roommatePreference}`}
        </p>
      </div>
    </div>
  );
};

export default PersonDetailsSectionOne;
