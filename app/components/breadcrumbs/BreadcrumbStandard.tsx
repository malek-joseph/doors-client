/** @format */

import Link from "next/link";

const Breadcrumb = () => {
  return (
    <nav className="text-xs text-gray-600  w-full ">
      <Link href="/" className="hover:underline">
        Home
      </Link>{" "}
      &gt;{" "}
      <Link href="/search" className="hover:underline">
        Search
      </Link>{" "}
      &gt; <span className="text-teal-400 ml-3">Search Query</span>
    </nav>
  );
};

export default Breadcrumb;
