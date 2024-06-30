/** @format */

import UserAccount from "@/app/components/profile/UserAccount";
import UserListings from "@/app/components/profile/UserListings";
import UserProfile from "@/app/components/profile/UserProfile";
import React from "react";


const profile = () => {
  return (
  <main className="flex flex-col items-center justify-center h-full mt-20 md:mt-0 lg:mt-0">
      <div className="md:w-5/6 lg:w-5/6 ">
        <UserProfile />
        <UserAccount/> 
        <UserListings />

   </div>
    </main>
  );
};

export default profile;
