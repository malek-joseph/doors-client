
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationDetails {
  governorate: string;
  city: string;
  formattedAddress: string;
  placeId: string;
  street?: string;

}

interface PropertyDetails {
  locationDetails: LocationDetails;
  availableFromDate: string;
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
  propertyDescription: string;
  type: string;
    address: string;
}

interface PlaceFormState {
  accommodationType: string | null;
  propertyDetails: PropertyDetails;
}
const initialLocationDetails: LocationDetails = {
  governorate: "",
  city: "",
  formattedAddress: "",
  placeId: "",
  street: ""
};
 
const initialState: PlaceFormState = {
  accommodationType: "",
  propertyDetails: {
    locationDetails: initialLocationDetails,
    availableFromDate: "",
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
    propertyDescription: "",
    type: "",
    address: "", 
  },
};

const placeFormSlice = createSlice({
  name: "placeForm",
  initialState,
  reducers: {
    updateAccommodationType: (state, action: PayloadAction<string | null>) => {
      state.accommodationType = action.payload;
    },
    updatePropertyDetails: (
      state,
      action: PayloadAction<Partial<PropertyDetails>>
    ) => {
      state.propertyDetails = { ...state.propertyDetails, ...action.payload };
    },
    resetForm: () => initialState,
    updatePhotos: (state, action: PayloadAction<string[]>) => {
      state.propertyDetails.photos = action.payload;
    },
    clearPlaceForm: (state) => {
      state.accommodationType = null;
      state.propertyDetails = initialState.propertyDetails;
    },
    updatePropertyAddress: (state, action: PayloadAction<string>) => {
      state.propertyDetails.address = action.payload;
    },
  },
});

export const {
  updateAccommodationType,
  updatePropertyDetails,
  resetForm,
  updatePhotos,
  clearPlaceForm,
  updatePropertyAddress
} = placeFormSlice.actions;

// Selectors
export const selectAccommodationType = (state: {
  placeForm: PlaceFormState;
}) => state.placeForm.accommodationType;
export const selectPropertyDetails = (state: {
  placeForm: PlaceFormState;
}) => state.placeForm.propertyDetails;

export default placeFormSlice.reducer;
