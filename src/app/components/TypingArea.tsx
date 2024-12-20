import React, { useState, useEffect, useRef } from "react";

interface TypingAreaProps {
  lines: string[];
  onTypingStart: () => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ lines, onTypingStart }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const typingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    typingContainerRef.current?.focus();
  }, []);

  const handleTyping = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onTypingStart();

    const char = e.key;
    const currentLine = lines[currentLineIndex];
    const currentChar = currentLine[charIndex];

    // Skip non-printable keys
    if (char.length > 1 && char !== "Backspace" && char !== " ") return;

    // Handle Backspace
    if (char === "Backspace") {
      if (charIndex > 0) {
        // Move the cursor back
        const prevCharIndex = charIndex - 1;

        // Update the previous character to 'pending' (neutral)
        setTypedChars((prev) => {
          const updated = [...prev];
          updated[prevCharIndex] = "pending"; // Set to neutral
          return updated;
        });

        // Move the cursor back
        setCharIndex(prevCharIndex);
      }
      return;
    }

    // Handle typing logic for printable characters
    if (charIndex < currentLine.length) {
      const isCorrect = char === currentChar;

      // Update the `typedChars` array
      setTypedChars((prev) => {
        const updated = [...prev];
        updated[charIndex] = isCorrect ? "correct" : "incorrect";
        return updated;
      });

      // Move the cursor to the next character
      setCharIndex((prev) => prev + 1);
    }

    // Handle line transition and skip spaces
    if (char === " " && charIndex === currentLine.length) {
      const nextLine = lines[currentLineIndex + 1];
      if (nextLine) {
        const firstNonSpaceIndex = nextLine.search(/\S/); // Find first non-space character
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(firstNonSpaceIndex >= 0 ? firstNonSpaceIndex : 0);
        setTypedChars([]);
      }
      return;
    }

    // Move to the next line if end of line is reached
    if (charIndex >= currentLine.length) {
      if (currentLineIndex < lines.length - 1) {
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(0);
        setTypedChars([]);
      }
    }
  };

  return (
    <div
      ref={typingContainerRef}
      tabIndex={0}
      onKeyDown={handleTyping}
      className="relative h-96 w-full outline-none"
    >
      <div className="absolute top-0 left-0 w-full">
        {lines
          .slice(currentLineIndex, currentLineIndex + 6)
          .map((line, lineIndex) => (
            <div key={lineIndex} className="transition-all duration-500">
              <pre className="text-xl font-mono text-gray-300">
                {line.split("").map((char, index) => {
                  const isCursor = lineIndex === 0 && index === charIndex;

                  return (
                    <span
                      key={index}
                      className={`${
                        lineIndex === 0 && index < typedChars.length
                          ? typedChars[index] === "correct"
                            ? "text-white"
                            : "text-red-500"
                          : "text-gray-500"
                      } ${
                        isCursor && cursorVisible ? "bg-white text-black" : ""
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TypingArea;
