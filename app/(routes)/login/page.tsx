/** @format */
"use client";

import backgroundImage from "../../../public/assets/images/medical.jpeg"; // Replace with the path to your photo
import logoImage from "../../../public/assets/images/logo.png"; // Replace with the path to your logo
import LoginForm from "@/components/regestration/LoginForm";
import Image from "next/image";
import Carousel from "@/components/carousels/autoCarousel";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between h-screen w-full">
      <div className="relative flex flex-col items-center justify-center p-4 bg-gray-10 lg:w-full   h-screen ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
