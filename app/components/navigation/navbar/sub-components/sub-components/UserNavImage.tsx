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
      className="lg:flexCenter md:flexCenter transition-all hover:font-bold hover:border-teal-500 border rounded-full hover:drop-shadow-md"
      style={{ position: "relative" }}>
      {imageSrc ? (
        <div
          onClick={toggleUserOverlay}
          className="hover:cursor-pointer"
          style={{ width: "40px", height: "40px", position: "relative" }}>
          <Image
            src={imageSrc}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
            onLoadingComplete={handleImageLoad}
            style={{ display: isImageLoaded ? "block" : "none" }}
            priority
          />
        </div>
      ) : (
        <Link href="/auth/signin">
          <div
            onClick={toggleUserOverlay}
            className="hover:cursor-pointer"
            style={{ width: "40px", height: "40px", position: "relative" }}>
            <Image
              src="/assets/images/profile.png"
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
              onLoadingComplete={handleImageLoad}
              priority
            />
          </div>
        </Link>
      )}
    </div>
  );
};

export default UserNavImage;
