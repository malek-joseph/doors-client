/** @format */

"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({ 
  reducer: {
    auth: authReducer,
    // Add other reducers as needed
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


