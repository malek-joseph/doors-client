/** @format */
"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import ListingCardPlace from "@/app/components/cards/listingCard/ListingCardPlace";
import ListingCardPerson from "@/app/components/cards/listingCard/ListingCardPerson";
import Pagination from "@/app/components/Pagination";
import { ListingType } from "@/app/types/listing";
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor";

const SearchAndFiltersPage =  () => {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 9;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [propertiesResponse, personsResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/allProperties`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/persons/allPersons`
          ),
        ]);

        const properties: ListingType[] = propertiesResponse.data;
        const persons: ListingType[] = personsResponse.data;

        setListings([...properties, ...persons]);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flexCenter h-screen w-full ">
        <LoadingDoor size={60} />
      </div>
    );
  }

  // Get current listings
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-8">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-3 mt-12 min-h-screen">
        {currentListings.map((listing, i) =>
          listing.type === "place" ? (
            <ListingCardPlace
              key={i}
              photos={listing.photos}
              monthlyRent={listing.monthlyRent}
              propertyDescription={listing.propertyDescription}
              billsIncluded={listing.billsIncluded}
              governorate={listing.governorate}
              city={listing.city}
              id={listing._id}
              accommodationType={listing.accommodationType}
            />
          ) : (
            <ListingCardPerson
              key={i}
              photos={listing.photos}
              monthlyRent={listing.monthlyRent}
              personDescription={listing.personDescription}
              billsIncluded={listing.billsIncluded}
              governorate={listing.governorate}
              city={listing.city}
              id={listing._id}
              accommodationType={listing.accommodationType}
            />
          )
        )}
      </section>
      <Pagination
        listingsPerPage={listingsPerPage}
        totalListings={listings.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default SearchAndFiltersPage;
