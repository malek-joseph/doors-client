/** @format */
"use client"

import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListingCarousel from "@/app/components/carousels/ListingCarousel";


interface ListingCardProps {
  type: string;
  photos: string[];
  monthlyRent: number;
  description: string;
  billsIncluded: boolean;
  governorate: string;
  city: string;
  id: string;
  accommodationType: string;
  loading?: boolean;
}

const MAX_DESCRIPTION_LENGTH = 45; // Adjust the desired maximum length

const ListingCardSquare: React.FC<ListingCardProps> = ({
  type,
  photos,
  monthlyRent,
  description,
  billsIncluded,
  governorate,
  city,
  id,
  loading,
  accommodationType,
}) => {
  // Truncate description if it exceeds the maximum length
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const userDetails = useSelector(selectUserDetails);
  // console.log(userDetails)

  const handleAddToShortlist = async () => {
    if (!userDetails) return null;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shortlists`, {
        userId: userDetails.id,
        listingId: id,
        listingType: type,
      });
      toast.success("Listing added to shortlist!");
    } catch (error: any) {
      // If error due to listing already in shortlist, show error toast
      if (error.response && error.response.status === 400) {
        toast.error("Listing is already in shortlist!");
      } else {
        // Handle other errors
        toast.error("Failed to add to shortlist. Please try again later.");
      }
    }
  };

  return (
    <div className="transition-all">
       <div className="relative mb-4 w-full  ">
      <ListingCarousel photos={photos} />
    </div>

      <Link className="w-full cursor-pointer" href={`/details/${type}/${id}`}>
        {/* Name and Free Message Row */}
        <div className="flex justify-between mb-2 items-center">
          <h2 className="text-xl font-semibold text-gray-600">
            {monthlyRent}{" "}
            <span className="font-thin text-sm">
              {" "}
              {billsIncluded && "bills inc."}
            </span>
          </h2>
        </div>

        {/* Rent and Age Row */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
            <p className="text-teal-500">
              {" "}
              <span className="text-sm text-gray-500">
                {type === "place"
                  ? `A ${accommodationType} is for rent in:`
                  : `Looking for a ${accommodationType} in:`}
              </span>{" "}
              {governorate}, {city}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>
      </Link>

      <div className="flex items-center justify-between">
        <button
          className="bg-teal-500 hover:bg-teal-300 transition-all text-white py-1 px-2 rounded-md mt-2"
          onClick={handleAddToShortlist}
        >
          Add to shortlist
        </button>
      </div>
    </div>
  );
};

export default ListingCardSquare;
