/** @format */
"use client";

import Image from "next/image";
import ListingCarousel from "../../carousels/ListingCarousel";

interface ListingImagesProps {
  images: string[];
  name: string;
}

const ListingImages: React.FC<ListingImagesProps> = ({ images, name }) => {
  return (
    <div className="relative w-full h-80 mb-4 overflow-hidden ">
      {/* <Image
        src={images[0]}
        alt={name}
        className=" rounded-md w-full h-full object-cover"
        width={500} 
        height={700}
      /> */}
      <ListingCarousel   images={images}/>
    </div>
  );
};

export default ListingImages;
