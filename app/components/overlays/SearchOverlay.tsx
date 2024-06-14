/** @format */
import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Import the Image component
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  toggleSearchOverlay: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  toggleSearchOverlay,
}) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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

  const handleSearch = () => {
    toggleSearchOverlay();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <div
      ref={overlayRef}
      className="absolute z-20 top-[-1px] left-[-10px] right-[-10px] w-[calc(100% + 20px)] bg-white shadow-lg rounded-lg p-4 cursor-default">
      <div className="flex justify-center mb-4 mx-5">
        <button className="px-4 py-2 text-white border border-teal-600 bg-teal-600  focus:outline-none">
          Rooms
        </button>
        <button className="px-4 py-2 text-teal-600 border border-teal-600 focus:outline-none">
          Roommates
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-400 rounded-sm cursor-pointer transition-all hover:border-teal-500 focus:outline-teal-500 text-teal-950 font-thin"
          placeholder="Start typing a governorate, city, station or uni"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="px-8 py-2 text-white bg-teal-600 rounded-lg focus:outline-none hover:bg-teal-500 transition-all w-full flex items-center justify-center"
          onClick={handleSearch}>
          <div className="mr-2">
            <Image
              src="/assets/images/magnifying.svg"
              alt="magnifying"
              width={20}
              height={20}
              className="filter-white"
            />
          </div>
          Search
        </button>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 text-gray-700">Explore a city</h3>
        <div className="flex flex-wrap gap-2 text-gray-600">
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Cairo
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            New Cairo
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            6th of October
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Zayed
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Giza
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Alexandria
          </span>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-gray-600 text-sm bg-gray-300 px-2 rounded-sm">
          Recent searches
        </h3>
        <div className="flex flex-col gap-2 text-gray-600">
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Sydney Share Accommodation
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
              alt="location icon"
              width={16}
              height={16}
            />{" "}
            Flatmate Teamups
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-500 transition-all">
            <Image
              src="/assets/images/location.png"
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

export default SearchOverlay;
