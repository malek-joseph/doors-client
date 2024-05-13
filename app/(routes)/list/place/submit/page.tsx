/** @format */
"use client"

import {useState, useEffect} from 'react'
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PlaceDetailsSectionOne from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import PlaceDetailsSectionTwo from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionTwo";
import PlaceDetailsSectionThree from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionThree";
import PlaceDetailsSectionFour from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionFour";
import PlaceDetailsSectionFive from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionFive";
import PublishEditBtns from "@/app/components/shared/buttons/PublishEditBtns";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";
import { useSelector } from "react-redux";
import {
  selectPropertyDetails,
  selectAccommodationType,
  clearListingForm,
} from "@/app/redux/features/listing/listingFormSlice";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import publishProperty from './publishProperty'
import { useDispatch } from "react-redux";



const PropertyDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const propertyDetails = useSelector(selectPropertyDetails);
  const accommodationType = useSelector(selectAccommodationType);
  const userDetails = useSelector(selectUserDetails);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
const dispatch = useDispatch()
  // Load photos from local storage on component mount
useEffect(() => {
  const storedImages = localStorage.getItem("propertyImages");
  console.log("Stored images:", storedImages);
  if (storedImages) {
    setImageURLs(JSON.parse(storedImages));
  } else {
    setImageURLs([]); // Set a default empty array if no data is found
  }
}, []);
  // Load the user's photo when userDetails changes
useEffect(() => {
  if (userDetails && userDetails.photo) {
    // Remove the "uploads" word from userDetails.photo
    const photoPathWithoutUploads = userDetails.photo.replace(/^uploads\//, "");
    // Set the image source with the modified path
    setImageSrc(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`
    );
  }
}, [userDetails]);
  // console.log(imageURLs)



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

  const onEditClick = () => {
    router.push("/list/place/property");
  };

  const onPublishClick = async () => {
    const updatedPropertyDetails = { ...propertyDetails, type: "place" };
    
   publishProperty(imageURLs.map((url) => base64ToBlobURL(url)), userDetails, updatedPropertyDetails, accommodationType);
   localStorage.removeItem("propertyImages")
      dispatch(clearListingForm());
    router.push("/");

};

  
  return (
    <main className="flex flex-col items-center justify-center mb-32">
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
              gender={userDetails.gender}
              city={propertyDetails.city}
              governance={propertyDetails.governance}
              roomType={propertyDetails.roomType}
              roommatePreference={propertyDetails.roommatePreference}
              furnishing={propertyDetails.furnishing}
              bathroomType={propertyDetails.roomBathroom}
              accommodationType={accommodationType}
            />
            <hr className="my-3" />

            <PlaceDetailsSectionTwo
              monthlyRent={propertyDetails.monthlyRent}
              deposit={propertyDetails.deposit}
              billsIncluded={propertyDetails.billsIncluded}
              monthlyBills={propertyDetails.monthlyBills}
              internet={propertyDetails.internet}
              totalRoommates={propertyDetails.totalRoommates}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionThree
              roommatePreferences={propertyDetails.roommatePreferences}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionFour
              placeFeatures={propertyDetails.selectedFeatures}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionFive
              description={propertyDetails.description}
              propertyDescription={propertyDetails.propertyDescription}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            {imageSrc && (
              <SendMessageCard name={userDetails.name} photo={imageSrc} />
            )}
          </div>
            <PublishEditBtns
          onEditClick={onEditClick}
          onPublishClick={onPublishClick}
        />

        
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
