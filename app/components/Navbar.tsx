"use client";
import React, { useState } from "react";
import LoginButton from "./buttons/LoginButton";
import HamburgerMenu from "./buttons/HamburgerMenu";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import SearchBar from "./navbar/SearchBar";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice"; // Adjust the import path as needed
import SwiperMenu from "./shared/menu/SwiperMenu";
import HamburgerMenuOverlay from "./overlays/hamburger/HamburgerMenuOverlay";



const Navbar = () => {
     const [isMenuOverlayVisible, setIsMenuOverlayVisible] = useState(false);
     const [isUserOverlayVisible, setIsUserOverlayVisible] = useState(false);

     const toggleMenuOverlay = () => {
       setIsMenuOverlayVisible(!isMenuOverlayVisible);
     };
     const toggleUserOverlay = () => {
       setIsUserOverlayVisible(!isUserOverlayVisible);
     };


  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-300 py-5">
      <div className=" flex justify-between items-center w-full ">
        <div className="lg:ml-10">
          <Logo />
        </div>
        <SearchBar />

        <div className="lg:ml-20">
          <NavLinks />
        </div>
        <div className="lg:ml-20 ">
          <LoginButton
            onClick={toggleUserOverlay}
            isOverlayVisible={isUserOverlayVisible}
          />
        </div>

        <HamburgerMenu
          onClick={toggleMenuOverlay}
          isOverlayVisible={isMenuOverlayVisible}
        />
      </div>
      {isMenuOverlayVisible && <HamburgerMenuOverlay />}
      {/* {isUserOverlayVisible && (
          <UserAccountOverlay onClose={toggleUserOverlay} />
      )} */}
    </nav>
  );
};

export default Navbar