/** @format */
"use client"
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
import { deleteShortlist } from "@/app/services/shortlistService";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';


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
    // Send PATCH request to toggle activation status
    await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/toggle-listing/${listingType}/${listingId}`
    );

    toast.success("Listing status updated successfully");

    // Refresh listings after updating status
    if (userDetails && userDetails.id) {
      getListings(userDetails.id);
    }
  } catch (error) {
    console.error("Error updating listing status", error);
    toast.error("Error updating listing status");
  }
};
  
  const deleteListing = async (listingId: string, listingType: string) => {
    try {
      await deleteShortlist(listingId);
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
  const currentProperties =
    listings?.properties.slice(indexOfFirstProperty, indexOfLastProperty) || [];

  const indexOfLastPerson = currentPagePersons * listingsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - listingsPerPage;
  const currentPersons =
    listings?.persons.slice(indexOfFirstPerson, indexOfLastPerson) || [];

  const paginateProperties = (pageNumber: number) =>
    setCurrentPageProperties(pageNumber);
  const paginatePersons = (pageNumber: number) =>
    setCurrentPagePersons(pageNumber);

  return (
    <div className="bg-teal-950 text-white p-6 rounded-lg w-full my-4">
      <h1 className="text-xl font-semibold mb-8">My listings</h1>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton _expanded={{ bg: "#004c4c", color: "white" }} >
          <h2 className="font-semibold text-md mb-3">Places You Offer</h2>
            <Box as="span" flex="1" textAlign="left">
            
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
              <Link href="/list/place">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-5 mt-3">
                  + Create listing
                </button>
              </Link>
            {listings && listings.properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProperties.map((listing) => (
                    <div
                      key={listing._id}
                      className="bg-teal-900 rounded mb-4 md:flex items-start justify-between"
                    >
                      <div className="flex flex-col items-center justify-start w-full">
                        <div className="overflow-hidden w-full">
                          <RectangleCarousel photos={listing.photos} />
                        </div>
                        <div className="flex items-center my-4 px-5 w-full">
                          <div className="w-full">
                            <div className="flex items-center justify-between w-full">
                                 <h3 className="text-lg font-semibold">
                              {listing.accommodationType}
                            </h3>
                                <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              colorScheme="teal"
                              size="sm"
                              className="absolute top-0 right-0 m-2"
                            />
                            <MenuList style={{ minWidth: '5rem' }}>
                              <MenuItem color="orange.300">  <Link className="w-full cursor-pointer" href={`/edit/${listing.type}/${listing._id}`}> Edit   </Link></MenuItem>
                                  <MenuDivider />

                              <MenuItem
                              color="red.500"
                                onClick={() =>
                                  deleteListing(listing._id, 'property')
                                }
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                            </div>
                         
                            <p className="text-gray-400">
                              {listing.governorate}, {listing.city}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row md:flex-row justify-center mt-4 md:mt-0 w-full md:w-auto">
                          <button className="bg-white text-teal-600 px-4 py-2 m-3 rounded shadow hover:bg-teal-400 hover:text-white transition-all">
                            <Link href={`/details/property/${listing._id}`}>
                              View
                            </Link>
                          </button>
                          <button
                            onClick={() => markAsRented(listing._id, "property")}
                            className="bg-white text-green-600 px-4 py-2 m-3 rounded shadow hover:bg-green-600 hover:text-white transition-all"
                          >
                            {listing.activated ? "Rented" : "List Again"}
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
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton _expanded={{ bg: "#004c4c", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
          <h2 className="font-semibold text-md mb-3">Looking for a place</h2>
           
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
               <Link href="/list/person">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-5 mt-3">
                  + Create listing
                </button>
              </Link>
            {listings && listings.persons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPersons.map((listing) => (
                    <div
                      key={listing._id}
                      className="bg-teal-900 rounded mb-4 md:flex items-center justify-between"
                    >
                      <div className="flex flex-col items-center justify-between w-full">
                        <div className="overflow-hidden w-full">
                          <RectangleCarousel photos={listing.photos} />
                        </div>
                       <div className="flex items-center my-4 px-5 w-full">
                          <div className="w-full">
                            <div className="flex items-center justify-between w-full">
                                 <h3 className="text-lg font-semibold">
                              {listing.accommodationType}
                            </h3>
                                <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              colorScheme="teal"
                              size="sm"
                              className="absolute top-0 right-0 m-2"
                            />
                            <MenuList style={{ minWidth: '5rem' }}>
                              <MenuItem color="orange.300"><Link className="w-full cursor-pointer" href={`/edit/${listing.type}/${listing._id}`}>Edit</Link></MenuItem>
                                  <MenuDivider />

                              <MenuItem
                              color="red.500"
                                onClick={() =>
                                  deleteListing(listing._id, 'property')
                                }
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                            </div>
                         
                            <p className="text-gray-400">
                              {listing.governorate}, {listing.city}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row md:flex-row justify-center mt-4 md:mt-0 w-full md:w-auto">
                          <button className="bg-white text-teal-600 px-4 py-2 m-3 rounded shadow hover:bg-teal-400 hover:text-white transition-all">
                            <Link href={`/details/property/${listing._id}`}>
                              View
                            </Link>
                          </button>
                           <button
                            onClick={() => markAsRented(listing._id, "person")}
                            className="bg-white text-green-600 px-4 py-2 m-3 rounded shadow hover:bg-green-600 hover:text-white transition-all"
                          >
                            {listing.activated ? "Found Place" : "List Again"}
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UserListings;
