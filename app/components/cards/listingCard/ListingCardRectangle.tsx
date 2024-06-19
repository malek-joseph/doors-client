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
import RectangleCarousel from "@/app/components/carousels/RectangleCarousel";
import { ListingType } from "@/app/types/listing";



const MAX_DESCRIPTION_LENGTH = 45; // Adjust the desired maximum length

interface ListingCardProps {
  listing: ListingType;
}

const ListingCardRectangle: React.FC<ListingCardProps> = ({
listing
}) => {
  const { description, _id: id, type, photos , monthlyRent,billsIncluded,accommodationType, governorate, city } = listing;
  // Truncate description if it exceeds the maximum length
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const userDetails = useSelector(selectUserDetails);

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
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <RectangleCarousel photos={photos} />
      </div>

      <div className="p-4">
        <Link href={`/details/${type}/${id}`}>
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {monthlyRent}{" "}
              <span className="font-thin text-sm">
                {billsIncluded && "bills inc."}
              </span>
            </h2>
          </div>

          <div className="mb-2">
            <p className="text-teal-500">
              <span className="text-sm text-gray-500">
                {type === "place"
                  ? `A ${accommodationType} is for rent in:`
                  : `Looking for a ${accommodationType} in:`}
              </span>{" "}
              {governorate}, {city}
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>
        </Link>

        <button
          className="w-full bg-teal-500 hover:bg-teal-300 transition-all text-white py-2 rounded-md mt-2"
          onClick={handleAddToShortlist}
        >
          Add to shortlist
        </button>
      </div>
    </div>
  );
};

export default ListingCardRectangle;