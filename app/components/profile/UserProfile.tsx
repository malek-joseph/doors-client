/** @format */
"use client"

import Image from "next/image";
import React, { useState } from "react";

const UserProfile = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="bg-blue-500 text-white  w-full h-full ">
      <div className="">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <div className="w-20 h-20 bg-white rounded-full">
            {image ? (
              <Image
                src={image}
                alt="User's Profile"
                className="w-full h-full rounded-full"
                fill
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <span>Upload Image</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center p-4">
        <h2>User Name</h2>
      </div>
    </section>
  );
};

export default UserProfile;
