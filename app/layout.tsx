/** @format */

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./redux/provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doors",
  description: "Renting Appartments Made Easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <Providers >

        <Navbar />
        {children}
        <Footer />
        </Providers>

        <ToastContainer position="bottom-left" autoClose={2000} />
      </body>
    </html>
  );
}
