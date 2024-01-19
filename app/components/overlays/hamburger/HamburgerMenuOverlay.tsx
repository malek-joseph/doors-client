/** @format */

// HamburgerMenuOverlay.tsx
import React from "react";
import styles from "./HamburgerMenuOverlay.module.css";
import { NAV_LINKS } from "../../../constants"; // Adjust the import path as needed
import Link from "next/link";

const HamburgerMenuOverlay: React.FC = ({ }) => {
  return (
    <div className={`${styles.overlay} net_height`
}>
      <div className={`${styles.overlayContent} net_height`}>
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-24 text-gray-50 flexCenter cursor-pointer transition-all hover:font-bold my-3 mr-3">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenuOverlay;
