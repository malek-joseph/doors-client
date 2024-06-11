/** @format */

import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex items-center justify-between lg:inline-block lg:mb-0 lg:ml-10">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={60}
          height={60}
          priority
          
        />
      </Link>
    </div>
  );
};

export default Logo;
