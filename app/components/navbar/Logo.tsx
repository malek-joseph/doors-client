/** @format */

import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex items-center  justify-between lg:inline-block  lg:mb-0 lg:ml-10  lg:w-20 h-10">
      <Link href="/" className="">
        <Image
          src="/logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="w-40 h-10"
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
