"use client"

import { usePathname } from "next/navigation";


import Footer from "../components/Footer";

function FooterVisibility() {
  const path = usePathname();
  const showFooter =
   path !== "/list/place"
    && 
    path !== "/list/place/about"
       && 
    path !== "/list/place/roommates"
       && 
    path !== "/list/place/room"
       && 
    path !== "/list/place/features"
       && 
    path !== "/list/place/rent"
       && 
    path !== "/list/place/photos"

  return <>{showFooter && <Footer /> }</>;
}

export default FooterVisibility;
