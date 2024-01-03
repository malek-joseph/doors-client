/** @format */
"use client";

import backgroundImage from "../../../public/assets/images/medical.jpeg"; // Replace with the path to your photo
import logoImage from "../../../public/assets/images/logo.png"; // Replace with the path to your logo
import LoginForm from "@/app/components/regestration/LoginForm";
import Image from "next/image";
import Carousel from "@/app/components/carousels/autoCarousel";

const LoginPage: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // Placeholder logic for handling login (replace with your actual authentication logic)
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between net_height">
      {/* Left Section: Login Form */}
      <div className="relative flex flex-col items-center justify-center p-4 bg-gray-100 w-full lg:w-1/2 h-screen xl:h-auto  ">
        {/* Logo at the top left */}
        <div className="mb-4 absolute top-10 left-10 flex justify-center items-end">
          <Image className="w-8 h-8" src={logoImage} alt="Logo" />
          <p className="text-sm font-bold">MedPro</p>
        </div>
        <div className="">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>

      {/* Right Section: Photo (Hidden on Mobile and Tablet) */}
      <div className="lg:w-1/2 rounded lg:order-1 hidden lg:block">
        {/* <Image
          className="bg-cover bg-center h-full w-full "
          src={backgroundImage}
          alt="Background"
          width={100}
        /> */}
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

export default LoginPage;
