/** @format */
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import ListingCardRectangle from "@/app/components/cards/listingCard/ListingCardRectangle";
import Pagination from "@/app/components/Pagination";
import { ListingType } from "@/app/types/listing";
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor";
import Breadcrumb from "@/app/components/breadcrumbs/BreadcrumbStandard";
import MapButton from "@/app/components/buttons/MapButton";
import SortingFilter from "@/app/components/inputs/SortingFilter";
import SaveSearchButton from "@/app/components/buttons/SaveSearchButton";
import { useSearchParams } from "next/navigation";


type SortOption = "featured" | "price_asc" | "price_desc";

const SearchAndFiltersPage = () => {
   const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const filter = searchParams.get("filter");

  const [listings, setListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 9;
  const [sortOption, setSortOption] = useState<SortOption>("featured");

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

       let filteredListings = [...properties, ...persons];
       
       if (query) {
         filteredListings = filteredListings.filter(
           (listing) =>
             listing.governorate.toLowerCase().includes(query.toLowerCase()) ||
             listing.city.toLowerCase().includes(query.toLowerCase())
         );
       }

       // Filter by type (rooms or roommates)
       if (filter) {
         filteredListings = filteredListings.filter((listing) =>
           filter === "rooms"
             ? listing.type === "place"
             : listing.type === "person"
         );
       }

       // Sort listings
       switch (sortOption) {
         case "price_asc":
           filteredListings.sort((a, b) => a.monthlyRent - b.monthlyRent);
           break;
         case "price_desc":
           filteredListings.sort((a, b) => b.monthlyRent - a.monthlyRent);
           break;
         case "featured":
         default:
           filteredListings.sort((a, b) => a._id.localeCompare(b._id));
           break;
       }

       setListings(filteredListings);
       setLoading(false);
     } catch (error) {
       console.error("Error fetching listings:", error);
       setLoading(false);
     }
   };

   fetchListings();
 }, [query, filter, sortOption]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flexCenter h-screen w-full">
        <LoadingDoor size={60} />
      </div>
    );
  }


 const indexOfLastListing = currentPage * listingsPerPage;
 const indexOfFirstListing = indexOfLastListing - listingsPerPage;
 const currentListings = listings.slice(
   indexOfFirstListing,
   indexOfLastListing
 );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <div className="bg-gray-100 pb-24">
      <div className="mt-[16px] h-[40px] px-[150px] shadow-lg flex items-center bg-neutral-50 ">
        <Breadcrumb />
      </div>
      <div className="container mx-auto mt-6 px-24">
        <div className="font-semibold  text-teal-950 border-b border-gray-300  pb-6">
          Cairo Rooms for Rent
        </div>
        <div className="flex justify-between items-center  border-b border-gray-300 py-6">
          {/* <MapButton /> */}
          <div className="flex items-center justify-between">
            <div>
              Viewing {indexOfFirstListing + 1}-{indexOfLastListing} of{" "}
              {listings.length} results
            </div>
          </div>
          <div className="flex">
            <SortingFilter onSortChange={handleSortChange} />
            <div className="ml-3">
              <SaveSearchButton />
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-4 my-3 mt-12 min-h-screen">
          {currentListings.map((listing, i) =>
            listing.type === "place" ? (
              <ListingCardRectangle
                key={i}
              listing={listing}
              />
            ) : (
              <ListingCardRectangle
                key={i}
               listing={listing}
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
    </div>
  );
};

export default SearchAndFiltersPage;
