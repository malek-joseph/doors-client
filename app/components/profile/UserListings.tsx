/** @format */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListingType } from "@/app/types/listing";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import Link from "next/link";
import RectangleCarousel from "@/app/components/carousels/RectangleCarousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@/app/components/Pagination";
import {deleteShortlist} from "@/app/services/shortlistService"


const UserListings = () => {
  const userDetails = useSelector(selectUserDetails);
  const [listings, setListings] = useState<{
    properties: ListingType[];
    persons: ListingType[];
  } | null>(null);

    const [currentPageProperties, setCurrentPageProperties] = useState(1);
    const [currentPagePersons, setCurrentPagePersons] = useState(1);
  const listingsPerPage = 2;
  
  useEffect(() => {
    if (userDetails && userDetails.id) {
      getListings(userDetails.id);
    }
  }, [userDetails, currentPageProperties, currentPagePersons]);

  const getListings = async (userId: string) => {
    try {
      const response = await axios.get<{
        properties: ListingType[];
        persons: ListingType[];
      }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/user-listings?userId=${userId}`
      );
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching user listings", error);
    }
  };

  const markAsRented = async (listingId: string, listingType: string) => {
    try {
      await deleteShortlist(listingId)
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete-listing/${listingType}/${listingId}`
      );
 
      toast.success("Listing deleted successfully");

      // Refresh listings after deletion
      if (userDetails && userDetails.id) {
        getListings(userDetails.id);
      }
    } catch (error) {
      console.error("Error marking listing as rented", error);
      toast.error("Error marking listing as rented");
    }
  };

    const indexOfLastProperty = currentPageProperties * listingsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - listingsPerPage;
  const currentProperties = listings?.properties.slice(indexOfFirstProperty, indexOfLastProperty) || [];

  const indexOfLastPerson = currentPagePersons * listingsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - listingsPerPage;
  const currentPersons = listings?.persons.slice(indexOfFirstPerson, indexOfLastPerson) || [];

  const paginateProperties = (pageNumber: number) => setCurrentPageProperties(pageNumber);
  const paginatePersons = (pageNumber: number) => setCurrentPagePersons(pageNumber);


  // console.log(listings);

  return (
     <div className="bg-teal-950 text-white p-6 rounded-lg w-full my-4">
      <h1 className="text-xl font-semibold mb-4">My listings</h1>
      <section className="mb-6">
        <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center mb-4">
          <div className="flex items-center">
       
            <h2 className="font-semibold text-lg mb-3">Places You Offer</h2>
          </div>
          <Link href="/list/place">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              + Create listing
            </button>
          </Link>
        </div>
        {listings && listings.properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProperties.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-teal-900   rounded mb-4 md:flex items-center justify-between">
                  <div className="flex flex-col items-center justify-between w-full">
                    <div className="overflow-hidden w-full ">
                      <RectangleCarousel photos={listing.photos} />
                    </div>
                    <div className="flex items-center my-4 w-full px-5">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {listing.accommodationType}
                        </h3>
                        <p className="text-gray-400">
                          {listing.governorate}, {listing.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row md:flex-row justify-center mt-4 md:mt-0 w-full md:w-auto">
                      <button className="bg-white text-teal-600 px-4 py-2 m-3 rounded shadow hover:bg-teal-300 hover:text-white transition-all">
                        <Link href={`/details/property/${listing._id}`}>
                          View
                        </Link>
                      </button>
                      <button
                        onClick={() => markAsRented(listing._id, "property")}
                        className="bg-white text-red-600 px-4 py-2 m-3 rounded shadow hover:bg-red-700 hover:text-white transition-all">
                        Rented
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              listingsPerPage={listingsPerPage}
              totalListings={listings.properties.length}
              paginate={paginateProperties}
              currentPage={currentPageProperties}
            />
          </>
        ) : (
          <div className="text-gray-400">No properties listings found</div>
        )}
      </section>
      <section className="mt-14">
        <div className="flex flex-col justify-between items-center mb-10 lg:flex-row md:flex-row">
          <div className="flex items-center">
        
            <h2 className="font-semibold text-lg mb-3">Looking for a place</h2>
          </div>
          <Link href="/list/person">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              + Create listing
            </button>
          </Link>
        </div>
        {listings && listings.persons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPersons.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-teal-900  rounded mb-4 md:flex items-center justify-between">
                  <div className="flex flex-col items-center justify-between w-full">
                    <div className="overflow-hidden w-full  ">
                      <RectangleCarousel photos={listing.photos} />
                    </div>
                    <div className="flex items-center my-4 w-full px-5 ">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {listing.accommodationType}
                        </h3>
                        <p className="text-gray-400">
                          {listing.governorate}, {listing.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row md:flex-row justify-center mt-4 md:mt-0 w-full md:w-auto">
                      <button className="bg-white text-teal-600 px-4 py-2 m-3 rounded shadow hover:bg-teal-300 hover:text-white transition-all">
                        <Link href={`/details/person/${listing._id}`}>View</Link>
                      </button>
                      <button
                        onClick={() => markAsRented(listing._id, "person")}
                        className="bg-white text-red-600 px-4 py-2 m-3 rounded shadow hover:bg-red-700 hover:text-white transition-all">
                        Found Place
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              listingsPerPage={listingsPerPage}
              totalListings={listings.persons.length}
              paginate={paginatePersons}
              currentPage={currentPagePersons}
            />
          </>
        ) : (
          <div className="text-gray-400">No Person listings found</div>
        )}
      </section>
    </div>
  );
};

export default UserListings;
