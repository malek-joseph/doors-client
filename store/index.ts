/** @format */

// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

// Define your rootReducer and include the userReducer
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

const store = configureStore({
  reducer: rootReducer, // Pass your rootReducer here
  // Add other configuration options if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
