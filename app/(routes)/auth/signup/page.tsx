/** @format */
"use client";

import SignUpForm from "../../../components/regestration/SignUpForm";


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
