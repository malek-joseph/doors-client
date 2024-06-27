/** @format */

// RootLayout.tsx

import Navbar from "@/app/components/navigation/navbar/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./redux/provider";
import FooterVisibility from "./helpers/FooterVisibility";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doors",
  description: "Renting Apartments Made Easy",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Doors</title>
        <link rel="icon" href="/image/favicon.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <FooterVisibility />
          <ToastContainer position="bottom-left" autoClose={2000} />
        </Providers>
      </body>
    </html>
  );
}
