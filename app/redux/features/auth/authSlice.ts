/** @format */

"use client";

import { createSlice } from "@reduxjs/toolkit";


interface User {
  id: string;
  username: string;
  // Other user properties...
}

interface AuthState {
  user: User | null; // Define your user type
  // Add other auth-related state variables here
}

const initialState: AuthState = {
  user: null,
  // Initialize other state variables
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null; 
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
