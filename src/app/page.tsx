"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

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

  const handleTypingComplete = () => {
    setTypingComplete(true); // Mark typing as complete
  };

  return (
    <div>
      <div className="min-h-screen overflow-x-auto flex flex-col items-center justify-center">
        {!isTypingStarted && <Header />}
        {!isTypingStarted && (
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
        )}
        {typingComplete ? (
          <FadeSwitch />
        ) : (
          <TypingArea
            lines={algorithmContent.split("\n")} // Split the markdown content into lines
            onTypingStart={() => setIsTypingStarted(true)}
            onTypingComplete={handleTypingComplete} // Pass the callback to TypingArea
          />
        )}
      </div>
    </div>
  );
};

export default Main;
