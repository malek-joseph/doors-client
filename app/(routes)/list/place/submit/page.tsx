/** @format */
"use client"

import {useState, useEffect} from 'react'
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PlaceDetailsSectionOne from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import PlaceDetailsSectionTwo from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionTwo";
import PlaceDetailsSectionThree from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionThree";
import PlaceDetailsSectionFour from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionFour";
import PlaceDetailsSectionFive from "@/app/components/sections/listingDetails/place/PlaceDetailsSectionFive";
import PublishEditBtns from "@/app/components/shared/buttons/PublishEditBtns";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/spinner/Spinner";
import { useSelector } from "react-redux";
import {
  selectPropertyDetails,
  selectAccommodationType,
  clearPlaceForm,
} from "@/app/redux/features/listing/placeFormSlice";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import publishProperty from "./publishProperty";
import { useDispatch } from "react-redux";
import localforage from "localforage";

const PropertyDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const propertyDetails = useSelector(selectPropertyDetails);
  const accommodationType = useSelector(selectAccommodationType);
  const userDetails = useSelector(selectUserDetails);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    localforage
      .getItem<File[]>("propertyImages")
      .then((storedImages) => {
        if (storedImages) {
          setImageFiles(storedImages);
          const updatedImageURLs = storedImages.map((file) =>
            URL.createObjectURL(file)
          );
          setImageURLs(updatedImageURLs);
        }
      })
      .catch((error) => {
        console.error("Error getting item:", error);
      });
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.photo) {
      // console.log(userDetails)
      const photoPathWithoutUploads = userDetails.photo.replace(
        /^uploads\//,
        ""
      );
      setImageSrc(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`
      );
    }
  }, [userDetails]);

  if (!propertyDetails || !userDetails) {
    return <Spinner />;
  }

  const onEditClick = () => {
    router.push("/list/place/property");
  };

  const arrayToFileList = (files: (File | Blob)[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      // If file is a Blob, convert it to a File
      if ((file as Blob) instanceof Blob) {
        const blob = file as Blob;
        const convertedFile = new File([blob], "compressed-image.jpg", {
          type: blob.type,
        });
        dataTransfer.items.add(convertedFile);
      } else if (file instanceof File) {
        dataTransfer.items.add(file);
      }
    });
    return dataTransfer.files;
  };

  const onPublishClick = async () => {
    const updatedPropertyDetails = { ...propertyDetails, type: "place" };

    const updatedImages = arrayToFileList(imageFiles);

    publishProperty(
      updatedImages,
      userDetails,
      updatedPropertyDetails,
      accommodationType
    );
    localforage
      .removeItem("propertyImages")
      .then(() => {
        // Item removed successfully
      })
      .catch((error) => {
        // Handle error
        console.error("Error removing item:", error);
      });
    dispatch(clearPlaceForm());
    router.push("/");
  };

  // console.log(imageURLs);
  return (
    <main className="flex flex-col items-center justify-center mb-32">
      <div className="w-5/6 ">
        <div className="my-8">
          {imageURLs?.length > 0 && (
            <ListingDetailsCarousel images={imageURLs} />
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-8/12">
            <PlaceDetailsSectionOne
              gender={userDetails.gender}
              city={propertyDetails.city}
              governance={propertyDetails.governance}
              roomType={propertyDetails.roomType}
              roommatePreference={propertyDetails.roommatePreference}
              furnishing={propertyDetails.furnishing}
              bathroomType={propertyDetails.roomBathroom}
              accommodationType={accommodationType}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionTwo
              monthlyRent={propertyDetails.monthlyRent}
              deposit={propertyDetails.deposit}
              billsIncluded={propertyDetails.billsIncluded}
              monthlyBills={propertyDetails.monthlyBills}
              internet={propertyDetails.internet}
              totalRoommates={propertyDetails.totalRoommates}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionThree
              roommatePreferences={propertyDetails.roommatePreferences}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionFour
              placeFeatures={propertyDetails.selectedFeatures}
            />
            <hr className="my-3" />
            <PlaceDetailsSectionFive
              description={propertyDetails.description}
              propertyDescription={propertyDetails.propertyDescription}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            {imageSrc && (
              <SendMessageCard name={userDetails.name} photo={imageSrc} />
            )}
          </div>
          <PublishEditBtns
            onEditClick={onEditClick}
            onPublishClick={onPublishClick}
          />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsReview;
