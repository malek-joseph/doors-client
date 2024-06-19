/** @format */
"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListingCardRectangle from "@/app/components/cards/listingCard/ListingCardRectangle";
import Pagination from "@/app/components/Pagination";
import Breadcrumb from "@/app/components/breadcrumbs/BreadcrumbStandard";
import SortingFilter from "@/app/components/inputs/SortingFilter";
import SaveSearchButton from "@/app/components/buttons/SaveSearchButton";
import { useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/app/helpers/helperFunctions";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  setQuery,
  setFilter,
  setMonthlyRent,
  setBillsIncluded,
  setAvailability,
  setAccommodationType,
  setRoomType,
  setGender,
  setFurnishings,
  setBathroomType,
  setAllowed,
} from "@/app/redux/features/listing/filterSlice";
import { ListingType } from "@/app/types/listing";
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor";

type SortOption = "featured" | "price_asc" | "price_desc";

const SearchAndFiltersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    query,
    filter,
    monthlyRent,
    billsIncluded,
    availability,
    accommodationType,
    roomType,
    gender,
    furnishings,
    bathroomType,
    allowed,
  } = useSelector((state: RootState) => state.filter);

  const searchParams = useSearchParams();
  const [listings, setListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 9;
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  useEffect(() => {
    dispatch(setQuery(searchParams.get("query") || ""));
    dispatch(
      setFilter(searchParams.get("filter") as "rooms" | "roommates" | null)
    );
  }, [dispatch, searchParams]);

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
        console.log(filteredListings)
        // Apply filters
        if (query) {
          filteredListings = filteredListings.filter(
            (listing) =>
              listing.governorate.toLowerCase().includes(query.toLowerCase()) ||
              listing.city.toLowerCase().includes(query.toLowerCase())
          );
        }

        if (filter) {
          filteredListings = filteredListings.filter((listing) =>
            filter === "rooms"
              ? listing.type === "place"
              : listing.type === "person"
          );
        }
        console.log(filteredListings)


        if (monthlyRent.min !== null || monthlyRent.max !== null) {
          filteredListings = filteredListings.filter((listing) => {
            const rent = listing.monthlyRent;
            if (
              monthlyRent.min !== null &&
              rent < parseFloat(monthlyRent.min)
            ) {
              return false;
            }
            if (
              monthlyRent.max !== null &&
              rent > parseFloat(monthlyRent.max)
            ) {
              return false;
            }
            return true;
          });
        }
        console.log(filteredListings)


        if (billsIncluded) {
          filteredListings = filteredListings.filter(
            (listing) => listing.billsIncluded
          );
        }

        console.log(filteredListings)


        if (availability) {
          filteredListings = filteredListings.filter(
            (listing) => listing.moveInDate === availability
          );
        }
        console.log(filteredListings)


        if (accommodationType.length > 0) {
          filteredListings = filteredListings.filter((listing) =>
            accommodationType.includes(listing.accommodationType)
          );
        }
        console.log(accommodationType)


        if (roomType !== "any") {
          filteredListings = filteredListings.filter(
            (listing) => listing.roomType === roomType
          );
        }
        console.log(filteredListings)


        if (gender !== "anyone") {
          filteredListings = filteredListings.filter(
            (listing) => listing.roommatePreference === gender
          );
        }
        console.log(filteredListings)


        if (furnishings !== "any") {
          filteredListings = filteredListings.filter(
            (listing) => listing.furnishing === furnishings
          );
        }
        console.log(filteredListings)


        if (bathroomType !== "any") {
          filteredListings = filteredListings.filter(
            (listing) => listing.roomBathroom === bathroomType
          );
        }
        console.log(filteredListings)


        if (allowed.length > 0) {
          filteredListings = filteredListings.filter((listing) =>
            allowed.every((item) => listing.roommatePreferences.includes(item))
          );
        }
        console.log(filteredListings)


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
        console.log("before", filteredListings)


        setListings(filteredListings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [
    query,
    filter,
    monthlyRent,
    billsIncluded,
    availability,
    accommodationType,
    roomType,
    gender,
    furnishings,
    bathroomType,
    allowed,
    sortOption,
  ]);

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

        console.log(listings)


  return (
    <div className="bg-gray-100 pb-24">
      <div className="mt-[16px] h-[40px] px-[150px] shadow-lg flex items-center bg-neutral-50">
        <Breadcrumb />
      </div>
      <div className="container mx-auto mt-6 px-24">
        <div className="font-semibold text-teal-950 border-b border-gray-300 pb-6">
          {filter === "rooms" ? (
            <span className="">
              {capitalizeFirstLetter(filter)} in {capitalizeFirstLetter(query)}{" "}
              for rent
            </span>
          ) : (
            <span>
              {capitalizeFirstLetter(filter)} looking for a place in{" "}
              {capitalizeFirstLetter(query)}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 py-6">
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
              <ListingCardRectangle key={i} listing={listing} />
            ) : (
              <ListingCardRectangle key={i} listing={listing} />
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