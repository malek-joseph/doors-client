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
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';

const PropertyDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  console.log(id)
  const router = useRouter();
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const userDetails = useSelector(selectUserDetails);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const dispatch = useDispatch()

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

useEffect(() => {
  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:8000/api/properties/propertyDetails/${id}`
      );

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual base URL

      const updatedPropertyDetails = {
        ...response.data,
        photos: response.data.photos.map((photo: string) => {
          const photoPathWithoutUploads = photo.replace(/^uploads\//, "");
          return `${baseURL}/${photoPathWithoutUploads}`;
        }),
      };

      setPropertyDetails(updatedPropertyDetails);
      setLoading(false);
    } catch (error) {
      setError("Error fetching property details");
      setLoading(false);
    }
  };

  if (id) {
    fetchPropertyDetails();
  }
}, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if ( !propertyDetails || !userDetails) {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col items-center justify-center mb-32">
      <div className="w-5/6 ">
        <div className="my-8">
          {propertyDetails?.photos?.length > 0 && (
            <ListingDetailsCarousel
              images={propertyDetails.photos}
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
              accommodationType={propertyDetails.accommodationType}
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
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
