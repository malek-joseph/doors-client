"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to using localStorage
import storage from "../storage"
import authReducer from "./features/auth/authSlice";
import placeFormReducer from "./features/listing/placeFormSlice";
import personFormReducer from "./features/listing/personFormSlice";
import initialMessageReducer from "./features/listing/initialMessageSlice";
import filterReducer from "./features/listing/filterSlice"; 



// Configuration for Redux Persist
const persistConfig = {
  key: "root", // Key to use in local storage
  version: 1, // Current version

  storage, // Storage method (local storage)
  whitelist: ["auth", "placeForm", "personForm", "filter"], // Reducers you want to persist (by key)
};

// Combine reducers 
const rootReducer = combineReducers({
  auth: authReducer,
  placeForm: placeFormReducer,
  personForm: personFormReducer,
  initialMessage: initialMessageReducer,
    filter: filterReducer,

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
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "auth/setUser",
        ],
        ignoredPaths: ["auth.user.photo"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production environments
});

// Create a persistor
export const createPersistor = () => persistStore(store);
export const persistor = createPersistor();


// export const persistor = persistStore(store);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
