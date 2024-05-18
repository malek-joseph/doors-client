/** @format */

import { LISTINGS } from "@/app/constants";
import { useState, useEffect } from 'react';
import ListingCard from "../cards/listingCard/ListingCardPerson";
import ListingCardPlace from "../cards/listingCard/ListingCardPlace";
import axios from "axios";

type ListingType = {
  governance: string;
  city: string;
  totalBedrooms: number | string;
  totalBathrooms: number | string;
  internet: string;
  totalRoommates: number | string;
  roomType: string;
  furnishing: string;
  roomBathroom: string;
  selectedFeatures: string[];
  monthlyRent: number;
  deposit: number;
  billsIncluded: boolean;
  monthlyBills: number;
  photos: string[];
  roommatePreference: string;
  roommatePreferences: string[];
  description: string;
  propertyDescription: string;
  type: string;
  accommodationType: string;
  _id: string;
};

const ListSection = () => {
const [listings, setListings] = useState<ListingType[]>([]);

useEffect(() => {
  const fetchListings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/properties/allProperties"
      );
      const properties: ListingType[] = response.data;

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual base URL
      const updatedListings = properties.map((listing) => ({
        ...listing,
        photos: listing.photos.map((photo) => {
          const photoPathWithoutUploads = photo.replace(/^uploads\//, "");
          return `${baseURL}/${photoPathWithoutUploads}`;
        }),
      }));

      setListings(updatedListings);

    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  fetchListings();
}, []);

console.log(listings)



//     useEffect(() => {
//     // Fetch people details from backend API
//     axios.get('API_ENDPOINT_FOR_PEOPLE_DATA')
//       .then(response => {
//         const people = response.data;
//         setListings(prevListings => [...prevListings, ...people]);
//       })
//       .catch(error => {
//         console.error('Error fetching people details:', error);
//       });
//   }, []);



  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-3 ">
      {listings.map((listing, i) =>
        // listing.type === "person" && (
        //   <ListingCard
        //     photos={listing.photos}
        //     name={listing.name}
        //     freeMessage={listing.freeMessage}
        //     rent={listing.rent}
        //     age={listing.age}
        //     gender={listing.gender}
        //     description={listing.description}
        //     availability={listing.availability}
        //     key={i}
        //     governance={listing.governance}
        //     city={listing.city}
        //     id={listing.id}
        //     type={listing.type}
        //   />
        // ) 
        listing.type === "place" && 
        (
          <ListingCardPlace
            photos={listing.photos}
            monthlyRent={listing.monthlyRent}
            propertyDescription={listing.propertyDescription}
            key={i}
            billsIncluded={listing.billsIncluded}
            governance={listing.governance}
            city={listing.city}
            id={listing._id}
          />
        )
      )}
    </section>
  );
};

export default ListSection;
