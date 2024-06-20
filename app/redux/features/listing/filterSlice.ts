/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";

export interface FilterState {
  query: string;
  filter: "rooms" | "roommates" | null;
  monthlyRent: { min: string | null; max: string | null };
  billsIncluded: boolean;
  accommodationType: string[];
  roomType: "any" | "Private" | "Shared";
  gender: "anyone" | "Women only" | "Men only";
  furnishing: "any" | "Furnished" | "Unfurnished";
  bathroomType: "any" | "Private" | "Shared";
  allowed: string[];
    activeFiltersCount: number;

}

const initialState: FilterState = {
  query: "",
  filter: null,
  monthlyRent: { min: null, max: null },
  billsIncluded: false,
  accommodationType: [],
  roomType: "any",
  gender: "anyone",
  furnishing: "any",
  bathroomType: "any",
  allowed: [],
    activeFiltersCount: 0,

};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilter: (state, action: PayloadAction<"rooms" | "roommates" | null>) => {
      state.filter = action.payload;
    },
    setMonthlyRent: (
      state,
      action: PayloadAction<{ min: string | null; max: string | null }>
    ) => {
      state.monthlyRent = action.payload;
    },
    setBillsIncluded: (state, action: PayloadAction<boolean>) => {
      state.billsIncluded = action.payload;
    },

    setAccommodationType: (state, action: PayloadAction<string>) => {
      if (!state.accommodationType) {
        state.accommodationType = [];
      }
      const index = state.accommodationType.indexOf(action.payload);
      if (index === -1) {
        state.accommodationType.push(action.payload);
      } else {
        state.accommodationType.splice(index, 1);
      }
    },
    setRoomType: (
      state,
      action: PayloadAction<"any" | "Private" | "Shared">
    ) => {
      state.roomType = action.payload;
    },
    setGender: (
      state,
      action: PayloadAction<"anyone" | "Women only" | "Men only">
    ) => {
      state.gender = action.payload;
    },
    setFurnishing: (
      state,
      action: PayloadAction<"any" | "Furnished" | "Unfurnished">
    ) => {
      state.furnishing = action.payload;
    },
    setBathroomType: (
      state,
      action: PayloadAction<"any" | "Private" | "Shared">
    ) => {
      state.bathroomType = action.payload;
    },
    setAllowed: (state, action: PayloadAction<string>) => {
      if (!state.allowed) {
        state.allowed = [];
      }
      const index = state.allowed.indexOf(action.payload);
      if (index === -1) {
        state.allowed.push(action.payload);
      } else {
        state.allowed.splice(index, 1);
      }
    },
       setActiveFiltersCount: (state, action: PayloadAction<number>) => {
      state.activeFiltersCount = action.payload;
    },
  },
});

export const {
  setQuery,
  setFilter,
  setMonthlyRent,
  setBillsIncluded,
  setAccommodationType,
  setRoomType,
  setGender,
  setFurnishing,
  setBathroomType,
  setAllowed,
  setActiveFiltersCount
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
