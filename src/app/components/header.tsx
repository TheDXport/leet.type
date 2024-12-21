import React from "react";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["800"],
});

const Header = () => {
  return (
    <h1
      className={`${albertSans.className} text-5xl font-bold text-[#65718C] text-center transition-opacity duration-500`}
    >
      algotype
    </h1>
  );
};

export default Header;
