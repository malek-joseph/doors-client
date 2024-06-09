/** @format */
"use client"

import ButtonSm from "../shared/buttons/ButtonSm";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../app/redux/features/auth/authSlice";
import { useSession } from 'next-auth/react';
import Spinner from "../shared/spinner/Spinner";


interface UserOverlayProps {
  onClick: () => void;
  isOverlayVisible: boolean;
}

const LoginButton: React.FC<UserOverlayProps> = ({
  onClick,
  isOverlayVisible,
}) => {
  const user = useSelector(selectUserDetails);
  const { data, status } = useSession()
  
  let imageSrc = "";
  if (status === 'unauthenticated' && user && user.photo) {
    // const photoPathWithoutUploads =
    //   user.photo && user.photo.replace(/^uploads\//, "");

    // imageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`;
    imageSrc = user.photo;
  }

  if(status === 'authenticated' && user && user.photo) {
    imageSrc = user.photo as string
  }

 

  const handleClick = () => {
    if (user || data) {
      onClick(); // Toggle the overlay for logged in users
    }
  };

  // console.log(user);

  return (
    <div className="lg:flexCenter hidden transition-all hover:font-bold">
      { status === 'loading' &&  <Spinner/>}
      {!imageSrc && status !== 'loading' ? (
        <Link href="/auth/signin">
          <ButtonSm
            type="button"
            title=""
            icon="/assets/images/profile.png"
            variant="white"
            size={30}
          />
        </Link>
      ) : (
        <div onClick={handleClick}>
          <ButtonSm
            type="button"
            title=""
            icon={imageSrc}
            variant="white"
            size={40}
          />
        </div>
      )}
    </div>
  );
};

export default LoginButton;
