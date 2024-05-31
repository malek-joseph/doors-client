/** @format */
"use client"

import {useState, useEffect} from 'react'
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PersonDetailsSectionOne from "@/app/components/sections/listingDetails/person/PersonDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import PersonDetailsSectionTwo from "@/app/components/sections/listingDetails/person/PersonDetailsSectionTwo";
import PersonDetailsSectionThree from "@/app/components/sections/listingDetails/person/PersonDetailsSectionThree";
import PersonDetailsSectionFour from "@/app/components/sections/listingDetails/person/PersonDetailsSectionFour";
import PersonDetailsSectionFive from "@/app/components/sections/listingDetails/person/PersonDetailsSectionFive";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';

const PersonDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  // console.log(id)
  const router = useRouter();
  const [personDetails, setPersonDetails] = useState<any>(null);
  const userDetails = useSelector(selectUserDetails);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const dispatch = useDispatch()

useEffect(() => {
  if (personDetails && personDetails.userPhoto) {
    const photoPathWithoutUploads = personDetails.userPhoto.replace(
      /^uploads\//,
      ""
    );
    setImageSrc(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`
    );
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
  
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Reperson with your actual base URL
  
        const updatedPersonDetails = {
          ...response.data,
          photos: response.data.photos.map((photo: string) => {
          const photoPathWithoutUploads = photo.replace(/^uploads\//, "");
          return `${baseURL}/${photoPathWithoutUploads}`;
        }),
      };

      setPersonDetails(updatedPersonDetails);
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
    return <div>Error: {error}</div>;
  }


// console.log(personDetails)

  return (
    <main className="flex flex-col items-center justify-center mb-10 min-h-screen">
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
              governance={personDetails.governance}
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

export default PersonDetailsReview;
