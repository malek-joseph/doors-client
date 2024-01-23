
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

}

interface ListingFormState {
  accommodationType: string | null;
  propertyDetails: PropertyDetails;
}

const initialState: ListingFormState = {
  accommodationType: null,
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
  },
});

export const { updateAccommodationType, updatePropertyDetails, resetForm } =
  listingFormSlice.actions;

// Selectors
export const selectAccommodationType = (state: {
  listingForm: ListingFormState;
}) => state.listingForm.accommodationType;
export const selectPropertyDetails = (state: {
  listingForm: ListingFormState;
}) => state.listingForm.propertyDetails;

export default listingFormSlice.reducer;
