"use client";
import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import TypingArea from "./components/TypingArea";
import FadeSwitch from "./components/FadeSwitch";

type AlgorithmName = "Binary Search" | "Valid Perfect Square"; // Extend this with more algorithms
type LanguageName = "Java" | "Python" | "Javascript" | "Cpp"; // Extend with more languages

const Main: React.FC = () => {
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmName>("Binary Search");
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageName>("Java");
  const [algorithmContent, setAlgorithmContent] = useState<string>("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalErrors, setTotalErrors] = useState<number>(0);

  // Fetch source code dynamically based on the selected algorithm and language
  useEffect(() => {
    const fetchAlgorithmContent = async () => {
      try {
        const algorithmFolder = selectedAlgorithm.replace(/\s+/g, "");
        const baseName = selectedAlgorithm.replace(/\s+/g, "").toLowerCase();

        const extensions: Record<LanguageName, string> = {
          Java: "java",
          Python: "py",
          Javascript: "js",
          Cpp: "cpp",
        };

        const filePath = `../../algorithms/${algorithmFolder}/${baseName}.${extensions[selectedLanguage]}`;
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
    if (!isTypingStarted) {
      setIsTypingStarted(true);
      setStartTime(Date.now()); // Record the start time only once
    }
  };

  const handleTypingComplete = (errors: number) => {
    setTotalErrors(errors);
    if (startTime) {
      const endTime = Date.now();
      setTimeElapsed((endTime - startTime) / 1000); // Convert ms to seconds
    }
    setTypingComplete(true);
  };

  return (
    <div className="bg-black relative">
      <div className="min-h-screen overflow-x-auto flex flex-col justify-center items-center mr-52 ">
        <div className="w-full max-w-4xl">
          <div
            className={`transition-opacity duration-500 ${
              isTypingStarted ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Header
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
              totalTimeSpent={timeElapsed}
              totalErrors={totalErrors}
            />
          ) : (
            <div className="w-auto">
              <TypingArea
                lines={algorithmContent.split("\n")} // Split the markdown content into lines
                onTypingStart={handleTypingStart} // Pass the callback to TypingArea
                onTypingComplete={handleTypingComplete} // Pass the callback to TypingArea
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
