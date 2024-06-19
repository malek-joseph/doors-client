/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";

export interface FilterState {
  query: string;
  filter: "rooms" | "roommates" | null;
  monthlyRent: { min: string | null; max: string | null };
  billsIncluded: boolean;
  availability: string | null;
  accommodationType: string[];
  roomType: "any" | "private" | "shared";
  gender: "anyone" | "women" | "men";
  furnishings: "any" | "furnished" | "unfurnished";
  bathroomType: "any" | "private" | "shared";
  allowed: string[];
}

const initialState: FilterState = {
  query: "",
  filter: null,
  monthlyRent: { min: null, max: null },
  billsIncluded: false,
  availability: null,
  accommodationType: [],
  roomType: "any",
  gender: "anyone",
  furnishings: "any",
  bathroomType: "any",
  allowed: [],
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
    setMonthlyRent: (state, action: PayloadAction<{ min: string | null; max: string | null }>) => {
      state.monthlyRent = action.payload;
    },
    setBillsIncluded: (state, action: PayloadAction<boolean>) => {
      state.billsIncluded = action.payload;
    },
    setAvailability: (state, action: PayloadAction<string | null>) => {
      state.availability = action.payload;
    },
    setAccommodationType: (state, action: PayloadAction<string>) => {
      const index = state.accommodationType.indexOf(action.payload);
      if (index === -1) {
        state.accommodationType.push(action.payload);
      } else {
        state.accommodationType.splice(index, 1);
      }
    },
    setRoomType: (state, action: PayloadAction<"any" | "private" | "shared">) => {
      state.roomType = action.payload;
    },
    setGender: (state, action: PayloadAction<"anyone" | "women" | "men">) => {
      state.gender = action.payload;
    },
    setFurnishings: (state, action: PayloadAction<"any" | "furnished" | "unfurnished">) => {
      state.furnishings = action.payload;
    },
    setBathroomType: (state, action: PayloadAction<"any" | "private" | "shared">) => {
      state.bathroomType = action.payload;
    },
    setAllowed: (state, action: PayloadAction<string>) => {
      const index = state.allowed.indexOf(action.payload);
      if (index === -1) {
        state.allowed.push(action.payload);
      } else {
        state.allowed.splice(index, 1);
      }
    },
  },
});

export const {
  setQuery,
  setFilter,
  setMonthlyRent,
  setBillsIncluded,
  setAvailability,
  setAccommodationType,
  setRoomType,
  setGender,
  setFurnishings,
  setBathroomType,
  setAllowed,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
