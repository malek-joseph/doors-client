/** @format */

import Image from "next/image";
import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
}

const CardOne: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  image,
  link
}) => {
  return (
    <div className=" max-w-md mx-auto transition-all hover:outline hover:outline-teal-500 bg-white rounded-lg overflow-hidden shadow-lg relative">
      <Link href={link} className="flex  items-center cursor-pointer py-2 px-4 h-full">
        <div className="lg:mr-4  text-left flex  flex-col justify-between h-full">
          <div>
      <h2 className="text-xl text-gray-600 font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-4 mr-2">{description}</p>
          </div>
    
          <button className="bg-teal-500  max-w-max hover:bg-teal-300 transition-all text-white lg:py-2 lg:px-4 py-1 px-2 rounded-md hidden md:hidden lg:block">
            {buttonText}
          </button>
        </div>

        <Image
          src={image}
          alt={title}
          className=" h-32 object-cover rounded-md hidden md:block lg:block"
          width={200}
          height={300}
          priority
        />
        <Image
          src={image}
          alt={title}
          className=" h-32 object-contain rounded-md block md:hidden lg:hidden"
          width={100}
          height={100}
         
          priority
        />
      </Link>
    </div>
  );
};

export default CardOne;
