/** @format */
"use client"

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image"; // Import the Image component
import profile from "@/public/assets/images/profile.png"
import logout from "@/public/assets/images/logout.png"



interface UserAccountOverlayProps {
  onClose: () => void;
  onLogout: () => void;
}

const UserAccountOverlay: React.FC<UserAccountOverlayProps> = ({ onClose, onLogout }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to detect click outside of the overlay
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        event.target instanceof Node &&
        !overlayRef.current.contains(event.target)
      ) {
        onClose(); // Close the overlay if click is outside
      }
    }

    // Add event listener when the component is mounted
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on cleanup
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="absolute z-10 top-full right-0 bg-white shadow-md rounded-lg p-3 px-6">
      <ul className="flex flex-col">
        <li className="mb-2 flex items-center justify-center">
          {/* Profile Link */}
          <Image src={profile} alt="Profile" width={20} height={20} />
          <Link
            href="/profile"
            className="block ml-2 p-2 hover:bg-gray-100 rounded"
            onClick={onClose}>
            Profile
          </Link>
        </li>
        <li className="flex items-center  justify-center">
          {/* Logout Button */}
          <Image src={logout} alt="Logout" width={20} height={20} />
          <button
            className="block ml-2 w-full text-left p-2 hover:bg-gray-100 rounded"
            onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserAccountOverlay;
