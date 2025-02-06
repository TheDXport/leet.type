import React from "react";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["700"],
});

const Header = () => {
  return (
    <h1
      className={`${albertSans.className} text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-[#AFAEAE] text-center transition-opacity duration-500`}
    >
      algtype
    </h1>
  );
};

export default Header;
