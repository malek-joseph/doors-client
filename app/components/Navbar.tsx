"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { NAV_LINKS } from '../constants'
import ButtonSm from './buttons/ButtonSm'
import magnifying from "../../public/assets/images/magnifying.svg";

const Navbar = () => {
  const Login = () => {

  }
  return (
    <nav className=" flex flex-col lg:flex-row justify-between items-center max-container padding-container relative z-30 py-5  border-b border-gray-300">
      <div className="flex items-center  mb-3 lg:mb-0  ">
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
      <div className="relative flex items-center transition-all border-gray-400  hover:border-black border cursor-pointer w-full lg:w-3/12 py-1.5 px-4 rounded-md mb-3 lg:mb-0">
        <div className="mr-2">
          <Image src={magnifying} alt="magnifying" width={15} />
        </div>
        <div className="hidden lg:flex items-center">
          <p className="text-sm text-gray-500 ml-2">Quick Search</p>
        </div>
      </div>
      <ul className="hidden h-full gap-8 lg:flex ">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden transition-all hover:font-bold">
        <Link href="/login">
          <ButtonSm
            type="button"
            title="Login"
            icon="/assets/images/user.png"
            variant="white"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar