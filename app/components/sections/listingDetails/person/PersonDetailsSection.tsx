/** @format */

import AgeAndPlace from "@/app/components/shared/AgeAndPlace";
import React from "react";

interface PlaceDetails {
  name: string;
  age?: string;
  gender?: string;
  city: string;
  governance: string;
  type: string;
  list?: string;
}

const PersonDetailsSection: React.FC<PlaceDetails> = ({
  name,
  type,
  age,
  gender,
  city,
  governance,
  list,
}) => {
  return (
    <div className="">
     
      <AgeAndPlace
        list={list}
        gender={gender}
        city={city}
        governance={governance}
        type={type}
        name={name}
      />
    </div>
  );
};

export default PersonDetailsSection;
