/** @format */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "@/app/helpers/helperFunctions"; // Adjust the import path as needed
import { FOOTER_LINKS } from "@/app/constants";


const NavMenu = () => {
  const pathname = usePathname();
  const activeLink = pathname.split("/").filter((segment) => segment)[1];

  return (
    <nav className="w-full ">
      <ul className="flex justify-center space-x-8  py-4">
        {FOOTER_LINKS.map((link) => {
          const isActive = link.key === activeLink;
          return (
            <li key={link.key}>
              <Link href={link.href}  className={`text-sm ${isActive ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"
                    } pb-1`}>
               
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
