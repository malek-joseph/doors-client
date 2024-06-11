/** @format */

import Image from "next/image";
import React from "react";
import "../overlays/hamburger/HamburgerMenuOverlay";

interface HamburgerMenuProps {
  onClick: () => void;
  isOverlayVisible: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  onClick,
  isOverlayVisible,
}) => {
  return (
    <div className="padding-container md:hidden" onClick={onClick} >
      {isOverlayVisible ? (
        <Image
          src="/assets/images/close.svg"
          alt="menu"
          width={50}
          height={50}
          className="inline-block cursor-pointer lg:hidden"
        />
      ) : (
        <Image
          src="/assets/images/menu.svg"
          alt="menu"
          width={50}
          height={50}
          className="inline-block cursor-pointer lg:hidden"
        />
      )}
    </div>
  );
};

export default HamburgerMenu;
