import React, { useState } from "react";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["700"],
});

interface HeaderProps {
  onAlgorithmSelect: (algorithm: "binarysearch") => void;
  selectedAlgorithm: string;
  onLanguageSelect: (
    language: "java" | "python" | "javascript" | "cpp"
  ) => void;
  selectedLanguage: string;
}

const Header: React.FC<HeaderProps> = ({
  onAlgorithmSelect,
  selectedAlgorithm,
  onLanguageSelect,
  selectedLanguage,
}) => {
  const languages = ["java", "python", "javascript", "cpp"] as const;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${albertSans.className} w-[45rem] flex justify-center space-x-2 md:space-x-7 px-4 sm:px-7 md:px-14 sm:py-[0.005rem] md:py-1 lg:py-1 bg-[#d8d8d8] text-[#1d1d1d] rounded-2xl shadow my-3`}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold">algtype</span>
        <span className="text-[#0D1012]">/</span>
        <button
          className="text-xs md:text-lg flex-col flex px-2 justify-center"
          onClick={() => onAlgorithmSelect("binarysearch")}
        >
          {selectedAlgorithm}
        </button>
        <span className="text-[#0D1012]">/</span>
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-xs md:text-lg px-2 md:px-4 rounded-lg hover:text-[#1d1d1d] flex items-center"
          >
            {selectedLanguage}
            <svg
              className="w-3 h-3 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-1 bg-white text-[#1d1d1d] rounded-md shadow-lg z-10">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => {
                    onLanguageSelect(language);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    selectedLanguage === language ? 'bg-gray-200' : ''
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
