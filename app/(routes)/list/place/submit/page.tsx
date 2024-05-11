/** @format */
"use client"

import { LISTINGS } from "@/app/constants";
import {useState, useEffect} from 'react'
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PlaceDetailsSectionOne from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import BudgetAndStay from "@/app/components/sections/listingDetails/person/BudgetAndStay";
import AboutMe from "@/app/components/sections/listingDetails/person/AboutMe";
import NextBackBtns from "@/app/components/shared/buttons/NextBackBtns";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "@/app/redux/features/listing/listingFormSlice";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";

const PropertyDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const propertyDetails = useSelector(selectPropertyDetails);
  const userDetails = useSelector(selectUserDetails);

  console.log(userDetails);

  const personId: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  const place = LISTINGS.find(
    (listing) => listing.type === "place" && listing.id === personId
  );

  if (!propertyDetails || !userDetails) {
    return <Spinner />; // Return a loading state or handle the case where person is undefined
  }
  // console.log(propertyDetails.photos);

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
          <ListingDetailsCarousel images={propertyDetails.photos} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-8/12">
            <PlaceDetailsSectionOne
              name={userDetails.name}
              age={userDetails.age}
              gender={userDetails.gender}
              city={propertyDetails.city}
              governance={propertyDetails.governance}
              placeOrPerson={"place"}
            />
            <hr className="my-3" />

            {/* <BudgetAndStay
              budget={propertyDetails.monthlyRent}
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
            /> */}
          </div>
          <div className="w-full lg:w-4/12 ">
            <SendMessageCard name={userDetails.name} photo={userDetails.photo} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
