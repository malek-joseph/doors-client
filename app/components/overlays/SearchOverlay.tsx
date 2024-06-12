/** @format */

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image"; // Import the Image component


interface SearchOverlayProps {
  toggleSearchOverlay: () => void;

}

const UserAccountOverlay: React.FC<SearchOverlayProps> = ({
  toggleSearchOverlay,

}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to detect click outside of the overlay
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {

        toggleSearchOverlay();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleSearchOverlay]);





  return (
    <div
      ref={overlayRef}
      className="absolute z-20 top-[-12px] left-[-10px] right-[-10px] w-[calc(100% + 20px)] bg-white shadow-lg rounded-lg p-4 cursor-default">
      <div className="flex justify-between mb-4">
        <button className="px-4 py-2 text-white bg-teal-600 rounded-lg focus:outline-none">
          Rooms
        </button>
        <button className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg focus:outline-none">
          Flatmates
        </button>
        <button className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg focus:outline-none">
          Teamups
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Start typing a governorate, city, station or uni"
        />
      </div>
      <div className="flex justify-center mb-4">
        <button className="px-8 py-2 text-white bg-teal-600 rounded-lg focus:outline-none">
          Search
        </button>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 text-gray-700">Explore a city</h3>
        <div className="flex flex-wrap gap-2 text-gray-600">
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Sydney
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Melbourne
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Brisbane
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Perth
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Gold Coast
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Adelaide
          </span>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-gray-700">Recent searches</h3>
        <div className="flex flex-col gap-2 text-gray-600">
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Sydney Share Accommodation
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Flatmate Teamups
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/path/to/location-icon.svg"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Rooms for Rent
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserAccountOverlay;
