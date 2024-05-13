/** @format */

import ButtonSm from "../shared/buttons/ButtonSm";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/features/auth/authSlice";
import SwiperMenu from "../shared/menu/SwiperMenu";


interface UserOverlayProps {
  onClick: () => void;
  isOverlayVisible: boolean;
}


const LoginButton: React.FC<UserOverlayProps> = ({
  onClick,
  isOverlayVisible,
}) => {
  const user = useSelector(selectUserDetails);

    const handleClick = () => {
      if (user) {
        onClick(); // Toggle the overlay for logged in users
      }
    };
  // console.log(user)
  return (
    <div className="lg:flexCenter hidden transition-all hover:font-bold">
      {!user ? (
        <Link href="/login">
          <ButtonSm
            type="button"
            title="Login"
            icon="/assets/images/user.png"
            variant="white"
          />
        </Link>
      ) : (
       <div onClick={handleClick}>
          <ButtonSm
            type="button"
            title=""
            icon="/assets/images/profile.png"
            variant="white"
            size={30}
          />
        </div>
      )}
    </div>
  );
};

export default LoginButton;
