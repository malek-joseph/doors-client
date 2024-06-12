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
    <div className=" max-w-md mx-auto transition-all hover:outline hover:outline-teal-500 bg-white rounded-lg overflow-hidden shadow-lg ">
      <Link href={link} className="flex  items-center cursor-pointer py-3 px-8">
        <div className="lg:mr-4 mb-4 lg:mb-0 text-center lg:text-left">
          <h2 className="text-xl text-gray-600 font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-4">{description}</p>
          <button className="bg-teal-500 hover:bg-teal-300 transition-all text-white lg:py-2 lg:px-4 py-1 px-2 rounded-md ">
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
      </Link>
    </div>
  );
};

export default CardOne;
