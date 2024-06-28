/** @format */

import Link from "next/link";
import { NAV_LINKS } from "../../../../constants/index";

const NavLinks = () => {
  return (
    <ul className="hidden md:flex lg:flex  h-full gap-8  mr-5">
      {NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.key}
          className="regular-16 text-gray-50 flexCenter cursor-pointer transition-all hover:text-teal-700 p-1">
          {link.label}
        </Link>
      ))}
    </ul>
  );
};

export default NavLinks;
