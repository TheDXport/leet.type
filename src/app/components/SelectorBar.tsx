import React from "react";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarProps {
  onAlgorithmSelect: (algorithm: "binarysearch") => void; // Use the exact type here
  selectedAlgorithm: string;
  onLanguageSelect: (
    language: "java" | "python" | "javascript" | "cpp"
  ) => void; // Explicit types for language
  selectedLanguage: string;
}

const SelectorBar: React.FC<NavbarProps> = ({
  onAlgorithmSelect,
  selectedAlgorithm,
  onLanguageSelect,
  selectedLanguage,
}) => {
  const languages = ["java", "python", "javascript", "cpp"] as const;

  return (
    <div
      className={`${albertSans.className} w-[45rem] flex justify-center space-x-2 md:space-x-7 px-4 sm:px-7 md:px-14 sm:py-[0.005rem] md:py-1 lg:py-1 bg-[#d8d8d8] text-[#1d1d1d] rounded-2xl shadow my-3`}
    >
      <button
        className="text-xs md:text-lg flex-col flex px-2 justify-center"
        onClick={() => onAlgorithmSelect("binarysearch")} // Pass a valid value
      >
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
            className={`text-xs md:text-lg px-2 md:px-4 rounded-lg  ${
              selectedLanguage === language
                ? " text-[#1d1d1d]"
                : " text-[#66676a]"
            } hover:text-[#1d1d1d]`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectorBar;
