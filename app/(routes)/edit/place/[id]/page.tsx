// /** @format */
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";
// import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
// import PlaceDetailsSectionOne from "@/app/components/listingDetails/place/PlaceDetailsSectionOne";
// import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
// import PlaceDetailsSectionTwo from "@/app/components/listingDetails/place/PlaceDetailsSectionTwo";
// import PlaceDetailsSectionThree from "@/app/components/listingDetails/place/PlaceDetailsSectionThree";
// import PlaceDetailsSectionFour from "@/app/components/listingDetails/place/PlaceDetailsSectionFour";
// import PlaceDetailsSectionFive from "@/app/components/listingDetails/place/PlaceDetailsSectionFive";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import PhotoUpload from "@/app/components/upload/PhotoUpload";
// import ListingUploadCarousel from "@/app/components/carousels/ListingUploadCarousel";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import localforage from "localforage";
// import { updateProperty } from "@/app/services/placeService";
// import {
//   fileListToArray,
//   arrayToFileList,
//   validateImageFiles,
//   compressImages,
// } from "@/app/utils/helperFunctions";
// import PhotosUploadModal from "@/app/components/modals/PhotoUploadModal"

// const EditPlaceListing = ({ params }: { params: { id: number } }) => {
//   const { id } = params;
//   const router = useRouter();
//   const [propertyDetails, setPropertyDetails] = useState<any>(null);
//   const userDetails = useSelector(selectUserDetails);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imageURLs, setImageURLs] = useState<string[]>([]);
//   const dispatch = useDispatch();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   useEffect(() => {
//     if (propertyDetails && propertyDetails.userPhoto) {
//       const photo = propertyDetails.userPhoto;
//       setImageSrc(photo);
//     }
//   }, [propertyDetails]);

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/propertyDetails/${id}`
//         );

//         setPropertyDetails(response.data);
//         setImageURLs(response.data.photos);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching property details");
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchPropertyDetails();
//     }
//   }, [id]);

//   const handlePhotoUpload = async (selectedFiles: FileList | null) => {
//     setLoading(true);
//     if (!selectedFiles) return;

//     const validFiles = validateImageFiles(selectedFiles);
//     if (validFiles.length === 0) {
//       toast.error("Please upload valid image files (JPEG, PNG, GIF, or BMP)");
//       return;
//     }

//     const validFilesFilelist = arrayToFileList(validFiles);
//     const compressedFiles = await compressImages(validFilesFilelist);
//     // Update image files state with new files
//     const updatedFiles = [...imageFiles, ...compressedFiles];
//     setImageFiles(updatedFiles);

//     const updatedImages = arrayToFileList(updatedFiles);

//     const updatedPropertyDetails = { ...propertyDetails, type: "place" };

//     updateProperty(
//       updatedImages,
//       updatedPropertyDetails,
//       setLoading,
//       propertyDetails.id
//     );

//     const updatedImageURLs = updatedFiles.map((file) =>
//       URL.createObjectURL(file)
//     );

//     setImageURLs(updatedImageURLs);
//     setLoading(false);
//     // Update local storage with new files
//     localforage
//       .setItem("propertyImages", fileListToArray(updatedImages))
//       .then(() => {
//         // Item stored successfully
//       })
//       .catch((error) => {
//         // Handle error
//         console.error("Error storing item:", error);
//       });
//   };

//   const handleClearPhotosClick = () => {
//     localforage
//       .removeItem("propertyImages")
//       .then(() => {
//         // Item removed successfully
//       })
//       .catch((error) => {
//         console.error("Error removing item:", error);
//       });
//     // Revoke object URLs
//     imageURLs.forEach(URL.revokeObjectURL);

//     // Clear state
//     setImageFiles([]);
//     setImageURLs([]);
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flexCenter">Listing has been rented out</div>
//     );
//   }

//   return (
//     <main className="flex flex-col items-center justify-center mb-24 min-h-screen">
//       <div className="w-5/6 ">
//         {propertyDetails && userDetails && (
//           <>
//             <div className="my-8">
//               <ListingDetailsCarousel images={propertyDetails.photos} />
//               <Button colorScheme="teal" mt={4} onClick={onOpen}>
//                 Edit Photos
//               </Button>
//             </div>
//             <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
//               <div className="w-full lg:w-8/12">
//                 <PlaceDetailsSectionOne
//                   gender={userDetails.gender}
//                   city={propertyDetails.city}
//                   governorate={propertyDetails.governorate}
//                   roomType={propertyDetails.roomType}
//                   roommatePreference={propertyDetails.roommatePreference}
//                   furnishing={propertyDetails.furnishing}
//                   bathroomType={propertyDetails.roomBathroom}
//                   accommodationType={propertyDetails.accommodationType}
//                 />
//                 <hr className="my-3" />
//                 <PlaceDetailsSectionTwo
//                   monthlyRent={propertyDetails.monthlyRent}
//                   deposit={propertyDetails.deposit}
//                   billsIncluded={propertyDetails.billsIncluded}
//                   monthlyBills={propertyDetails.monthlyBills}
//                   internet={propertyDetails.internet}
//                   totalRoommates={propertyDetails.totalRoommates}
//                 />
//                 <hr className="my-3" />
//                 <PlaceDetailsSectionThree
//                   roommatePreferences={propertyDetails.roommatePreferences}
//                 />
//                 <hr className="my-3" />
//                 <PlaceDetailsSectionFour
//                   placeFeatures={propertyDetails.selectedFeatures}
//                 />
//                 <hr className="my-3" />
//                 <PlaceDetailsSectionFive
//                   description={propertyDetails.description}
//                   propertyDescription={propertyDetails.propertyDescription}
//                 />
//               </div>
//               <div className="w-full lg:w-4/12 ">
//                 {imageSrc && (
//                   <SendMessageCard
//                     name={propertyDetails.userName}
//                     photo={imageSrc}
//                     listingId={propertyDetails._id}
//                     listingType={propertyDetails.type}
//                     ownerId={propertyDetails.userId}
//                   />
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       <PhotosUploadModal
//         isOpen={isOpen}
//         onClose={onClose}
//         handlePhotoUpload={handlePhotoUpload}
//         handleClearPhotosClick={handleClearPhotosClick}
//         imageURLs={imageURLs}
//       />
//     </main>
//   );
// };

// export default EditPlaceListing;
