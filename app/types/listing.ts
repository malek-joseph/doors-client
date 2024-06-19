/** @format */
import type { StaticImageData } from "next/image";


export type ListingType = {
  governorate: string;
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
  availableFromDate?: Date;
  _id: string;
};

 export type Accepting = {
    name: string;
    src: StaticImageData;
  };
