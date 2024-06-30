/** @format */

import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Button,
} from "@chakra-ui/react";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
}

const ListNowCard: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  image,
  link
}) => {
  return (
    <div className=" max-w-md mx-auto transition-all border border-gray-300  hover:border hover:border-teal-500 bg-white rounded-lg overflow-hidden shadow-lg relative">
      <Link href={link} className="flex items-center justify-between cursor-pointer py-2 px-4 h-[145px]">
        <div className="lg:mr-4  text-left flex  flex-col justify-between h-full">
          <div>
      <h2 className="text-xl text-gray-600 font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-4 mr-2">{description}</p>
          </div>
    
          <button className="bg-teal-600  max-w-max hover:bg-teal-700 transition-all text-white py-1 px-2 rounded-md hidden md:hidden lg:block">
            {buttonText}
          </button>
        </div>
        <Image
          src={image}
          alt={title}
          className=" h-32 object-contain rounded-md "
          width={100}
          height={100}
          priority
        />
      </Link>
    </div>
  );
};

export default ListNowCard;
