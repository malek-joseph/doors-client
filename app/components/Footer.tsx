/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FOOTER_LINKS } from "../constants";
import ButtonSm from "./buttons/ButtonSm";
import googleApp from "../../public/assets/images/googleApp.png"
import appleApp from "../../public/assets/images/appleApp.png"

const Footer = () => {
  const Login = () => {};
  return (
    <nav className=" flex justify-between items-center max-container padding-container relative z-30 py-5 bg-gray-10">
      <Link href="/" className="">
        <Image src="/logo.svg" alt="logo" width={40} height={29} />
      </Link>
      <ul className=" h-full gap-5 lg:flex ">
        {FOOTER_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className=" text-gray-50 text-xs hover:underline flexCenter cursor-pointer transition-all ">
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="flex">
        <Image src={appleApp} alt="apple app" width={100}/>
        <Image src={googleApp} alt="google app"  width={100}/>
      </div>
    </nav>
  );
};

export default Footer;
