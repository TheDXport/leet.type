"use client";
import React, { useState } from "react";
import Header from "./components/header";
import Navbar from "./components/SelectorBar";
import TypingArea from "./components/TypingArea";
import FadeSwitch from "./components/FadeSwitch";

const App: React.FC = () => {
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  // const [selectedAlgorithm, setSelectedAlgorithm] = useState("Binary Search");
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [typingComplete, setTypingComplete] = useState(false); // State to track typing completion
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

  const handleTypingComplete = () => {
    setTypingComplete(true); // Mark typing as complete
  };

  return (
    <div className="min-h-screen overflow-x-auto bg-[#0D1017] text-gray-200 flex flex-col items-center justify-center ">
      {!isTypingStarted && <Header />}
      {!isTypingStarted && (
        <Navbar
          onAlgorithmClick={() => console.log("Open Algorithm Selector")}
          selectedAlgorithm={"Binary Search"}
          onLanguageSelect={(language) => setSelectedLanguage(language)}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* If typing is complete, show the fade transition */}
      {typingComplete ? (
        <FadeSwitch />
      ) : (
        <TypingArea
          lines={lines}
          onTypingStart={() => setIsTypingStarted(true)}
          onTypingComplete={handleTypingComplete} // Pass the callback to TypingArea
        />
      )}
    </div>
  );
};

export default App;
