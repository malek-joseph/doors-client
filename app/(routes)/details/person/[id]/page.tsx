/** @format */


import { LISTINGS } from "@/app/constants";
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";


const PersonDetails = ({ params }: { params: { id: number } })  => {
  const { id } = params;

  // Convert nid to number if it's a string
  const personId: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  
  const person = LISTINGS.find(
    (listing) => listing.type === "person" && listing.id === personId
  );
    
  // Extract the images of the specific person
  const personImages = person ? person.images : [];

  return (
    <main className="flex flex-col items-center justify-center">
         <div className="w-5/6 ">
        {/* Pass the person's images to the ListingDetailsCarousel component */}
          <ListingDetailsCarousel images={personImages} />
        </div>
    </main>
  );
};

export default PersonDetails;
