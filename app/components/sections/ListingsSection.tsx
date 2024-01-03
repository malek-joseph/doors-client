/** @format */

import { LISTINGS } from "@/app/constants";
import ListingCard from "../cards/ListingCard";

const ListSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {LISTINGS.map((listing, i) => (
        <ListingCard
          images={listing.images}
          name={listing.name}
          freeMessage={listing.freeMessage}
          rent={listing.rent}
          age={listing.age}
          gender={listing.gender}
          description={listing.description}
          availability={listing.availability}
          key={i}
        />
      ))}
    </section>
  );
};

export default ListSection;
