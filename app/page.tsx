"use client";


import ListSection from "./components/sections/ListNowSection";
import ListingsSection from "./components/sections/ListingsSection";

export default function Home() {
 
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-5/6 ">
        <ListSection />
        <ListingsSection />
      </div>
    </main>
  );
}
