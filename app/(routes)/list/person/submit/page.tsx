/** @format */
"use client";

import { useState, useEffect } from "react";
import ListingDetailsCarousel from "@/app/components/carousels/ListingDetailsCarousel";
import PersonDetailsSectionOne from "@/app/components/listingDetails/person/PersonDetailsSectionOne";
import SendMessageCard from "@/app/components/cards/message/SendMessageCard";
import PersonDetailsSectionTwo from "@/app/components/listingDetails/person/PersonDetailsSectionTwo";
import PersonDetailsSectionThree from "@/app/components/listingDetails/person/PersonDetailsSectionThree";
import PersonDetailsSectionFour from "@/app/components/listingDetails/person/PersonDetailsSectionFour";
import PersonDetailsSectionFive from "@/app/components/listingDetails/person/PersonDetailsSectionFive";
import PublishEditBtns from "@/app/components/buttons/PublishEditBtns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectPersonDetails,
  selectAccommodationType,
  clearPersonForm,
} from "@/app/redux/features/listing/personFormSlice";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import publishPerson from "./publishPerson";
import { useDispatch } from "react-redux";
import localforage from "localforage";

const PersonDetailsReview = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const personDetails = useSelector(selectPersonDetails);
  const accommodationType = useSelector(selectAccommodationType);
  const userDetails = useSelector(selectUserDetails);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    localforage
      .getItem<File[]>("personImages")
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

      const photo = userDetails.photo;
      setImageSrc(photo);
    }
  }, [userDetails]);

  if (!personDetails || !userDetails) {
    return <div >loading</div>;
  }

  const onEditClick = () => {
    router.push("/list/person/property");
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
    const updatedPersonDetails = { ...personDetails, type: "person" };

    const updatedImages = arrayToFileList(imageFiles);

    publishPerson(
      updatedImages,
      userDetails,
      updatedPersonDetails,
      accommodationType,
      setLoading
    );
    localforage
      .removeItem("personImages")
      .then(() => {
    
      })
      .catch((error) => {
       
        console.error("Error removing item:", error);
      });
    dispatch(clearPersonForm());
    router.push("/");
  };

  if (!imageSrc) return null;

  // console.log(imageSrc);
  return (
    <main className="flex flex-col items-center justify-center mb-32 mt-20 lg:mt-0 md:mt-0">
      <div className="w-5/6 ">
        <div className="my-8">
          {imageURLs?.length > 0 && (
            <ListingDetailsCarousel images={imageURLs} />
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-8/12">
            <PersonDetailsSectionOne
              gender={userDetails.gender}
              city={personDetails.locationDetails.city}
              governorate={personDetails.locationDetails.governorate}
              roomType={personDetails.roomType}
              roommatePreference={personDetails.roommatePreference}
              furnishing={personDetails.furnishing}
              bathroomType={personDetails.roomBathroom}
              accommodationType={accommodationType}
            />
            <hr className="my-3" />
            <PersonDetailsSectionTwo
              monthlyRent={personDetails.monthlyRent}
              deposit={personDetails.deposit}
              billsIncluded={personDetails.billsIncluded}
              monthlyBills={personDetails.monthlyBills}
              internet={personDetails.internet}
              totalRoommates={personDetails.totalRoommates}
            />
            <hr className="my-3" />
            <PersonDetailsSectionThree
              roommatePreferences={personDetails.roommatePreferences}
            />
            <hr className="my-3" />
            <PersonDetailsSectionFour
              personFeatures={personDetails.selectedFeatures}
            />
            <hr className="my-3" />
            <PersonDetailsSectionFive
              description={personDetails.description}
              personDescription={personDetails.personDescription}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            {imageSrc && (
              <SendMessageCard
                name={userDetails.name}
                photo={imageSrc}
                listingType={personDetails.type}
                ownerId={userDetails.id}
              />
            )}
          </div>
          <PublishEditBtns
            onEditClick={onEditClick}
            onPublishClick={onPublishClick}
            loading={loading}
          />
        </div>
      </div>
    </main>
  );
};

export default PersonDetailsReview;
