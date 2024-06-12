/** @format */


import UserNavButton from "@/app/components/navbar/sub-components/UserNavButton";
import Logo from "./sub-components/Logo";
import NavLinks from "./sub-components/NavLinks";
import SearchBar from "./sub-components/SearchBar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white  border-b border-gray-300 py-3">
      <div className="hidden md:flex lg:flex justify-between items-center w-full px-5 lg:px-10 md:px-10">
        <div className="w-16 h-16">
          <Logo />
        </div>
        <SearchBar />
        <div className="flex justify-end items-center lg:space-x-10 lg:mr-10">
          <NavLinks />
          <UserNavButton />
        </div>
      </div>
      {/* Smaller Screens */}
      <div className="flex flex-col md:hidden lg:hidden ">
        <div className="flex justify-between items-center w-full px-5 ">
          <div className="w-16 h-16">
            <Logo />
          </div>
          <div className="flex justify-end items-center">
            <UserNavButton />
          </div>
        </div>
        <div className="flexCenter mt-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
