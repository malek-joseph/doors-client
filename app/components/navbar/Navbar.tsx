/** @format */

"use client";
import UserNavButton from "@/app/components/navbar/sub-components/UserNavButton";
import Logo from "./sub-components/Logo";
import NavLinks from "./sub-components/NavLinks";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white  border-b border-gray-300 py-3">
      <div className="flex justify-between items-center w-full px-10">
        <div className="flex justify-start">
          <Logo />
        </div>
        <div className="flex justify-end items-center space-x-10">
          <div className="hidden lg:flex md:flex">
            <NavLinks />
          </div>
          <div className="relative hidden lg:flex md:flex">
            <UserNavButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
