/** @format */

import AgeAndPlace from "@/app/components/shared/AgeAndPlace";
import FreeToMessage from "@/app/components/shared/FreeToMessage";
import React from "react";

interface PersonDetails {
  name: string;
  age?: number;
  gender?: string;
  city: string;
  governance: string;
  placeOrPerson: string;
}

const PlaceDetailsSectionOne: React.FC<PersonDetails> = ({
  name,
  age,
  placeOrPerson,
  gender,
  city,
  governance,
}) => {
  return (
    <div className="">
      <FreeToMessage name={name} placeOrPerson={placeOrPerson} city={city} governance={governance}  />
      {/* <AgeAndPlace
        age={age}
        gender={gender}
        city={city}
        governance={governance}
      /> */}
    </div>
  );
};

export default PlaceDetailsSectionOne;
