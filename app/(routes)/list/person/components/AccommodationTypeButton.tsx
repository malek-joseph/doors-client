/** @format */

import React from "react";
import Image from "next/image";

interface AccommodationTypeButtonProps {
  type: {
    name: string;
    iconSrc: string;
  };
  isSelected: boolean;
  onClick: (name: string) => void;
}

const AccommodationTypeButton: React.FC<AccommodationTypeButtonProps> = ({
  type,
  isSelected,
  onClick,
}) => (
  <button
    className={`p-4 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center ${
      isSelected ? "border-teal-500" : ""
    }`}
    onClick={() => onClick(type.name)}>
    <Image src={type.iconSrc} alt={type.name} width={50} height={50} />
    <span className="block mt-2 text-center text-sm">{type.name}</span>
  </button>
);

export default AccommodationTypeButton;
