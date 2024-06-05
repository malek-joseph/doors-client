/** @format */

import UserAccount from "@/components/profile/UserAccount";
import UserListings from "@/components/profile/UserListings";
import UserProfile from "@/components/profile/UserProfile";
import React from "react";

const profile = () => {
  return (
  <main className="flex flex-col items-center justify-center h-full">
      <div className="w-5/6 ">
        <UserProfile />
        <UserListings />
        {/* <UserAccount/>  */}

   </div>
    </main>
  );
};

export default profile;
