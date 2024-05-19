/** @format */

import ListingImages from "./ListingImages";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ListingCardProps {
  photos: string[];
  monthlyRent: number;
  personDescription: string;
  billsIncluded: boolean;
  governance: string;
  city: string;
  id: string;
  loading: boolean;
  accommodationType: string;
}

const MAX_DESCRIPTION_LENGTH = 45; // Adjust the desired maximum length

const ListingCardPerson: React.FC<ListingCardProps> = ({
  photos,
  monthlyRent,
  personDescription,
  billsIncluded,
  governance,
  city,
  id,
  loading,
  accommodationType
}) => {
  // Truncate description if it exceeds the maximum length
  const truncatedDescription =
    personDescription.length > MAX_DESCRIPTION_LENGTH
      ? `${personDescription.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : personDescription;

  return (
    <div className="flex flex-col items-center transition-all cursor-pointer m-2 ">
      <ListingImages photos={photos} />

      <Link className="w-full" href={`/details/person/${id}`}>
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
              <span className="text-sm text-gray-500">Looking for a {accommodationType} in:</span>{" "}
              {governance}, {city}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>

        <div className="flex items-center justify-between">
          <button className="bg-teal-500 hover:bg-teal-300 transition-all text-white py-1 px-2 rounded-md mt-2">
            Add to shortlist
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ListingCardPerson;
