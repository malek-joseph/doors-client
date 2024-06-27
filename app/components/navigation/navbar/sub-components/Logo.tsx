/** @format */

import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex w-16">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={35} 
          height={35} 
          priority
           style={{ width: '100%', height: 'auto' }}
        />
      </Link>
    </div>
  );
};

export default Logo;
