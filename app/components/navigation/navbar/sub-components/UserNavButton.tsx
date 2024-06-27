/** @format */

"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails } from "../../../../redux/features/auth/authSlice";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { logout } from "../../../../redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import UserNavImage from "./sub-components/UserNavImage";
import UserAccountOverlay from "@/app/components/overlays/UserAccountOverlay";

const UserNavButton = () => {
  const { data } = useSession();
  const [isUserOverlayVisible, setIsUserOverlayVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUserDetails);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.photo) {
      setImageSrc(user.photo);
    }
  }, [user]);

  const toggleUserOverlay = () => {
    if (user || data) {
      setIsUserOverlayVisible(!isUserOverlayVisible);
    }
  };

  const handleLogout = () => {
    try {
      if (user && !data) {
        dispatch(logout());
      }
      if (data) {
        signOut();
        dispatch(logout());
      }
      toast.success("Signed out successfully");
      setIsUserOverlayVisible(false);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="relative">
      <UserNavImage imageSrc={imageSrc} toggleUserOverlay={toggleUserOverlay} />
      {isUserOverlayVisible && (user || data) && (
        <UserAccountOverlay
          toggleUserOverlay={toggleUserOverlay}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default UserNavButton;
