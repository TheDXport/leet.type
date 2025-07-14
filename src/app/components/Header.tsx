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

type AlgorithmName =
  | "1. Two Sum"
  | "9. Palindrome Number"
  | "13. Roman to Integer"
  | "14. Longest Common Prefix"
  | "20. Valid Parentheses"
  | "21. Merge Two Sorted Lists"
  | "26. Remove Duplicates From Sorted Array"
  | "27. Remove Element";
// | "28. Find the Index of the First Occurrence in a String"
// | "35. Search Insert Position"
// | "58. Length of Last Word"
// | "66. Plus One"
// | "67. Add Binary"
// | "69. Sqrt(x)"
// | "70. Climbing Stairs"
// | "83. Remove Duplicates from Sorted List"
// | "88. Merge Sorted Array"
// | "104. Maximum Depth of Binary Tree"
// | "121. Best Time to Buy and Sell Stock"
// | "125. Valid Palindrome"
// | "367. Valid Perfect Square"
// | "704. Binary Search"
const algorithms: AlgorithmName[] = [
  "1. Two Sum",
  "9. Palindrome Number",
  "13. Roman to Integer",
  "14. Longest Common Prefix",
  "20. Valid Parentheses",
  "21. Merge Two Sorted Lists",
  "26. Remove Duplicates From Sorted Array",
  "27. Remove Element",
  // "28. Find the Index of the First Occurrence in a String",
  // "35. Search Insert Position",
  // "58. Length of Last Word",
  // "66. Plus One",
  // "67. Add Binary",
  // "69. Sqrt(x)",
  // "70. Climbing Stairs",
  // "83. Remove Duplicates from Sorted List",
  // "88. Merge Sorted Array",
  // "104. Maximum Depth of Binary Tree",
  // "121. Best Time to Buy and Sell Stock",
  // "125. Valid Palindrome",
  // "367. Valid Perfect Square",
  // "704. Binary Search",
];

algorithms.sort((a, b) => {
  const numA = parseInt(a.split(".")[0], 10);
  const numB = parseInt(b.split(".")[0], 10);
  return numA - numB;
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
      className={`${geist.className} font-medium text-lg sm:text-xl flex text-[#b9b9b9] mb-4`}
    >
      <div className="flex flex-wrap items-center justify-center md:justify-start sm:space-x-2 md:space-x-2 lg:space-x-6 gap-y-2 w-full">
        <span
          className={`${rem.className} text-[rgb(213,213,213)] font-bold sm:text-2xl md:text-2xl lg:text-4xl pb-2`}
        >
          leet.typer
        </span>

        <span className="hidden sm:inline">\</span>
        <div className="interactive-item sm:text-lg md:text-xl">
          <Link href="https://leetcode.com" className="">
            Leetcode.com
          </Link>
        </div>
        <span className="hidden sm:inline">\</span>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="interactive-item rounded-lg flex items-center sm:text-lg md:text-xl">
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
                    } hover:bg-[#e6e6e6] hover:text-black cursor-pointer transition-colors duration-200`}
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
        <span className="hidden sm:inline">\</span>
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
