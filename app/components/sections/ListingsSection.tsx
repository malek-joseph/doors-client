/** @format */

import { LISTINGS } from "@/app/constants";
import { useState, useEffect } from 'react';
import ListingCard from "../cards/listingCard/ListingCardPerson";
import ListingCardPlace from "../cards/listingCard/ListingCardPlace";
import ListingCardPerson from "../cards/listingCard/ListingCardPerson";
import axios from "axios";


type ListingType = {
  governance: string;
  city: string;
  totalBedrooms: number | string;
  totalBathrooms: number | string;
  internet: string;
  totalRoommates: number | string;
  roomType: string;
  moveInDate: string;
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
  personDescription: string;
  type: string;
  accommodationType: string;
  _id: string;
};

const ListSection = () => {
const [listings, setListings] = useState<ListingType[]>([]);
const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  const fetchListings = async () => {
    setLoading(true);
    try {
      const [propertiesResponse, personsResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/properties/allProperties"),
        axios.get("http://localhost:8000/api/persons/allPersons"),
      ]);

      // console.log("Properties Response:", propertiesResponse.data);
      // console.log("Persons Response:", personsResponse.data);

      const properties: ListingType[] = propertiesResponse.data;
      const persons: ListingType[] = personsResponse.data;

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual base URL

      const updatedProperties = properties.map((listing) => ({
        ...listing,
        photos: listing.photos.map((photo) => {
          const photoPathWithoutUploads = photo.replace(/^uploads\//, "");
          return `${baseURL}/${photoPathWithoutUploads}`;
        }),
      }));

      const updatedPersons = persons.map((listing) => ({
        ...listing,
        photos: listing.photos.map((photo) => {
          const photoPathWithoutUploads = photo.replace(/^uploads\//, "");
          return `${baseURL}/${photoPathWithoutUploads}`;
        }),
      }));

      // Combine properties and persons into one array
      const combinedListings = [...updatedProperties, ...updatedPersons];

      // console.log("Combined Listings:", combinedListings);

      setListings(combinedListings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching property details:", error);
      setLoading(false);
    }
  };

  fetchListings();
}, []);



// console.log(listings)






  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-3 min-h-screen">
       {listings.map((listing, i) =>
        listing.type === "place" ? (
          <ListingCardPlace
            key={i}
            photos={listing.photos}
            monthlyRent={listing.monthlyRent}
            propertyDescription={listing.propertyDescription}
            billsIncluded={listing.billsIncluded}
            governance={listing.governance}
            city={listing.city}
            id={listing._id}
            loading={loading}
            accommodationType={listing.accommodationType}
          />
        ) : (
        <ListingCardPerson
            key={i}
            photos={listing.photos}
            monthlyRent={listing.monthlyRent}
            personDescription={listing.personDescription}
            billsIncluded={listing.billsIncluded}
            governance={listing.governance}
            city={listing.city}
            id={listing._id}
               loading={loading}
               accommodationType={listing.accommodationType}
          />
        )
      )}
    </section>
  );
};

export default ListSection;
