/** @format */

// ListSection.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import ListingCardPlace from "../cards/listingCard/ListingCardPlace";
import ListingCardPerson from "../cards/listingCard/ListingCardPerson";
import SearchAndFiltersBar from "./SearchAndFiltersBar";
import Loading from "@/app/(routes)/shortlists/loading";

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
  const [filteredListings, setFilteredListings] = useState<ListingType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<any>({
    listingType: null,
    roommatePreference: null,
    rentRange: [500, 10000], // Min and Max rent range
    internet: null,
    city: null,
    governance: null,
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const [propertiesResponse, personsResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/properties/allProperties"),
        axios.get("http://localhost:8000/api/persons/allPersons"),
      ]);

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

      const combinedListings = [...updatedProperties, ...updatedPersons];

      setListings(combinedListings);
      setFilteredListings(combinedListings); // Initialize filtered listings with all listings
      setLoading(false);
    } catch (error) {
      console.error("Error fetching property details:", error);
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    applyFilters(searchTerm, filters);
  };

  const handleFilters = (newFilters: any) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (searchTerm: string, filters: any) => {
    let filteredList = [...listings];

    // Apply search term filter
    filteredList = filteredList.filter(
      (listing) =>
        listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.governance.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.accommodationType
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        listing.roommatePreference
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    // Apply additional filters
    if (filters.listingType) {
      filteredList = filteredList.filter(
        (listing) => listing.type === filters.listingType
      );
    }
    if (filters.roommatePreference) {
      filteredList = filteredList.filter(
        (listing) => listing.roommatePreference == filters.roommatePreference
      );
    }
    if (filters.rentRange) {
      filteredList = filteredList.filter(
        (listing) =>
          listing.monthlyRent >= filters.rentRange[0] &&
          listing.monthlyRent <= filters.rentRange[1]
      );
    }
    if (filters.internet !== null) {
      filteredList = filteredList.filter(
        (listing) =>
          listing.internet === (filters.internet === true ? "yes" : "no")
      );
    }
    if (filters.city) {
      filteredList = filteredList.filter((listing) =>
        listing.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.governance) {
      filteredList = filteredList.filter((listing) =>
        listing.governance
          .toLowerCase()
          .includes(filters.governance.toLowerCase())
      );
    }

    setFilteredListings(filteredList);
  };

  console.log(filteredListings);

  return (
    <div className="container mx-auto mt-8">
      <SearchAndFiltersBar onSearch={handleSearch} onFilter={handleFilters} />

      {loading ? (
        <Loading/>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-3 mt-12 min-h-screen">
          {filteredListings.map((listing, i) =>
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
      )}
    </div>
  );
};

export default ListSection;
