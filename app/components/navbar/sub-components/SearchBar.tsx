/** @format */
"use client"
import Image from "next/image";
import { useState } from "react";
import SearchOverlay from "@/app/components/overlays/SearchOverlay";

const SearchBar = () => {
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);

  const toggleSearchOverlay = () => {
    setIsSearchOverlayVisible(!isSearchOverlayVisible);
  };

  return (
    <div className="relative w-full mx-5 mr-10">
      <div className="relative flex items-center transition-all border-gray-400 hover:border-teal-500 border cursor-pointer w-full py-1.5 px-4 mx-5 rounded-md max-w-lg h-12 ">
        <div className="mr-2">
          <Image
            src="/assets/images/magnifying.svg"
            alt="magnifying"
            width={20}
            height={20}
            className="filter-teal"
          />
        </div>
        <div className="">
          <p className="text-sm text-gray-500 ml-2">Search in location</p>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={toggleSearchOverlay}
        />
        {isSearchOverlayVisible && (
          <SearchOverlay toggleSearchOverlay={toggleSearchOverlay} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
