/** @format */

"use client";

import React from "react";
import { store, persistor } from "./store"; // Import persistor here
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate

import NextAuthProvider from "../providers/NextAuthProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}>
        <NextAuthProvider>
          {children}
          <ProgressBar
            height="4px"
            color="teal"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </NextAuthProvider>
      </PersistGate>
    </Provider>
  );
}
