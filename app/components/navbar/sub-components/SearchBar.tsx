/** @format */
"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchOverlay from "@/app/components/overlays/SearchOverlay";



const SearchBar = () => {
    const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);

  const toggleSearchOverlay = () => {
   
      setIsSearchOverlayVisible(!isSearchOverlayVisible);
  };
  
  return (
    <div className="relative flex items-center transition-all border-gray-400 hover:border-black border cursor-pointer w-full py-1.5 px-4 mx-5 rounded-md max-w-md h-12 " onClick={()=>{setIsSearchOverlayVisible(true)}}>
      <div className="mr-2">
        <Image
          src="/assets/images/magnifying.svg"
          alt="magnifying"
          width={20}
          height={20}
        />
      </div>
      <div className=" ">
        <p className="text-sm text-gray-500 ml-2">Search rooms and roommates</p>
      </div>
      {isSearchOverlayVisible && (
        <SearchOverlay
          toggleSearchOverlay={toggleSearchOverlay}
        />
      )}
    </div>
  );
};

export default SearchBar;
