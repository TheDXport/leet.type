import React from "react";
import { REM, Geist } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Combobox from "@/components/ui/combobox";
import Link from "next/link";

type AlgorithmName = "Binary Search" | "Valid Perfect Square";

const algorithms: AlgorithmName[] = ["Binary Search", "Valid Perfect Square"];

const rem = REM({
  variable: "--font-rem",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${geist.className} font-medium text-xl flex text-[#b9b9b9] mb-4`}
    >
      <div className="flex items-center space-x-5 justfiy-center">
        <span
          className={`${rem.className} text-[rgb(213,213,213)] font-bold text-4xl pb-2`}
        >
          leet.typer
        </span>

        <span className="">\</span>
        <div className="hover:text-[#f6f6f6] transition-colors duration-[350ms]">
          <Link href="https://leetcode.com">Leetcode.com</Link>{" "}
        </div>
        <span className="">\</span>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg hover:text-[#f6f6f6] transition-colors duration-[350ms] flex items-center">
              {selectedLanguage}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-[#f6f6f6]">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onSelect={() => onLanguageSelect(language)}
                  className={`flex
                    ${
                      selectedLanguage === language
                        ? "bg-black"
                        : "bg-black text-[#c8c7c7]"
                    } hover:bg-black hover:text-white cursor-pointer transition-colors duration-200`}
                >
                  {language}
                  {selectedLanguage === language && (
                    <svg
                      className="ml-auto w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.04a.75.75 0 010 1.06l-7.35 7.35a.75.75 0 01-1.06 0L3.296 8.394a.75.75 0 111.06-1.06L8.5 11.478l6.144-6.144a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <span className="">\</span>
        <div className="">
          <Combobox
            options={algorithms}
            value={selectedAlgorithm}
            onSelect={(val) => onAlgorithmSelect(val as AlgorithmName)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
