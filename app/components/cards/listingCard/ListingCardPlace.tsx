/** @format */

import ListingImages from "./ListingImages";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ListingCardProps {
  photos: string[];
  monthlyRent: number;
  propertyDescription: string;
  billsIncluded: boolean;
  governance: string;
  city: string;
  id: string;
  accommodationType: string;
  loading: boolean;
}

const MAX_DESCRIPTION_LENGTH = 45; // Adjust the desired maximum length

const ListingCardPlace: React.FC<ListingCardProps> = ({
  photos,
  monthlyRent,
  propertyDescription,
  billsIncluded,
  governance,
  city,
  id,
  loading,
  accommodationType,
}) => {
  // Truncate description if it exceeds the maximum length
  const truncatedDescription =
    propertyDescription.length > MAX_DESCRIPTION_LENGTH
      ? `${propertyDescription.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : propertyDescription;

  const userDetails = useSelector(selectUserDetails);
  // console.log(userDetails)


  const handleAddToShortlist = async () => {
  if (!userDetails) return null;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/shortlists`,
        {
          userId: userDetails.id, // Replace with actual user ID
          listingId: id,
          listingType: "property",
        }
      );
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
    <div className=" transition-all  ">
      <ListingImages photos={photos} />

      <Link className="w-full cursor-pointer" href={`/details/property/${id}`}>
        {/* Name and Free Message Row */}
        <div className="flex justify-between mb-2 items-center">
          <h2 className="text-xl font-semibold text-gray-600">
            {monthlyRent}{" "}
            <span className="font-thin text-sm ">
              {" "}
              {billsIncluded && "bills inc."}
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
                A {accommodationType} is for rent in:
              </span>{" "}
              {governance}, {city}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>
      </Link>

      <div className="flex items-center justify-between">
        <button
          className="bg-teal-500 hover:bg-teal-300 transition-all text-white py-1 px-2 rounded-md mt-2"
          onClick={handleAddToShortlist}>
          Add to shortlist
        </button>
      </div>
    </div>
  );
};

export default ListingCardPlace;
