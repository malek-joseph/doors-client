/** @format */
"use client"

import {useState, useEffect} from 'react'
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PersonDetailsSectionOne from "@/app/components/listingDetails/person/PersonDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import PersonDetailsSectionTwo from "@/app/components/listingDetails/person/PersonDetailsSectionTwo";
import PersonDetailsSectionThree from "@/app/components/listingDetails/person/PersonDetailsSectionThree";
import PersonDetailsSectionFour from "@/app/components/listingDetails/person/PersonDetailsSectionFour";
import PersonDetailsSectionFive from "@/app/components/listingDetails/person/PersonDetailsSectionFive";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';

const EditPersonListing = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const [personDetails, setPersonDetails] = useState<any>(null);
  const userDetails = useSelector(selectUserDetails);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const dispatch = useDispatch()

useEffect(() => {
  if (personDetails && personDetails.userPhoto) {
    const photo = personDetails.userPhoto
    setImageSrc(photo)
  }
}, [personDetails]);

useEffect(() => {
  const fetchPersonDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/persons/personDetails/${id}`
      );
      setPersonDetails(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching person details");
      setLoading(false);
    }
  };

  if (id) {
    fetchPersonDetails();
  }
}, [id]);

  if (error) {
    return <div className='min-h-screen flexCenter'>This person has found a place</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center mb-24 min-h-screen">
      <div className="w-5/6 ">
          {personDetails && userDetails  && (
            <>
                   <div className="my-8">
            <ListingDetailsCarousel
              images={personDetails.photos}
            />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
            <div className="w-full lg:w-8/12">
            <PersonDetailsSectionOne
              gender={userDetails.gender}
              city={personDetails.city}
              governorate={personDetails.governorate}
              roomType={personDetails.roomType}
              roommatePreference={personDetails.roommatePreference}
              furnishing={personDetails.furnishing}
              bathroomType={personDetails.roomBathroom}
              accommodationType={personDetails.accommodationType}
            />
            <hr className="my-3" />

            <PersonDetailsSectionTwo
              monthlyRent={personDetails.monthlyRent}
              deposit={personDetails.deposit}
              billsIncluded={personDetails.billsIncluded}
              monthlyBills={personDetails.monthlyBills}
              internet={personDetails.internet}
              totalRoommates={personDetails.totalRoommates}
            />
            <hr className="my-3" />
            <PersonDetailsSectionThree
              roommatePreferences={personDetails.roommatePreferences}
            />
            <hr className="my-3" />
            <PersonDetailsSectionFour
              personFeatures={personDetails.selectedFeatures}
            />
            <hr className="my-3" />
            <PersonDetailsSectionFive
              description={personDetails.description}
              personDescription={personDetails.personDescription}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            {imageSrc && (
              <SendMessageCard 
                    name={personDetails.userName}
                    photo={imageSrc}
                    listingId={personDetails._id}
                    listingType={personDetails.type}
                    ownerId={personDetails.userId}
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

export default EditPersonListing;
