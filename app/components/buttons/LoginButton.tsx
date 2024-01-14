/** @format */

import ButtonSm from "../shared/buttons/ButtonSm";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import SwiperMenu from "../shared/menu/SwiperMenu";

const LoginButton = () => {
  const user = useSelector(selectUser);

  console.log(user)
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
        <>
          <ButtonSm
            type="button"
            title=""
            icon="/assets/images/profile.png"
            variant="white"
            size={26}
          />
        </>
      )}
    </div>
  );
};

export default LoginButton;
