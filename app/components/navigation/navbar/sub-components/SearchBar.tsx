/** @format */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SearchOverlay from "@/app/components/overlays/SearchOverlay";
import FiltersOverlay from "@/app/components/overlays/FiltersOverlay";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";




const SearchBar = () => {
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
  const [isFiltersOverlayVisible, setIsFiltersOverlayVisible] = useState(false);
  const [isSearchRoute, setIsSearchRoute] = useState(false);
  const activeFiltersCount = useSelector(
    (state: RootState) => state.filter.activeFiltersCount
  );
  const pathname = usePathname();

  useEffect(() => {
    // Check if the current route starts with "/search"
    if (pathname.startsWith("/search")) {
      setIsSearchRoute(true);
    } else {
      setIsSearchRoute(false);
    }
  }, [pathname]);

  const toggleSearchOverlay = () => {
    setIsSearchOverlayVisible(!isSearchOverlayVisible);
  };

  const toggleFiltersOverlay = () => {
    setIsFiltersOverlayVisible(!isFiltersOverlayVisible);
  };

  const handleOverlayToggle = () => {
    if (isSearchRoute) {
      toggleFiltersOverlay();
    } else {
      toggleSearchOverlay();
    }
  };

  return (
    <div className="relative w-full lg:mx-5 flexCenter">
      <div className="relative flex items-center transition-all border-gray-400 hover:border-teal-500 border cursor-pointer w-full py-1.5 px-4 mx-5 rounded-md max-w-xl h-12 ">
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
        {isSearchRoute && (
          <button
            className="ml-auto text-teal-900 border border-gray-300 rounded-full px-3 py-1 flex items-center pr-5"
            onClick={(e) => {
              e.stopPropagation();
              toggleFiltersOverlay();
            }}>
            <Image
              src="/assets/images/tweaks.svg"
              alt="filter"
              width={20}
              height={20}
              className="filter-teal"
            />
            <span className="ml-2 text-md mr-2">Filters</span>
            <div className="relative ml-2">
            
                {activeFiltersCount > 0 &&   <span className="absolute -top-2 -right-2 bg-teal-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"> {activeFiltersCount}    </span>}
           
            </div>
          </button>
        )}
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleOverlayToggle}
        />
        {isSearchOverlayVisible && (
          <SearchOverlay toggleSearchOverlay={toggleSearchOverlay} />
        )}
        {isFiltersOverlayVisible && (
          <FiltersOverlay toggleFiltersOverlay={toggleFiltersOverlay} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
