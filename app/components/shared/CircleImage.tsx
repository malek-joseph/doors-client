/** @format */

import React from "react";
import Image from "next/image";

interface CircleImageProps {
  imageUrl: string;
}

const CircleImage: React.FC<CircleImageProps> = ({ imageUrl }) => {
  return (
    <div className="rounded-full  h-16 w-16 flex items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt="Circular Image"
        className=" object-cover h-full w-full"
        width={100}
        height={100}
      />
    </div>
  );
};

export default CircleImage;
