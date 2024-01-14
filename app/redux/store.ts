/** @format */
"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to using localStorage
import storage from "../storage"
import authReducer from "./features/auth/authSlice";

// Configuration for Redux Persist
const persistConfig = {
  key: "root", // Key to use in local storage
  storage, // Storage method (local storage)
  whitelist: ["auth"], // Reducers you want to persist (by key)
};

// Combine reducers (if you have more than one)
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

// Enhance the root reducer with Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor
export const createPersistor = () => persistStore(store);
export const persistor = createPersistor();


// export const persistor = persistStore(store);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
