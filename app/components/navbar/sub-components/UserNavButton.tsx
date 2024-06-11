import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails } from "../../../redux/features/auth/authSlice";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { logout } from "../../../redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import HamburgerMenuOverlay from "@/app/components/overlays/hamburger/HamburgerMenuOverlay";
import HamburgerMenu from "@/app/components/buttons/HamburgerMenu";
import UserNavImage from "./sub-components/UserNavImage";
import UserAccountOverlay from "../../overlays/user/UserAccountOverlay";

const UserNavButton = () => {
  const { data } = useSession();
  const [isUserOverlayVisible, setIsUserOverlayVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUserDetails);
  const [isMenuOverlayVisible, setIsMenuOverlayVisible] = useState(false);
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
    if (user) {
      dispatch(logout());
    }
    if (data) {
      signOut();
      dispatch(logout());
    }
    toast.success("Signed out successfully");
    setIsUserOverlayVisible(false);
    router.push("/");
  };

  const toggleMenuOverlay = () => {
    setIsMenuOverlayVisible(!isMenuOverlayVisible);
  };

  return (
    <>
      <UserNavImage imageSrc={imageSrc} toggleUserOverlay={toggleUserOverlay} />
      {isUserOverlayVisible && (user || data) && (
        <UserAccountOverlay toggleUserOverlay={toggleUserOverlay} onLogout={handleLogout} />
      )}

      <HamburgerMenu onClick={toggleMenuOverlay} isOverlayVisible={isMenuOverlayVisible} />

      {isMenuOverlayVisible && <HamburgerMenuOverlay />}
    </>
  );
};

export default UserNavButton;
