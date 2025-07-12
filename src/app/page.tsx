"use client";
import React, { useState, useEffect } from "react";

import Header from "./components/Head";
import SelectorBar from "./components/SelectorBar";
import TypingArea from "./components/TypingArea";
import FadeSwitch from "./components/FadeSwitch";

type AlgorithmName = "binarysearch"; // Extend this with more algorithms
type LanguageName = "java" | "python" | "javascript" | "cpp"; // Extend with more languages

const Main: React.FC = () => {
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmName>("binarysearch");
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageName>("java");
  const [algorithmContent, setAlgorithmContent] = useState<string>("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [userTypedContent, setUserTypedContent] = useState<string>("");
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Fetch markdown content dynamically based on the selected algorithm and language
  useEffect(() => {
    const fetchAlgorithmContent = async () => {
      try {
        const filePath = `../../algorithms/${selectedAlgorithm}/${selectedLanguage}.md`;
        const response = await fetch(filePath);
        const content = await response.text();
        setAlgorithmContent(content);
      } catch (error) {
        console.error("Failed to load algorithm content:", error);
        setAlgorithmContent("Error loading content. Please try again.");
      }
    };

    fetchAlgorithmContent();
  }, [selectedAlgorithm, selectedLanguage]);

  const handleTypingStart = () => {
    setIsTypingStarted(true);
    setStartTime(Date.now()); // Set the start time when typing begins
  };

  const handleTypingComplete = (typedContent: string) => {
    setUserTypedContent(typedContent);
    if (startTime) {
      const endTime = Date.now();
      setTimeElapsed((endTime - startTime) / 1000); // Convert ms to seconds
    }
    setTypingComplete(true);
  };

  return (
    <div>
      <div className="min-h-screen overflow-x-auto flex flex-col items-center justify-center">
        <div
          className={`transition-opacity duration-500 ${
            isTypingStarted ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Header />
        </div>
        <div
          className={`transition-opacity duration-500 ${
            isTypingStarted ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <SelectorBar
            onAlgorithmSelect={(algorithm: AlgorithmName) =>
              setSelectedAlgorithm(algorithm)
            }
            selectedAlgorithm={selectedAlgorithm}
            onLanguageSelect={(language: LanguageName) =>
              setSelectedLanguage(language)
            }
            selectedLanguage={selectedLanguage}
          />
        </div>
        {typingComplete ? (
          <FadeSwitch
            algorithmName={selectedAlgorithm}
            programmingLanguage={selectedLanguage}
            originalContent={algorithmContent}
            typedContent={userTypedContent}
            totalTimeSpent={timeElapsed}
          />
        ) : (
          <TypingArea
            lines={algorithmContent.split("\n")} // Split the markdown content into lines
            onTypingStart={handleTypingStart} // Pass the callback to TypingArea
            onTypingComplete={handleTypingComplete} // Pass the callback to TypingArea
          />
        )}
      </div>
    </div>
  );
};

export default Main;
