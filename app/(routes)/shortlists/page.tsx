/** @format */
"use client"
// pages/shortlist.tsx

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { getShortlists } from "@/app/services/shortlistService";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";

const ShortlistPage: React.FC = () => {
   const userDetails = useSelector(selectUserDetails);
  const [shortlist, setShortlist] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<
  
    "property" | "person" | null
  >(null);



useEffect(() => {
  if (!userDetails) return; // Changed from `return null` to `return`

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

  


  const handleOptionSelect = (option: "property" | "person") => {
    setSelectedOption(option);
  };

  const removeFromShortlist = async (id: string) => {
    await axios.delete(`/api/shortlists/${id}`); // Replace with actual API route

    // Manually re-fetch shortlist after deletion
    mutate("/api/shortlists");
  };

  if (loading) return <div>Loading...</div>;
  if (error ) return <div>Error loading data: {error.message}</div>;

  console.log(shortlist)
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mt-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Shortlist</h1>
      </div>

      <div className="flex justify-between mb-4">
        <div
          className={`cursor-pointer p-4 rounded-md ${
            selectedOption === "property"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleOptionSelect("property")}>
          Compare Properties
        </div>
        <div
          className={`cursor-pointer p-4 rounded-md ${
            selectedOption === "person"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleOptionSelect("person")}>
          Compare Roommates
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shortlist.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {item.type === "property" ? item.title : item.name}
              </h2>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFromShortlist(item.id)}>
                Remove
              </button>
            </div>

            <div className="mb-2">
              <Image
                src={item.listingDetails.photos[0]}
                alt={item.type === "property" ? item.title : item.name}
                width={400}
                height={250}
                className="object-cover rounded-lg"
              />
            </div>

            <p className="text-gray-600 mb-2">
              Monthly Rent: ${item.monthlyRent}, Bills Included:{" "}
              {item.billsIncluded ? "Yes" : "No"}
            </p>

            <p className="text-gray-600 mb-2">
              Governance: {item.governance}, City: {item.city}
            </p>

            <Link
              className="text-blue-500 hover:underline"
              href={
                item.type === "property"
                  ? `/property-details/${item.id}`
                  : `/person-details/${item.id}`
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
