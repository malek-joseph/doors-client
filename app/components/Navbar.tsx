"use client";

import LoginButton from "./buttons/LoginButton";
import HamburgerMenu from "./buttons/HamburgerMenu";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import SearchBar from "./navbar/SearchBar";
import { useSelector } from "react-redux";
import { selectUser } from '../redux/features/auth/authSlice'; // Adjust the import path as needed



const Navbar = () => {
   



  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-300 py-5">
      <div className="max-container flex justify-between items-center">
        <Logo />
        <SearchBar />
        <NavLinks />
        <LoginButton />
        <HamburgerMenu/>
         
        
      </div>
    </nav>
  );
};

export default Navbar