/** @format */
"use client"

import { LISTINGS } from "@/app/constants";
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PersonDetailsSection from "@/app/components/sections/listingDetails/person/PersonDetailsSection";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import BudgetAndStay from "@/app/components/sections/listingDetails/person/BudgetAndStay";
import AboutMe from "@/app/components/sections/listingDetails/person/AboutMe";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";


const PersonDetails = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();


  const personId: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  const person = LISTINGS.find(
    (listing) => listing.type === "person" && listing.id === personId
  );


  const personImages = person ? person.images : [];
  if (!person) {
    return <Spinner/>  
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
          <ListingDetailsCarousel images={personImages} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-8/12">
            <PersonDetailsSection
              name={person.name}
              freeMessage={person.freeMessage}
              age={person.age}
              gender={person.gender}
              city={person.city}
              governance={person.governance}
              type={person.type}
            />
            <hr className="my-3" />

            <BudgetAndStay
              budget={person.budget}
              availability={person.availability}
              availableDuration={person.availableDuration}
              type={person.type}
            />
            <hr className="my-3" />
            <AboutMe
              about={person.about}
              job={person.job}
              smoker={person.smoker}
              pets={person.pets}
              type={person.type}
              description={person.description}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            <SendMessageCard name={person.name} />
          </div>
             <NextBackBtns
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
          
        />
        </div>
      </div>
    </main>
  );
};

export default PersonDetails;
