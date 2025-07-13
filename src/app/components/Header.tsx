import React from "react";
import { Albert_Sans } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Combobox from "@/components/ui/combobox";

type AlgorithmName = "Binary Search" | "Valid Perfect Square";

const algorithms: AlgorithmName[] = ["Binary Search", "Valid Perfect Square"];

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["700"],
});

interface HeaderProps {
  onAlgorithmSelect: (algorithm: AlgorithmName) => void;
  selectedAlgorithm: AlgorithmName;
  onLanguageSelect: (
    language: "Java" | "Python" | "Javascript" | "Cpp"
  ) => void;
  selectedLanguage: string;
}

const Header: React.FC<HeaderProps> = ({
  onAlgorithmSelect,
  selectedAlgorithm,
  onLanguageSelect,
  selectedLanguage,
}) => {
  const languages = ["Java", "Python", "Javascript", "Cpp"] as const;

  return (
    <div
      className={`${albertSans.className} w-[45rem] flex justify-center space-x-2 md:space-x-7 px-4 sm:px-7 md:px-14 sm:py-[0.005rem] md:py-1 lg:py-1 bg-[#d8d8d8] text-[#1d1d1d] rounded-2xl shadow my-3`}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold">Leet.type</span>
        <span className="text-[#0D1012]">&gt;</span>
        <Combobox
          options={algorithms}
          value={selectedAlgorithm}
          onSelect={(val) => onAlgorithmSelect(val as AlgorithmName)}
        />
        <span className="text-[#0D1012]">&gt;</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs md:text-lg px-2 md:px-4 rounded-lg hover:text-[#1d1d1d] flex items-center">
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-[#1d1d1d]">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language}
                onSelect={() => onLanguageSelect(language)}
                className={selectedLanguage === language ? "bg-gray-200" : ""}
              >
                {language}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
