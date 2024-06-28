/** @format */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_LINKS } from "@/app/constants";

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <ul className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-2 md:space-y-0 py-4">
        {FOOTER_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.key} className="">
              <Link
                href={link.href}
                className={`text-sm ${isActive ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600 hover:text-teal-600"
                  } pb-1`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
