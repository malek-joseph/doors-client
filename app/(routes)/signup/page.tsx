/** @format */
"use client";

import SignUpForm from "../../../components/regestration/SignUpForm";
import backgroundImage from "../../../public/assets/images/medical.jpeg"; // Replace with the path to your photo
import logoImage from "../../../public/assets/images/logo.png"; // Replace with the path to your logo
import Image from "next/image";
import Carousel from "@/components/carousels/autoCarousel";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between h-screen  w-full">
      <div className="relative flex flex-col items-center justify-center p-4 bg-gray-10 lg:w-full ">
          <SignUpForm />

      </div>
    </div>
  );
};

export default SignUpPage;
