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
    <div className="relative h-60 w-full mb-4">
      {/* <Image
        src={images[1]}
        alt={name}
        className="object-cover rounded-md" 
        layout="fill"
      /> */}
      <ListingCarousel   images={images}/>
    </div>
  );
};

export default ListingImages;
