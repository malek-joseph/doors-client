/** @format */

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setFilter,
  selectFilter,
  setMonthlyRent,
  setBillsIncluded,
  setAccommodationType,
  setRoomType,
  setGender,
  setFurnishing,
  setBathroomType,
  setAllowed,
  setActiveFiltersCount,
} from "@/app/redux/features/listing/filterSlice";
import { accepting, accommodationTypes } from "@/app/constants/index";
import { RootState, AppDispatch } from "@/app/redux/store";


interface FiltersOverlayProps {
  toggleFiltersOverlay: () => void;
}

const FiltersOverlay: React.FC<FiltersOverlayProps> = ({
  toggleFiltersOverlay,
}) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { query: searchQuery, filter, ...filters } = useSelector(selectFilter);
  const dispatch = useDispatch();

    const {
      query,
      
      monthlyRent,
      billsIncluded,
      accommodationType,
      roomType,
      gender,
      furnishing,
      bathroomType,
      allowed,
    } = useSelector((state: RootState) => state.filter);

const activeFiltersCount = Object.keys(filters).reduce((count, key) => {
  // Ensure TypeScript knows how to access properties dynamically
  const filtersTyped = filters as {
    monthlyRent: { min: string | null; max: string | null };
    billsIncluded: boolean;
    accommodationType: string[];
    roomType: "any" | "Private" | "Shared";
    gender: "anyone" | "Women only" | "Men only";
    furnishing: "any" | "Furnished" | "Unfurnished";
    bathroomType: "any" | "Shared" | "Private";
    allowed: string[];
  };

  if (key !== "monthlyRent" && key !== "allowed") {
    const value = filtersTyped[key as keyof typeof filtersTyped];

    // Exclude filters that have "any" as a value from active count
    if (value !== "any" && value !== 'anyone' && value !== false) {
      // console.log(value)
      if (Array.isArray(value) && value.length > 0) {
        return count + 1;
      }

      if (
        (typeof value === "string" ) ||
        typeof value === "boolean"
      ) {
        console.log(value)
        return count + 1;
      }
    }
  }

  return count;
}, 0);



        useEffect(() => {
          dispatch(setActiveFiltersCount(activeFiltersCount));
        }, [dispatch, activeFiltersCount]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        toggleFiltersOverlay();
      }
    },
    [toggleFiltersOverlay]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // const handleFiltersUpdate = useCallback(() => {
  //   router.push(`/search?query=${searchQuery}&filter=${filter}`);
  //   toggleFiltersOverlay();
  // }, [router, searchQuery, filter, toggleFiltersOverlay]);



 const handleFilterChange = useCallback(
   (newFilter: "rooms" | "roommates") => {
     dispatch(setFilter(newFilter)); // Update filter state
     router.push(`/search?query=${searchQuery}&filter=${newFilter}`); // Use newFilter directly
   },
   [dispatch, router, searchQuery]
 );

const handleInputChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>, action: any) => {
    // Using switch case to handle different actions
    switch (action.type) {
      case "setQuery":
        const newQuery = e.target.value;
        dispatch(setQuery(newQuery));
        router.push(`/search?query=${newQuery}&filter=${filter}`);
        break;
      case "setMonthlyRent":
        dispatch(
          setMonthlyRent({
            ...filters.monthlyRent,
            [action.payload.field]: e.target.value,
          })
        );
        router.push(`/search?query=${searchQuery}&filter=${filter}`);
        break;
      default:
        break;
    }
  },
  [dispatch, router, filters.monthlyRent, searchQuery, filter]
);


  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, action: any) => {
      dispatch(action(e.target.checked));
    },
    [dispatch]
  );

  return (
    <div
      ref={overlayRef}
      className="absolute z-20 top-[-5px] left-0 right-0 w-full bg-white shadow-lg rounded-lg cursor-default overflow-y-auto max-h-[80vh]">
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${
              filter === "rooms"
                ? "text-white border border-teal-600 bg-teal-600"
                : "text-teal-600 border border-teal-600"
            } focus:outline-none`}
            onClick={() => handleFilterChange("rooms")}>
            Rooms
          </button>
          <button
            className={`px-4 py-2 ${
              filter === "roommates"
                ? "text-white border border-teal-600 bg-teal-600"
                : "text-teal-600 border border-teal-600"
            } focus:outline-none`}
            onClick={() => handleFilterChange("roommates")}>
            Roommates
          </button>
        </div>
        <div className="my-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-sm cursor-pointer transition-all hover:border-teal-500 focus:outline-teal-500 text-teal-900"
            placeholder="Start typing a governorate or city."
            value={searchQuery}
            onChange={(e) => handleInputChange(e, { type: "setQuery" })}
          />
        </div>
        <div className="pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Monthly Rent</h4>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="min EGP"
              className="w-1/2 p-2 border border-gray-400 rounded-sm cursor-pointer transition-all hover:border-teal-500 focus:outline-teal-500 text-teal-950"
              value={filters.monthlyRent.min || ""}
              onChange={(e) =>
                handleInputChange(e, {
                  type: "setMonthlyRent",
                  payload: { field: "min" },
                })
              }
            />
            <input
              type="number"
              placeholder="max EGP"
              className="w-1/2 p-2 border border-gray-400 rounded-sm cursor-pointer transition-all hover:border-teal-500 focus:outline-teal-500 text-teal-950"
              value={filters.monthlyRent.max || ""}
              onChange={(e) =>
                handleInputChange(e, {
                  type: "setMonthlyRent",
                  payload: { field: "max" },
                })
              }
            />
          </div>
          <div className="mt-2 border-b border-gray-300 pb-5 ml-2">
            <label className="flex items-center text-xs text-gray-400">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.billsIncluded}
                onChange={(e) => handleCheckboxChange(e, setBillsIncluded)}
              />
              Bills included
            </label>
          </div>
        </div>
        {/* <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Availability</h4>
          <div className="flex space-x-2">
            <input
              type="date"
              className="w-1/2 p-2 border border-gray-400 rounded-sm cursor-pointer transition-all hover:border-teal-500 focus:outline-teal-500 text-teal-950"
              value={filters.availability || ""}
              onChange={(e) =>
                handleInputChange(e, { type: "setAvailability" })
              }
            />
          </div>
        </div> */}
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">
            Accommodation type
          </h4>
          <div className="grid grid-cols-2 gap-2 text-gray-500 text-sm">
            {accommodationTypes.map((accommodationType, i) => (
              <label className="flex items-center" key={i}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.accommodationType?.includes(
                    accommodationType.name
                  )}
                  onChange={() =>
                    dispatch(setAccommodationType(accommodationType.name))
                  }
                />
                {accommodationType.name}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Room type</h4>
          <div className="flex space-x-4 text-gray-500 text-sm">
            <label className="flex items-center">
              <input
                type="radio"
                name="roomType"
                className="mr-2"
                checked={filters.roomType === "any"}
                onChange={() => dispatch(setRoomType("any"))}
              />
              Any
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="roomType"
                className="mr-2"
                checked={filters.roomType === "Private"}
                onChange={() => dispatch(setRoomType("Private"))}
              />
              Private
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="roomType"
                className="mr-2"
                checked={filters.roomType === "Shared"}
                onChange={() => dispatch(setRoomType("Shared"))}
              />
              Shared
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Gender</h4>
          <div className="flex space-x-4 text-gray-500 text-sm">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                className="mr-2"
                checked={filters.gender === "anyone"}
                onChange={() => dispatch(setGender("anyone"))}
              />
              Any
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                className="mr-2"
                checked={filters.gender === "Women only"}
                onChange={() => dispatch(setGender("Women only"))}
              />
              Women
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                className="mr-2"
                checked={filters.gender === "Men only"}
                onChange={() => dispatch(setGender("Men only"))}
              />
              Men
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Furnishing</h4>
          <div className="flex space-x-4 text-gray-500 text-sm">
               <label className="flex items-center">
              
              <input
                type="radio"
                name="furnishing"
                className="mr-2"
                checked={filters.furnishing?.includes("any")}
                onChange={() => dispatch(setFurnishing("any"))}
              />
              Any
            </label>
            <label className="flex items-center">
              
              <input
                type="radio"
                 name="furnishing"
                className="mr-2"
                checked={filters.furnishing?.includes("Furnished")}
                onChange={() => dispatch(setFurnishing("Furnished"))}
              />
              Furnished
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                 name="furnishing"
                className="mr-2"
                checked={filters.furnishing?.includes("Unfurnished")}
                onChange={() => dispatch(setFurnishing("Unfurnished"))}
              />
              Unfurnished
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Bathroom type</h4>
          <div className="flex space-x-4 text-gray-500 text-sm">
               <label className="flex items-center">
              <input
                type="radio"
                name="bathroomType"
                className="mr-2"
                checked={filters.bathroomType === "any"}
                onChange={() => dispatch(setBathroomType("any"))}
              />
              Any
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="bathroomType"
                className="mr-2"
                checked={filters.bathroomType === "Shared"}
                onChange={() => dispatch(setBathroomType("Shared"))}
              />
              Shared
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="bathroomType"
                className="mr-2"
                checked={filters.bathroomType === "Private"}
                onChange={() => dispatch(setBathroomType("Private"))}
              />
              Private
            </label>
          </div>
        </div>
        <div className="mb-4 ">
          <h4 className="font-semibold text-teal-900 mb-2">Allowed</h4>
          <div className="flex space-x-4 text-gray-500 text-sm">
            {accepting.map((accept, i) => (
              <label className="flex items-center" key={i}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.allowed?.includes(accept.name)}
                  onChange={() => dispatch(setAllowed(accept.name))}
                />
                {accept.name}
              </label>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-center mt-4">
          <button
            className="px-6 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white focus:outline-none"
            onClick={handleFiltersUpdate}>
            Apply
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FiltersOverlay;
