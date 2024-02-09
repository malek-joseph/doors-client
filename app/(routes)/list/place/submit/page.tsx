/** @format */
"use client"

import { LISTINGS } from "@/app/constants";
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PlaceDetailsSection from "@/app/components/sections/listingDetails/person/PersonDetailsSection";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import BudgetAndStay from "@/app/components/sections/listingDetails/person/BudgetAndStay";
import AboutMe from "@/app/components/sections/listingDetails/person/AboutMe";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";
import { useSelector } from "react-redux";
import {
  selectPropertyDetails,
} from "@/app/redux/features/listing/listingFormSlice";


const PropertyDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const propertyDetails = useSelector(selectPropertyDetails);



  const personId: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  const place = LISTINGS.find(
    (listing) => listing.type === "place" && listing.id === personId
  );

const imageUrls = propertyDetails.photos.map((file) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return ""; // Or handle this case as appropriate
});  console.log(imageUrls)



  
  if (!propertyDetails) {
    return <Spinner/> ; // Return a loading state or handle the case where person is undefined
  }

   const handleBackClick = () => {
     router.push("/list/place/describe");
   };

   const handleNextClick = () => {
     router.push("/list/place/submit");
   };




  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="w-5/6 ">
        <div className="my-8">
          <ListingDetailsCarousel images={imageUrls} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          {/* <div className="w-full lg:w-8/12">
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
          </div> */}
          <NextBackBtns
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
          />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
