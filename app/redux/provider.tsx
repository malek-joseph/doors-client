/** @format */

"use client";

import React from "react";
import { store, persistor } from "./store"; 
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 

import NextAuthProvider from "../providers/NextAuthProvider";
import NextTopLoader from 'nextjs-toploader';


export function Providers({ children }: { children: React.ReactNode }) {

  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextAuthProvider>
          <NextTopLoader
            color="#042f2e"
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />

          {children}
         
        </NextAuthProvider>
      </PersistGate>
    </Provider>
  );
}
