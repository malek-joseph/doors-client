/** @format */

import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

const CardOne: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  image,
}) => {
  return (
    <div className="flex items-center max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-3 my-4">
      <div className="">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Button */}
        <button className="bg-teal-500 hover:bg-teal-300 transition-all text-white py-2 px-4 rounded-md ">
          {buttonText}
        </button>
      </div>

      {/* Image */}
      <Image
        src={image}
        alt={title}
        className=" h-32 object-cover rounded-md"
        width={200}
        height={300}
      />
    </div>
  );
};

export default CardOne;
