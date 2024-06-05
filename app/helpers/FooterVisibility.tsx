"use client"

import { usePathname } from "next/navigation";


import Footer from "../../components/Footer";

function FooterVisibility() {
  const path = usePathname();
  const showFooter =
    !path.startsWith("/messages") && 
    !path.startsWith("/list") && 
    path !== "/signup" && 
    path !== "/login";  
   
  

  return <>{showFooter && <Footer /> }</>;
}

export default FooterVisibility;
