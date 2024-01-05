"use client";

import LoginButton from "./buttons/LoginButton";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import SearchBar from "./navbar/SearchBar";

import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-300 py-5">
      <div className="max-container padding-container flex justify-between items-center">
        <Logo />
        <SearchBar />
        <NavLinks />
        <LoginButton />
             <Image
        src="/assets/images/menu.svg"
        alt="menu"
        width={25}
        height={25}
        className="inline-block cursor-pointer lg:hidden"
      />
        
      </div>
    </nav>
  );
};

export default Navbar