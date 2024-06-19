/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FOOTER_LINKS } from "../constants";
import googleApp from "../../public/assets/images/googleApp.png";
import appleApp from "../../public/assets/images/appleApp.png";

const Footer = () => {
  return (
    <footer className="bg-teal-950 text-white py-10">
      <div className="max-container padding-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-10">
            <Link href="/">
              <Image
                src="/assets/images/logo-no-bg.png"
                alt="logo"
                width={80}
                height={80}
                priority
              />
            </Link>
            <ul className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <Image
              src={appleApp}
              alt="Download on the Apple Store"
              width={120}
              height={40}
              className="h-auto"
            />
            <Image
              src={googleApp}
              alt="Get it on Google Play"
              width={120}
              height={40}
              className="h-auto"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <p className="text-gray-400 text-sm px-3">
              In the spirit of innovation, Doors connects roommates across
              Egypt, fostering community and shared living. We celebrate unity,
              respect diverse backgrounds, and aim to create harmonious living
              experiences for all.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-300 hover:text-white w-[40px] h-[40px] md:w-[45px] md:h-[45px] lg:w-[45px] lg:h-[45px]">
              <Image
                src="/assets/images/facebook.svg"
                alt="facebook"
                width={50}
                height={50}
                priority
              />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white  w-[40px] h-[40px] md:w-[45px] md:h-[45px] lg:w-[45px] lg:h-[45px]">
              <Image
                src="/assets/images/instagram.svg"
                alt="instagram"
                width={50}
                height={50}
                
                priority
              />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white  w-[40px] h-[40px] md:w-[45px] md:h-[45px] lg:w-[45px] lg:h-[45px]">
              <Image
                src="/assets/images/x.svg"
                alt="X"
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-gray-400 text-xs text-center lg:text-left flexCenter">
          Doors is created and managed by Malek Yousef © Malek Yousef
        </div>
      </div>
    </footer>
  );
};

export default Footer;
