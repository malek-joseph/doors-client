/** @format */

import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex items-center  justify-between lg:inline-block mb-8 lg:mb-0 lg:w-auto w-full  padding-container  ">
      <Link href="/" className="">
        <Image src="/logo.svg" alt="logo" width={30} height={29} />
      </Link>
      
    
    </div>
  );
};

export default Logo;
