"use client";
import React, { useState } from "react";
import LoginButton from "./buttons/LoginButton";
import HamburgerMenu from "./buttons/HamburgerMenu";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import SearchBar from "./navbar/SearchBar";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/features/auth/authSlice"; // Adjust the import path as needed
import SwiperMenu from "./shared/menu/SwiperMenu";
import HamburgerMenuOverlay from "./overlays/hamburger/HamburgerMenuOverlay";
import UserAccountOverlay from "./overlays/user/UserAccountOverlay";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice'; // Adjust the import path as needed
import { useRouter } from "next/navigation";






const Navbar = () => {
  const dispatch = useDispatch(); // Use useDispatch hook to dispatch actions
    const router = useRouter(); // Create the router instance

  const user = useSelector(selectUserDetails);

     const [isMenuOverlayVisible, setIsMenuOverlayVisible] = useState(false);
     const [isUserOverlayVisible, setIsUserOverlayVisible] = useState(false);

     const toggleMenuOverlay = () => {
       setIsMenuOverlayVisible(!isMenuOverlayVisible);
     };
     const toggleUserOverlay = () => {
       setIsUserOverlayVisible(!isUserOverlayVisible);
     };

  const handleLogout = () => {
    dispatch(logout());


    setIsUserOverlayVisible(false);
    router.push('/'); 
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
        <div className="relative lg:flexCenter lg:ml-20 hidden">
         
          <LoginButton
            onClick={toggleUserOverlay}
            isOverlayVisible={isUserOverlayVisible}
          />
            {isUserOverlayVisible && user && (
        <UserAccountOverlay
          onClose={toggleUserOverlay}
          onLogout={handleLogout}
        />
      )}
        </div>

        <HamburgerMenu
          onClick={toggleMenuOverlay}
          isOverlayVisible={isMenuOverlayVisible}
        />
      </div>
      {isMenuOverlayVisible && <HamburgerMenuOverlay />}
    
    </nav>
  );
};

export default Navbar