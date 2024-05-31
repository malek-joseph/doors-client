/** @format */
"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import defaultProfilePic from "../../../public/assets/images/profile.png"; // Path to your default profile image
import { useSelector } from "react-redux";
import { selectUserDetails, setUser } from "@/app/redux/features/auth/authSlice";
import axios from "axios"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';


const UserProfile = () => {
  const userDetails = useSelector(selectUserDetails);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Load the user's photo when userDetails changes
useEffect(() => {
  if (userDetails && userDetails.photo) {
    // Remove the "uploads" word from userDetails.photo
    const photoPathWithoutUploads = userDetails.photo.replace(/^uploads\//, "");
    // Set the image source with the modified path
    setImageSrc(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`
    );
  }
}, [userDetails]);
// console.log(imageSrc)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      // Check if userDetails is defined before accessing its id property
      if (userDetails) {
        const userId = userDetails.id;
        formData.append("userId", userId);

        try {
          // Send a POST request to your backend API endpoint
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-profile-picture`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        const updatedUser = { ...userDetails, photo: response.data.photo };

        dispatch(setUser(updatedUser));
        // Show success toast
        toast.success("Profile picture updated successfully");
        } catch (error) {
          // Handle error
        toast.error("Error updating profile picture");
        console.error("Error updating profile picture", error);
        }
      }
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
      <h2 className="text-lg mt-4">Hello {userDetails?.name}. You can view your listings here, best of luck!</h2>{" "}
      {/* Adjust margin as needed */}
    </div>
  );
};

export default UserProfile;
