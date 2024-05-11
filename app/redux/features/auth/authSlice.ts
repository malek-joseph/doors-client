/** @format */

"use client";

import { createSlice } from "@reduxjs/toolkit";


interface User {
  id: string;
  username: string;
  name: string; 
  age: number; 
  number: number; 
  gender: string; 
  job: string; 
  photo?: string;
}

interface AuthState {
  user: User | null; 
}

const initialState: AuthState = {
  user: null,
  
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
export const selectUserDetails = (state: { auth: AuthState }) => state.auth.user;


export default authSlice.reducer;
