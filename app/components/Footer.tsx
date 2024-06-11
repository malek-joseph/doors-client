/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FOOTER_LINKS } from "../constants";
import ButtonSm from "./buttons/ButtonSm";
import googleApp from "../../public/assets/images/googleApp.png";
import appleApp from "../../public/assets/images/appleApp.png";

const Footer = () => {
  return (
    <footer className=" flex justify-between items-center max-container padding-container relative z-30 py-5 border-t border-gray-300 w-full">
      <Link href="/" className="">
        <Image src="/logo.svg" alt="logo" width={80} height={80} priority />
      </Link>
      <ul className=" h-full gap-2 lg:gap-5 flex flex-col lg:flex-row items-center justify-center ">
        {FOOTER_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className=" text-gray-50 text-xs hover:underline flexCenter  cursor-pointer transition-all ">
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="flex">
        <Image
          src={appleApp}
          alt="apple app"
          width={100}
          height={40}
          className="w-full h-auto"
        />
        <Image
          src={googleApp}
          alt="google app"
          width={100}
          height={40}
          className="w-full h-auto"
        />
      </div>
    </footer>
  );
};

export default Footer;
