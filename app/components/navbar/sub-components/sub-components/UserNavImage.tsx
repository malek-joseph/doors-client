/** @format */

import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

interface UserNavImageProps {
  imageSrc: string | null;
  toggleUserOverlay: () => void;
}

const UserNavImage = ({ imageSrc, toggleUserOverlay }: UserNavImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };


  return (
    <div
      className="lg:flexCenter md:flexCenter  transition-all hover:font-bold hover:border-teal-500 border-2 rounded-full hover:drop-shadow-lg"
      style={{ width: "50px", height: "50px", position: "relative" }}>
      {!imageSrc ? (
        <Link href="/auth/signin">
          <div
            onClick={toggleUserOverlay}
            className="hover:cursor-pointer "
            style={{ width: "40px", height: "40px", position: "relative" }}>
            {!isImageLoaded && (
              <Skeleton circle={true} height={40} width={40} style={{top: "0"}}  />
            )}
            <img
              src="/assets/images/profile.png"
              alt="User Image"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: isImageLoaded ? "block" : "none",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              onLoad={handleImageLoad}
            />
          </div>
        </Link>
      ) : (
        <div
          onClick={toggleUserOverlay}
          className="hover:cursor-pointer"
          style={{ width: "50px", height: "50px", position: "relative" }}>
          {!isImageLoaded && <Skeleton circle={true} height={50} width={50} style={{top: "-5px"}} />}
          <img
            src={imageSrc}
            alt="User Image"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: isImageLoaded ? "block" : "none",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onLoad={handleImageLoad}
          />
        </div>
      )}
    </div>
  );
};

export default UserNavImage;
