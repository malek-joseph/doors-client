/** @format */

import AgeAndPlace from "@/app/components/shared/AgeAndPlace";
import FreeToMessage from "@/app/components/shared/FreeToMessage";
import React from "react";

interface PlaceDetails {
  name: string;
  freeMessage: string;
  age?: string;
  gender?: string;
  city: string;
  governance: string;
  type: string;
  list?: string;
}

const PlaceDetailsSection: React.FC<PlaceDetails> = ({
  name,
  type,
  freeMessage,
  age,
  gender,
  city,
  governance,
  list,
}) => {
  return (
    <div className="">
      <FreeToMessage
        name={name}
        freeMessage={freeMessage}
        type={type}
        city={city}
        governance={governance}
      />
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

export default PlaceDetailsSection;
