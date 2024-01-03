/** @format */

import ListingImages from "./listingCard/ListingImages";


interface ListingCardProps {
  images: string[];
  name: string;
  freeMessage: string;
  rent: string;
  age: string;
  gender: string;
  description: string;
  availability: string;
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
}) => {
  // Truncate description if it exceeds the maximum length
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  
  return (
    <div className="flex flex-col items-center max-w-md mx-auto transition-all cursor-pointer bg-white rounded-lg overflow-hidden my-3">
      <ListingImages images={images} name={name} />

      <div className="">
        {/* Name and Free Message Row */}
        <div className="flex justify-between mb-2 items-center">
          <h2 className="text-xl font-semibold text-gray-600">{name}</h2>
          <p className="text-gray-500 text-xs border border-gray-500 rounded p-1">
            {freeMessage}
          </p>
        </div>

        {/* Rent and Age Row */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-teal-500">{rent}</p>
          <p className="text-gray-600 text-sm">
            {age} year old {gender}
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>

        <div className="flex items-center justify-between">
          {/* Availability Row */}
          <p className="text-gray-600 text-sm">
            Available <span className="font-bold text-md">{availability}</span>
          </p>

          {/* Button */}
          <button className="bg-teal-500 hover:bg-teal-300 transition-all text-white py-1 px-2 rounded-md mt-2">
            Add to shortlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
