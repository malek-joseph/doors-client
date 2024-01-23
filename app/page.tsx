"use client";

import { useSelector } from "react-redux";
import { selectAccommodationType } from "./redux/features/listing/listingFormSlice";



import ListSection from "./components/sections/ListNowSection";
import ListingsSection from "./components/sections/ListingsSection";

export default function Home() {
 

    const selectedType = useSelector(selectAccommodationType);

  console.log(selectedType); // Console log the selected type


  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-5/6 ">
        <ListSection />
        <ListingsSection />
      </div>
    </main>
  );
}
