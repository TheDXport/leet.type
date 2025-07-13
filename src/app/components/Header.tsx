import React from "react";
import { Albert_Sans, REM, Geist } from "next/font/google";
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

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["700"],
});

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
        <div>
          <Link href="https://leetcode.com">Leetcode.com</Link>{" "}
        </div>
        <span className="">\</span>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg hover:text-[#f6f6f6] flex items-center">
              {selectedLanguage}
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
        <span className="">\</span>
        <div>
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
