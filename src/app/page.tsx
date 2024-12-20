"use client";
import React, { useState } from "react";
import Header from "./components/header";
import Navbar from "./components/SelectorBar";
import TypingArea from "./components/TypingArea";

const App: React.FC = () => {
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Binary Search");
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const lines = [
    "public int binarySearch(int[] nums, int target) {",
    "    int left = 0;",
    "    int right = nums.length - 1;",
    "    while (left <= right) {",
    "        int mid = left + (right - left) / 2;",
    "        if (nums[mid] == target) {",
    "           return mid;",
    "        }",
    "        if (nums[mid] > target) {",
    "           right = mid - 1;",
    "        }",
    "        else {",
    "           left = mid + 1;",
    "        }",
    "      }",
    "    return -1;",
    "}",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center">
      {!isTypingStarted && <Header />}
      {!isTypingStarted && (
        <Navbar
          onAlgorithmClick={() => console.log("Open Algorithm Selector")}
          selectedAlgorithm={selectedAlgorithm}
          onLanguageSelect={(language) => setSelectedLanguage(language)}
          selectedLanguage={selectedLanguage}
        />
      )}
      <TypingArea
        lines={lines}
        onTypingStart={() => setIsTypingStarted(true)}
      />
    </div>
  );
};

export default App;
