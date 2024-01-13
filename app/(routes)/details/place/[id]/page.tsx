/** @format */

import { LISTINGS } from "@/app/constants";
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PlaceDetailsSection from "@/app/components/sections/listingDetails/person/PersonDetailsSection";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import BudgetAndStay from "@/app/components/sections/listingDetails/person/BudgetAndStay";
import AboutMe from "@/app/components/sections/listingDetails/person/AboutMe";

const PlaceDetails = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  // Convert nid to number if it's a string
  const personId: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  const place = LISTINGS.find(
    (listing) => listing.type === "place" && listing.id === personId
  );

  // Extract the images of the specific person
  const placeImages = place ? place.images : [];
  if (!place) {
    return <div>Loading...</div>; // Return a loading state or handle the case where person is undefined
  }

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="w-5/6 ">
        <div className="my-8">
          <ListingDetailsCarousel images={placeImages} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-8/12">
            <PlaceDetailsSection
              name={place.name}
              freeMessage={place.freeMessage}
              age={place.age}
              gender={place.gender}
              city={place.city}
              governance={place.governance}
              type={place.type}
              list={place.list}
            />
            <hr className="my-3" />

            <BudgetAndStay
              budget={place.budget}
              availability={place.availability}
              availableDuration={place.availableDuration}
              type={place.type}
            />
            <hr className="my-3" />
            <AboutMe
              about={place.about}
              job={place.job}
              smoker={place.smoker}
              pets={place.pets}
              description={place.description}
              type={place.type}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            <SendMessageCard name={place.name} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaceDetails;
