/** @format */

import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex items-center  justify-between lg:inline-block mb-8 lg:mb-0 lg:w-auto w-full  padding-container  ">
      <Link href="/" className="">
        <Image src="/logo.svg" alt="logo" width={30} height={29} />
      </Link>
      <Image
        src="/assets/images/menu.svg"
        alt="menu"
        width={25}
        height={25}
        className="inline-block cursor-pointer lg:hidden"
      />
    </div>
  );
};

export default Logo;
