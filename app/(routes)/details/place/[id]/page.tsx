/** @format */
"use client"

import {useState, useEffect} from 'react'
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PlaceDetailsSectionOne from "@/app/components/listingDetails/place/PlaceDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import PlaceDetailsSectionTwo from "@/app/components/listingDetails/place/PlaceDetailsSectionTwo";
import PlaceDetailsSectionThree from "@/app/components/listingDetails/place/PlaceDetailsSectionThree";
import PlaceDetailsSectionFour from "@/app/components/listingDetails/place/PlaceDetailsSectionFour";
import PlaceDetailsSectionFive from "@/app/components/listingDetails/place/PlaceDetailsSectionFive";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';

const PropertyDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  // console.log(id)
  const router = useRouter();
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const userDetails = useSelector(selectUserDetails);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const dispatch = useDispatch()

useEffect(() => {
  if (propertyDetails && propertyDetails.userPhoto) {
      const photo = propertyDetails.userPhoto
    setImageSrc(photo)
  }
}, [propertyDetails]);


useEffect(() => {
  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/propertyDetails/${id}`
      );

      setPropertyDetails(response.data);
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
    return <div className='min-h-screen flexCenter'>Listing has been rented out</div>;
  }

 
  return (
    <main className="flex flex-col items-center justify-center mb-24 min-h-screen">
      <div className="w-5/6 ">
        {propertyDetails  && (
          <>
            <div className="my-8">
              <ListingDetailsCarousel images={propertyDetails.photos} />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
              <div className="w-full lg:w-8/12">
                <PlaceDetailsSectionOne
                  gender={propertyDetails.roommatePreference}
                  city={propertyDetails.city}
                  governorate={propertyDetails.governorate}
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
                  <SendMessageCard
                    name={propertyDetails.userName}
                    photo={imageSrc}
                    listingId={propertyDetails._id}
                    listingType={propertyDetails.type}
                    ownerId={propertyDetails.userId}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
