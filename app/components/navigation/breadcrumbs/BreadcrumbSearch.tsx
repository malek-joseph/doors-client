/** @format */
"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { capitalizeFirstLetter, removeSlashes } from "@/app/helpers/helperFunctions";
import { usePathname } from 'next/navigation'



const Breadcrumb = () => {
     const searchParams = useSearchParams();
     const query = searchParams.get("query");
     const path = capitalizeFirstLetter(removeSlashes(usePathname()))

  return (
    <nav className="text-xs text-gray-600  w-full ">
      <Link href="/" className="hover:underline">
        Home
      </Link>{" "}
      &gt;{" "}
      <Link href={`/${path}`} className="hover:underline">
        {path}
      </Link>{" "}
      {query && (
        <span className="text-teal-400">
          &gt; {capitalizeFirstLetter(query)}{" "}
        </span>
      )}
    </nav>
  );
};

export default Breadcrumb;
