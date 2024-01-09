/** @format */

import { LISTINGS } from "@/app/constants";
import ListingCard from "../cards/listingCard/ListingCardPerson";
import ListingCardPlace from "../cards/listingCard/ListingCardPlace";

const ListSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-3 ">
      {LISTINGS.map((listing, i) =>
        listing.type === "person" ? (
          
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
            governance={listing.governance}
            city={listing.city}
            id={listing.id}
            type={listing.type}
          />
        ) : (
          <ListingCardPlace
            images={listing.images}
            name={listing.name}
            freeMessage={listing.freeMessage}
            rent={listing.rent}
            gender={listing.gender}
            description={listing.description}
            availability={listing.availability}
            key={i}
              billsIncluded={listing.billsIncluded}
              governance={listing.governance}
              city={listing.city}
              list={listing.list}
              id={listing.id}
          />
        )
      )}
    </section>
  );
};

export default ListSection;
