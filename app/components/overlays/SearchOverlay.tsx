// SearchOverlay.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, setFilter, selectFilter } from "@/app/redux/features/listing/filterSlice";
import "../../../public/css/svg.css";

interface SearchOverlayProps {
  toggleSearchOverlay: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ toggleSearchOverlay }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { query: searchQuery, filter } = useSelector(selectFilter);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        toggleSearchOverlay();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleSearchOverlay]);

  const handleSearch = () => {
    toggleSearchOverlay();
    dispatch(setQuery(searchQuery));
    dispatch(setFilter(filter));
    router.push(`/search?query=${searchQuery}&filter=${filter}`);
  };

  const handleFilterChange = (newFilter: "rooms" | "roommates") => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div
      ref={overlayRef}
      className="absolute z-20 top-[-1px] left-[-10px] right-[-10px] w-[calc(100% + 20px)] bg-white shadow-lg rounded-lg p-4 cursor-default"
    >
      <div className="flex justify-center mb-4 mx-5">
        <button
          className={`px-4 py-2 ${
            filter === "rooms"
              ? "text-white border border-teal-600 bg-teal-600"
              : "text-teal-600 border border-teal-600"
          } focus:outline-none`}
          onClick={() => handleFilterChange("rooms")}
        >
          Rooms
        </button>
        <button
          className={`px-4 py-2 ${
            filter === "roommates"
              ? "text-white border border-teal-600 bg-teal-600"
              : "text-teal-600 border border-teal-600"
          } focus:outline-none`}
          onClick={() => handleFilterChange("roommates")}
        >
          Roommates
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-400 rounded-sm cursor-pointer transition-all hover:border-teal-500 focus:outline-teal-500 text-teal-900 "
          placeholder="Start typing a governorate or city"
          value={searchQuery}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="px-8 py-2 text-white bg-teal-600 rounded-lg focus:outline-none hover:bg-teal-500 transition-all w-full flex items-center justify-center"
          onClick={handleSearch}
        >
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
          {/* Other cities */}
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
          {/* Other recent searches */}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
