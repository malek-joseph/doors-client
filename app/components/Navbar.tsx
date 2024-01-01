"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { NAV_LINKS } from '../constants'
import ButtonSm from './buttons/ButtonSm'

const Navbar = () => {
  const Login = () => {

  }
  return (
    <nav className=" flex justify-between items-center max-container padding-container relative z-30 py-5 bg-gray-10">
      <Link href="/" className="">
        <Image src="/logo.svg" alt="logo" width={30} height={29} />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex ">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="lg:flexCenter hidden">
        <Link href="/login">
          <ButtonSm
            type="button"
            title="Login"
            icon="/assets/images/user.png"
            variant='btn_dark_green'
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar