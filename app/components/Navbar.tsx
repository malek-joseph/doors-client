"use client";

import LoginButton from "./buttons/LoginButton";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import SearchBar from "./navbar/SearchBar";

const Navbar = () => {
  return (
    <nav className=" flex flex-col lg:flex-row justify-between items-center max-container padding-container relative z-30 py-5  border-b border-gray-300">
      <Logo />
      <SearchBar />
      <NavLinks />
      <LoginButton />
    </nav>
  );
};

export default Navbar