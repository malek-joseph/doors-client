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
  setAvailability,
  setAccommodationType,
  setRoomType,
  setGender,
  setFurnishings,
  setBathroomType,
  setAllowed,
} from "@/app/redux/features/listing/filterSlice";
import { accepting, accommodationTypes } from "@/app/constants/index";

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

  const handleFiltersUpdate = useCallback(() => {
    router.push(`/search?query=${searchQuery}&filter=${filter}`);
    toggleFiltersOverlay();
  }, [router, searchQuery, filter, toggleFiltersOverlay]);

  const handleFilterChange = useCallback(
    (newFilter: "rooms" | "roommates") => {
      dispatch(setFilter(newFilter));
    },
    [dispatch]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, action: any) => {
      // Using switch case to handle different actions
      switch (action.type) {
        case "setQuery":
          dispatch(setQuery(e.target.value));
          break;
        case "setMonthlyRent":
          dispatch(
            setMonthlyRent({
              ...filters.monthlyRent,
              [action.payload.field]: e.target.value,
            })
          );
          break;
        case "setAvailability":
          dispatch(setAvailability(e.target.value));
          break;
        default:
          break;
      }
    },
    [dispatch, filters.monthlyRent]
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
      className="absolute z-20 top-0 left-0 right-0 w-full bg-white shadow-lg rounded-lg cursor-default overflow-y-auto max-h-[80vh]">
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
        <div className="mb-4 border-b border-gray-300 pb-5">
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
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">
            Accommodation type
          </h4>
          <div className="grid grid-cols-2 gap-2">
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
          <div className="flex space-x-4">
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
                checked={filters.roomType === "private"}
                onChange={() => dispatch(setRoomType("private"))}
              />
              Private
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="roomType"
                className="mr-2"
                checked={filters.roomType === "shared"}
                onChange={() => dispatch(setRoomType("shared"))}
              />
              Shared
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Gender</h4>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                className="mr-2"
                checked={filters.gender === "anyone"}
                onChange={() => dispatch(setGender("anyone"))}
              />
              Anyone
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                className="mr-2"
                checked={filters.gender === "women"}
                onChange={() => dispatch(setGender("women"))}
              />
              Women
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                className="mr-2"
                checked={filters.gender === "men"}
                onChange={() => dispatch(setGender("men"))}
              />
              Men
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Furnishings</h4>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.furnishings?.includes("furnished")}
                onChange={() => dispatch(setFurnishings("furnished"))}
              />
              Furnished
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.furnishings?.includes("unfurnished")}
                onChange={() => dispatch(setFurnishings("unfurnished"))}
              />
              Unfurnished
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Bathroom type</h4>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="bathroomType"
                className="mr-2"
                checked={filters.bathroomType === "shared"}
                onChange={() => dispatch(setBathroomType("shared"))}
              />
              Shared
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="bathroomType"
                className="mr-2"
                checked={filters.bathroomType === "private"}
                onChange={() => dispatch(setBathroomType("private"))}
              />
              Private
            </label>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 pb-5">
          <h4 className="font-semibold text-teal-900 mb-2">Allowed</h4>
          <div className="flex space-x-4">
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
        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white focus:outline-none"
            onClick={handleFiltersUpdate}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersOverlay;
