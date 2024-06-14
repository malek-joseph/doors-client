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
                src="/logo.svg"
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
            <p className="text-gray-400 text-sm">
              Flatmates.com.au is owned and operated by ASX-listed REA Group Ltd
              (REA:ASX) © REA Group Ltd.
            </p>
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  FAQ & Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-300 hover:text-white">
              Facebook
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Instagram
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Twitter
            </Link>
          </div>
        </div>
        <div className="mt-8 text-gray-400 text-sm text-center lg:text-left">
          In the spirit of reconciliation, Flatmates.com.au acknowledges the
          Traditional Custodians of Country throughout Australia and their
          connections to land, sea and community. We pay our respects to their
          Elders past, present and emerging.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
