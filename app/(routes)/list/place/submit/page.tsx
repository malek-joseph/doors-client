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
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  // Load photos from local storage on component mount
  useEffect(() => {
    const storedImages = localStorage.getItem("propertyImages");
    if (storedImages) {
      setImageURLs(JSON.parse(storedImages));
    }

  }, []);



     // Convert Base64 strings to Blob URLs
 const base64ToBlobURL = (base64String: string): string => {
   try {
     const byteCharacters = atob(base64String.split(",")[1]);
     const byteNumbers = new Array(byteCharacters.length);
     for (let i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
     }
     const byteArray = new Uint8Array(byteNumbers);
     const blob = new Blob([byteArray], { type: "image/jpeg" });
     return URL.createObjectURL(blob);
   } catch (error) {
     console.error("Error decoding Base64 string:", error);
     return ""; // Return empty string or handle the error accordingly
   }
 };

  if ( !propertyDetails || !userDetails) {
    return <Spinner />;
  }


  // console.log(propertyDetails.photos);

  const handleBackClick = () => {
    router.push("/list/place/property");
  };

  const handleNextClick = () => {
    router.push("/list/place/submit");
  };

  console.log(imageURLs);
  
  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="w-5/6 ">
        <div className="my-8">
            {imageURLs?.length > 0 && (
          <ListingDetailsCarousel
            images={imageURLs.map((url) => base64ToBlobURL(url))}
          />
           )}
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
            <SendMessageCard
              name={userDetails.name}
              photo={userDetails.photo}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
