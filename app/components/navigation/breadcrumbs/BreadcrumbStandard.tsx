/** @format */
"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  capitalizeFirstLetter,
  removeSlashes,
} from "@/app/utils/helperFunctions";
import { usePathname } from 'next/navigation'



const Breadcrumb = () => {
     const pathname = usePathname();
     const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-xs text-gray-600 w-full">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        return (
          <span key={index}>
            {" "}
            &gt;{" "}
            {isLast ? (
              <span className="text-teal-400">{capitalizeFirstLetter(segment)}</span>
            ) : (
              <Link href={href} className="hover:underline">
                {capitalizeFirstLetter(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
