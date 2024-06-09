/** @format */

"use client";

import React, {useEffect} from "react";
import { store, persistor } from "./store"; // Import persistor here
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import Spinner from "../components/shared/spinner/Spinner";

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
  <PersistGate
        loading={
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner size={50} />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
     
    </Provider>
  );
}
