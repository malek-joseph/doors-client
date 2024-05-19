"use client"

import { usePathname } from "next/navigation";


import Footer from "../components/Footer";

function FooterVisibility() {
  const path = usePathname();
  const showFooter =
   path !== "/list/place"
    && 
   path !== "/list/person"
    && 
    path !== "/list/place/about"
       && 
    path !== "/list/person/about"
       && 
    path !== "/list/place/roommates"
       && 
    path !== "/list/person/roommates"
       && 
    path !== "/list/place/room"
       && 
    path !== "/list/person/room"
       && 
    path !== "/list/place/features"
       && 
    path !== "/list/person/features"
       && 
    path !== "/list/place/rent"
       && 
    path !== "/list/person/rent"
       && 
    path !== "/list/place/photos"
       && 
    path !== "/list/person/photos"
       && 
    path !== "/list/place/preference"
       && 
    path !== "/list/person/preference"
       && 
    path !== "/list/place/accepting"
       && 
    path !== "/list/person/accepting"
       && 
    path !== "/list/place/describe"
       && 
    path !== "/list/person/describe"
       && 
    path !== "/list/place/property"
       && 
    path !== "/list/person/property"
       && 
    path !== "/list/place/submit"
       && 
    path !== "/list/person/submit"
       && 
    path !== "/signup"
       && 
    path !== "/login"

  return <>{showFooter && <Footer /> }</>;
}

export default FooterVisibility;
