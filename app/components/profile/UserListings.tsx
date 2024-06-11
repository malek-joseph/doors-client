/** @format */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListingType } from "@/app/types/listing";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import Link from "next/link";
import ListingCarousel from "@/app/components/carousels/ListingCarousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserListings = () => {
  const userDetails = useSelector(selectUserDetails);
  const [listings, setListings] = useState<{
    properties: ListingType[];
    persons: ListingType[];
  } | null>(null);

  useEffect(() => {
    if (userDetails && userDetails.id) {
      getListings(userDetails.id);
    }
  }, [userDetails]);

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

  console.log(listings);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg w-full my-4">
      <h1 className="text-xl font-semibold mb-4">My listings</h1>
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full text-lg mr-3 flex items-center justify-center">
              <span
                role="img"
                aria-label="house"
                style={{ fontSize: "1.5rem" }}>
                🏠
              </span>
            </div>{" "}
            <h2 className="font-semibold text-lg">Places You Offer</h2>
          </div>
          <Link href="/list/place">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              + Create listing
            </button>
          </Link>
        </div>
        {listings && listings.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.properties.map((listing) => (
              <div
                key={listing._id}
                className="bg-gray-700 px-4 py-3 rounded mb-4 md:flex items-center justify-between">
                <div className="flex flex-col items-center justify-between w-full">
                  <div className="overflow-hidden w-full md:w-2/3 ">
                    <ListingCarousel photos={listing.photos} />
                  </div>
                  <div className="flex items-center my-4 w-full md:w-2/3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {listing.accommodationType}
                      </h3>
                      <p className="text-gray-400">
                        {listing.governance}, {listing.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 md:mt-0 w-full md:w-auto">
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
        ) : (
          <div className="text-gray-400">No properties listings found</div>
        )}
      </section>
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full text-lg mr-3 flex items-center justify-center">
              <span
                role="img"
                aria-label="house"
                style={{ fontSize: "1.5rem" }}>
                🔍
              </span>
            </div>{" "}
            <h2 className="font-semibold text-lg">Looking for a place</h2>
          </div>
          <Link href="/list/person">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              + Create listing
            </button>
          </Link>
        </div>
        {listings && listings.persons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.persons.map((listing) => (
              <div
                key={listing._id}
                className="bg-gray-700 px-4 py-3 rounded mb-4 md:flex items-center justify-between">
                <div className="flex flex-col items-center justify-between w-full">
                  <div className="overflow-hidden w-full md:w-2/3 ">
                    <ListingCarousel photos={listing.photos} />
                  </div>
                  <div className="flex items-center my-4 w-full md:w-2/3 ">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {listing.accommodationType}
                      </h3>
                      <p className="text-gray-400">
                        {listing.governance}, {listing.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 md:mt-0 w-full md:w-auto">
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
        ) : (
          <div className="text-gray-400">No Person listings found</div>
        )}
      </section>
    </div>
  );
};

export default UserListings;
