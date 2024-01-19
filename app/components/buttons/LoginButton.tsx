/** @format */

import ButtonSm from "../shared/buttons/ButtonSm";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import SwiperMenu from "../shared/menu/SwiperMenu";


interface UserOverlayProps {
  onClick: () => void;
  isOverlayVisible: boolean;
}


const LoginButton: React.FC<UserOverlayProps> = ({
  onClick,
  isOverlayVisible,
}) => {
  const user = useSelector(selectUser);

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
        <Link href="/profile">
          <ButtonSm
            type="button"
            title=""
            icon="/assets/images/profile.png"
            variant="white"
              size={30}
              onClick={onClick}
              
          />
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
