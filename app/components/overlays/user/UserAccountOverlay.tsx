import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image"; // Import the Image component
import profile from "@/public/assets/images/profile.png";
import logout from "@/public/assets/images/logout.png";

interface UserAccountOverlayProps {
  toggleUserOverlay: () => void;
  onLogout: () => void;
}

const UserAccountOverlay: React.FC<UserAccountOverlayProps> = ({
  toggleUserOverlay,
  onLogout,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to detect click outside of the overlay
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        event.target instanceof Node &&
        !overlayRef.current.contains(event.target)
      ) {
        toggleUserOverlay(); // Close the overlay if click is outside
      }
    }

    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on cleanup
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleUserOverlay]);

  // Function to handle clicking on the profile link
  const handleProfileClick = () => {
    toggleUserOverlay(); // Close the overlay when clicking on profile link
  };

  // Function to handle clicking on the logout button
  const handleLogoutClick = () => {
    onLogout();
    toggleUserOverlay(); // Close the overlay after logout
  };

  return (
    <div ref={overlayRef} className="absolute z-10 top-full right-0">
      <div className="bg-white shadow-md rounded-lg p-3 px-2">
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center">
            <Link
              href="/profile"
              className="ml-2 p-2 hover:bg-gray-100 rounded"
              onClick={handleProfileClick}>
              Profile
            </Link>
          </li>
          <li className="flex items-center">
            <button
              className="ml-2 w-full text-left p-2 hover:bg-gray-100 rounded"
              onClick={handleLogoutClick}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAccountOverlay;
