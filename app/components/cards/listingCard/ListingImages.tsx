/** @format */
"use client";

import Image from "next/image";
import ListingCarousel from "../../carousels/ListingCarousel";

interface ListingImagesProps {
  photos: string[];
}

const ListingImages: React.FC<ListingImagesProps> = ({ photos }) => {
  return (
    <div className="relative mb-4  ">
      <ListingCarousel photos={photos} />
    </div>
  );
};

export default ListingImages;
