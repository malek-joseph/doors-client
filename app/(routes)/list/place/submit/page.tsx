/** @format */
"use client"

import { LISTINGS } from "@/app/constants";
import {useState, useEffect} from 'react'
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
const [objectURLs, setObjectURLs] = useState<string[]>(propertyDetails?.photos || []);



  const personId: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  const place = LISTINGS.find(
    (listing) => listing.type === "place" && listing.id === personId
  );
    useEffect(() => {
      // Retrieve stored images from local storage
      const storedImages = localStorage.getItem("uploadedImages");
      if (storedImages) {
        setObjectURLs(JSON.parse(storedImages));
      }
    }, []);
  
  if (!propertyDetails) {
    return <Spinner/> ; // Return a loading state or handle the case where person is undefined
  }
  console.log(propertyDetails.photos);
  
  
  
   const handleBackClick = () => {
     router.push("/list/place/property");
   };

   const handleNextClick = () => {
     router.push("/list/place/submit");
   };




  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="w-5/6 ">
        <div className="my-8">
          <ListingDetailsCarousel images={objectURLs} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          {/* <div className="w-full lg:w-8/12"> */}
          {/* <PlaceDetailsSection
              name={propertyDetails.name}
              freeMessage={propertyDetails.freeMessage}
              age={propertyDetails.age}
              gender={propertyDetails.gender}
              city={propertyDetails.city}
              governance={propertyDetails.governance}
              type={propertyDetails.type}
              list={propertyDetails.list}
            /> */}
          <hr className="my-3" />
          {/* 
            <BudgetAndStay
              budget={propertyDetails.budget}
              availability={propertyDetails.availability}
              availableDuration={propertyDetails.availableDuration}
              type={propertyDetails.type}
            />
            <hr className="my-3" />
            <AboutMe
              about={propertyDetails.about}
              job={propertyDetails.job}
              smoker={propertyDetails.smoker}
              pets={propertyDetails.pets}
              description={propertyDetails.description}
              type={propertyDetails.type}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            <SendMessageCard name={propertyDetails.name} />
          </div>  */}
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
