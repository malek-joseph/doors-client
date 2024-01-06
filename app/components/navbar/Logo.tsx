/** @format */

import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex items-center  justify-between lg:inline-block  lg:mb-0 lg:w-auto padding-container  ">
      <Link href="/" className="">
        <Image src="/logo.svg" alt="logo" width={50} height={29}  className=""/>
      </Link>
      
    
    </div>
  );
};

export default Logo;
