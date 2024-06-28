/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationDetails {
  governorate: string;
  city: string;
  formattedAddress: string;
  placeId: string;
  street?: string;

  
}

interface PersonDetails {
  moveInDate: string;
  totalBedrooms: number | string;
  totalBathrooms: number | string;
  internet: string;
  totalRoommates: number | string;
  roomType: string;
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
  personDescription: string;
  type: string;
  locationDetails: LocationDetails;
    address: string;
}

interface PersonFormState {
  accommodationType: string | null;
  personDetails: PersonDetails;
}

const initialLocationDetails: LocationDetails = {
  governorate: "",
  city: "",
  formattedAddress: "",
  placeId: "",
  street: ""
};

const initialState: PersonFormState = {
  accommodationType: "",
  personDetails: {
    moveInDate: "",
    totalBedrooms: 1,
    totalBathrooms: 1,
    internet: "",
    totalRoommates: 1,
    roomType: "",
    furnishing: "",
    roomBathroom: "",
    selectedFeatures: [],
    monthlyRent: 0,
    deposit: 0,
    billsIncluded: true,
    monthlyBills: 0,
    photos: [],
    roommatePreference: "",
    roommatePreferences: [],
    description: "",
    personDescription: "",
    type: "",
    locationDetails: initialLocationDetails,
    address: "", 
  },
};

const personFormSlice = createSlice({
  name: "personForm",
  initialState,
  reducers: {
    updateAccommodationType: (state, action: PayloadAction<string | null>) => {
      state.accommodationType = action.payload;
    },
    updatePersonDetails: (
      state,
      action: PayloadAction<Partial<PersonDetails>>
    ) => {
      state.personDetails = { ...state.personDetails, ...action.payload };
    },
    updateLocationDetails: (
      state,
      action: PayloadAction<Partial<LocationDetails>>
    ) => {
      state.personDetails.locationDetails = {
        ...state.personDetails.locationDetails,
        ...action.payload,
      };
    },
    resetForm: () => initialState,
    updatePhotos: (state, action: PayloadAction<string[]>) => {
      state.personDetails.photos = action.payload;
    },
    clearPersonForm: (state) => {
      state.accommodationType = null;
      state.personDetails = initialState.personDetails;
    },
       updatePersonAddress: (state, action: PayloadAction<string>) => {
      state.personDetails.address = action.payload;
    },
  },
});

export const {
  updateAccommodationType,
  updatePersonDetails,
  resetForm,
  updatePhotos,
  clearPersonForm,
  updatePersonAddress
} = personFormSlice.actions;

// Selectors
export const selectAccommodationType = (state: {
  personForm: PersonFormState;
}) => state.personForm.accommodationType;
export const selectPersonDetails = (state: { personForm: PersonFormState }) =>
  state.personForm.personDetails;

export default personFormSlice.reducer;
