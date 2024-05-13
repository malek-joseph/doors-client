/** @format */

import Link from "next/link";
import ListingImages from "./ListingImages";
import AgeAndPlace from "../../shared/AgeAndPlace";

interface ListingCardProps {
  images: string[];
  name: string;
  freeMessage: string;
  rent: string;
  age?: string;
  gender?: string;
  description: string;
  availability: string;
  governance: string;
  city: string;
  id: number;
  type: string;
  
}

const MAX_DESCRIPTION_LENGTH = 45; // Adjust the desired maximum length

const ListingCard: React.FC<ListingCardProps> = ({
  images,
  name,
  freeMessage,
  rent,
  age,
  gender,
  description,
  availability,
  governance,
  city,
  id,
  type,

}) => {
  // Truncate description if it exceeds the maximum length
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  return (
    <div className="flex flex-col items-center  transition-all cursor-pointer rounded-lg ">
      <ListingImages images={images} name={name} />

      <Link
        className="w-full"
        href={`/details/person/${encodeURIComponent(id)}`}>
        <div className="">
          {/* Name and Free Message Row */}

          {/* Rent and Age Row */}
          <div className="flex justify-between  items-center mb-2">
            <AgeAndPlace age={age} gender={gender} city={ city} governance={governance} type={type} name={name} />

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Budget:</span> {rent}
              <p className="text-teal-500"> </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>

          <div className="flex items-center justify-between">
            {/* Availability Row */}
            <p className="text-gray-600 text-sm">
              Available{" "}
              <span className="font-bold text-md">{availability}</span>
            </p>

            {/* Button */}
            <button className="bg-teal-500 hover:bg-teal-300 transition-all text-white py-1 px-2 rounded-md mt-2">
              Add to shortlist
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
