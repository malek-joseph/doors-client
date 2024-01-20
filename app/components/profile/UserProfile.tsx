/** @format */
"use client"

import React, { useState } from "react";
import Image from "next/image";
import defaultProfilePic from "../../../public/assets/images/profile.png"; // Path to your default profile image

const UserProfile = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Adjusted style for the label
  const labelStyle =
    "text-center bg-black bg-opacity-50 text-white text-xs p-1 rounded cursor-pointer";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  rounded-lg my-2 text-gray-600 p-4 mt-5">
      <div className="w-32 h-32 relative mb-2">
        {" "}
        {/* Adjust margin as needed */}
        <Image
          src={imageSrc || defaultProfilePic}
          alt="User's Profile"
          layout="fill"
          className="rounded-full object-cover"
        />
      </div>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <label htmlFor="imageUpload" className={labelStyle}>
        {imageSrc ? "Change Image" : "Upload Image"}
      </label>
      <h2 className="text-lg mt-4">User Name</h2>{" "}
      {/* Adjust margin as needed */}
    </div>
  );
};

export default UserProfile;
