
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface PropertyDetails {
  governance: string;
  city: string;
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
}

interface ListingFormState {
  accommodationType: string | null;
  propertyDetails: PropertyDetails;
}
 
const initialState: ListingFormState = {
  accommodationType: "",
  propertyDetails: {
    governance: "",
    city: "",
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
    type: ""
    
  },  
};

const listingFormSlice = createSlice({
  name: "listingForm",
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
    clearListingForm: (state) => {
      state.accommodationType = null;
      state.propertyDetails = initialState.propertyDetails;
    },
  },
});

export const {
  updateAccommodationType,
  updatePropertyDetails,
  resetForm,
  updatePhotos,
  clearListingForm,
} = listingFormSlice.actions;

// Selectors
export const selectAccommodationType = (state: {
  listingForm: ListingFormState;
}) => state.listingForm.accommodationType;
export const selectPropertyDetails = (state: {
  listingForm: ListingFormState;
}) => state.listingForm.propertyDetails;

export default listingFormSlice.reducer;
