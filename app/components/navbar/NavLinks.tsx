/** @format */

import Link from "next/link";
import { NAV_LINKS } from "../../constants/index";

const NavLinks = () => {
  return (
    <ul className="hidden h-full gap-8 lg:flex ">
      {NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.key}
          className="regular-16 text-gray-50 flexCenter cursor-pointer transition-all hover:font-bold">
          {link.label}
        </Link>
      ))}
    </ul>
  );
};

export default NavLinks;
