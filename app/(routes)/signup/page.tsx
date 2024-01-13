/** @format */
"use client";

import SignUpForm from "../../components/regestration/SignUpForm";
import backgroundImage from "../../../public/assets/images/medical.jpeg"; // Replace with the path to your photo
import logoImage from "../../../public/assets/images/logo.png"; // Replace with the path to your logo
import Image from "next/image";
import Carousel from "@/app/components/carousels/autoCarousel";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between net_height">
      {/* Left Section: Login Form */}
      <div className="relative flex flex-col items-center justify-center p-4 bg-gray-100 w-full lg:w-1/2 h-screen xl:h-auto  ">
        <div className="">
          <SignUpForm />
        </div>
      </div>

      {/* Right Section: Photo (Hidden on Mobile and Tablet) */}
      <div className="lg:w-1/2 rounded lg:order-1 hidden lg:block">
        <Carousel
          images={[
            "/assets/images/home2.jpeg",
            "/assets/images/home3.jpeg",
            "/assets/images/home1.jpeg",
          ]}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
