/** @format */
"use client";
// pages/shortlist.tsx

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import Link from "next/link";

import {
  getShortlists,
  deleteShortlist,
} from "@/app/services/shortlistService";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import ListingCarousel from "@/app/components/carousels/ListingCarousel";
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor";

const ShortlistPage: React.FC = () => {
  const userDetails = useSelector(selectUserDetails);
  const [shortlist, setShortlist] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<
    "place" | "person" | null
  >(null);

  useEffect(() => {
    if (!userDetails) return; 

    const fetchShortlists = async () => {
      try {
        const shortlists = await getShortlists(userDetails.id);
        setShortlist(shortlists);
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch shortlists:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchShortlists();
  }, [userDetails]);

  const handleOptionSelect = (option: "place" | "person") => {
    setSelectedOption(option);
  };

  const removeFromShortlist = async (id: string) => {
    try {
      await deleteShortlist(id); // Replace with actual API route
      // Manually update the shortlist state
      setShortlist(shortlist.filter((item) => item._id !== id));
      // Optionally, you can also re-fetch the shortlist
      mutate("/api/shortlists");
      
    } catch (error) {
      console.error("Failed to remove from shortlist:", error);
      // Optionally, you can set an error state here
    }
  };

  // if (loading) return <div className="min-h-screen w-full flexCenter">
  //   <LoadingDoor size={50}/>
  // </div>;
  if (error)
    return (
      <div className="min-h-screen flexCenter">
        Error loading data: {error.message}
      </div>
    );

  const filteredShortlist = selectedOption
    ? shortlist.filter((item) => item.listingType === selectedOption)
    : shortlist;

    let hasProperties
    let hasPersons

  if (shortlist.length > 0 ) {
    hasProperties = shortlist.some(
    (item) => item.listingType === "place"
  );
   hasPersons = shortlist.some((item) => item.listingType === "person");

  }

  // console.log(shortlist);

  return (
    <div className="container mx-auto p-4 min-h-screen mb-14 mt-14 md:mt-0 lg:mt-0">
      <div className="flex justify-between items-center mt-8 mb-14 text-teal-900">
        <h1 className="text-2xl font-semibold">Shortlist</h1>
      </div>
      {shortlist.length === 0 && (
        <div className="flex flex-col items-center mt-16">
          <p className="text-gray-600 mb-4">
            No items have been added to your shortlist.
          </p>
          <Link href="/" className="text-blue-500 hover:underline">
            Go to Home Page
          </Link>
        </div>
      )}

        {hasProperties && hasPersons && (
      <div className="flex justify-between gap-3  mb-4 lg:px-14 flex-col md:flex-row lg:flex-row">
          <div
            className={`cursor-pointer p-2 rounded-md text-center ${
              selectedOption === "place"
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-500 border border-teal-900 hover:border-teal-400"
            }`}
            onClick={() => handleOptionSelect("place")}>
            Compare Properties
          </div>
                 <div
            className={`cursor-pointer p-2 rounded-md text-center ${
              selectedOption === "person"
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-500 border border-teal-900 hover:border-teal-400"
            }`}
            onClick={() => handleOptionSelect("person")}>
            Compare Roommates
          </div>
      </div>
        )}
    

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
        {filteredShortlist.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {item.listingType === "place" ? item.title : item.name}
              </h2>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFromShortlist(item._id)}>
                Remove
              </button>
            </div>

            <div className="mb-2">
              <ListingCarousel photos={item.listingDetails.photos} />
            </div>

            {item.listingType === "place" && (
              <>
                <div className="flex justify-between mb-2 items-center">
                  <h2 className="text-xl font-semibold text-gray-600">
                    {item.listingDetails.monthlyRent}{" "}
                    <span className="font-thin text-sm ">
                      {" "}
                      {item.listingDetails.billsIncluded && "bills inc."}
                    </span>
                  </h2>
                </div>

                {/* Rent and Age Row */}
                <div className="flex  justify-between items-center mb-2">
                  <div className="flex flex-col">
                    {/* <p className="text-gray-600 text-sm">{list}</p> */}

                    <p className="text-teal-500">
                      {" "}
                      <span className="text-sm text-gray-500">
                        A {item.listingDetails.accommodationType} is for rent
                        in:
                      </span>{" "}
                      {item.listingDetails.governorate},{" "}
                      {item.listingDetails.city}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Roommate Preference: {item.listingDetails.roommatePreference}
                </p>
              </>
            )}

            {item.listingType === "person" && (
              <>
                <div className="flex justify-between mb-2 items-center">
                  <h2 className="text-xl font-semibold text-gray-600">
                    {item.listingDetails.monthlyRent}{" "}
                    <span className="font-thin text-sm ">
                      {" "}
                      {item.listingDetails.billsIncluded && "bills inc."}
                    </span>
                  </h2>
                </div>

                {/* Rent and Age Row */}
                <div className="flex  justify-between items-center mb-2">
                  <div className="flex flex-col">
                    {/* <p className="text-gray-600 text-sm">{list}</p> */}

                    <p className="text-teal-500">
                      {" "}
                      <span className="text-sm text-gray-500">
                        Looking for a {item.listingDetails.accommodationType}{" "}
                        in:
                      </span>{" "}
                      {item.listingDetails.governorate},{" "}
                      {item.listingDetails.city}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  Roommate Preference: {item.listingDetails.roommatePreference}
                </p>
              </>
            )}

            <Link
              className="text-blue-500 hover:underline"
              href={
                item.listingType === "place"
                  ? `/details/place/${item.listingDetails._id}`
                  : `/details/person/${item.listingDetails._id}`
              }>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortlistPage;
