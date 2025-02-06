import React from "react";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarProps {
  onAlgorithmClick: () => void;
  selectedAlgorithm: string;
  onLanguageSelect: (language: string) => void;
  selectedLanguage: string;
}

const selectorBar: React.FC<NavbarProps> = ({
  onAlgorithmClick,
  selectedAlgorithm,
  onLanguageSelect,
  selectedLanguage,
}) => {
  const languages = ["Java", "Python", "Javascript", "C++"];

  return (
    <div
      className={`${albertSans.className} flex justify-center space-x-2 md:space-x-7 px-4 sm:px-7 md:px-14 sm:py-1 md:py-2 lg:py-3 bg-[#181D23] text-[#CECECE] rounded-2xl shadow my-3`}>
      <button className="text-xs md:text-lg flex-col flex px-2 justify-center" onClick={onAlgorithmClick}>
        {selectedAlgorithm}
      </button>
      <div className="flex flex-col justify-center text-[#0D1012] text-2xl md:font-black">
        <h1>|</h1>
      </div>
      <div className="flex space-x-1">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => onLanguageSelect(language)}
            className={`text-xs md:text-lg px-2 md:px-4 rounded-lg shadow ${
              selectedLanguage === language ? " text-[#CECECE]" : " text-[#575E6C]"
            } hover:text-[#808A9D]`}>
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default selectorBar;
