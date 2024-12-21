import React, { useState, useEffect, useRef } from "react";

interface TypingAreaProps {
  lines: string[];
  onTypingStart: () => void;
  onTypingComplete: () => void; // Callback to notify typing completion
}

const TypingArea: React.FC<TypingAreaProps> = ({
  lines,
  onTypingStart,
  onTypingComplete,
}) => {
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
    if (
      char.length > 1 &&
      char !== "Backspace" &&
      char !== " " &&
      char !== "Enter"
    )
      return;

    // Handle Backspace
    if (char === "Backspace") {
      if (charIndex > 0) {
        const prevCharIndex = charIndex - 1;

        setTypedChars((prev) => {
          const updated = [...prev];
          updated[prevCharIndex] = "pending"; // Set to neutral
          return updated;
        });

        setCharIndex(prevCharIndex);
      }
      return;
    }

    // Handle typing logic for printable characters
    if (charIndex < currentLine.length) {
      if (char != "Enter") {
        const isCorrect = char === currentChar;

        setTypedChars((prev) => {
          const updated = [...prev];
          updated[charIndex] = isCorrect ? "correct" : "incorrect";
          return updated;
        });

        setCharIndex((prev) => prev + 1);
      }
    }

    // Handle space and line transition
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

    // Handle Enter key for line transition
    if (
      (char === "Enter" && charIndex >= currentLine.length) ||
      (charIndex >= currentLine.length && char === " ")
    ) {
      if (currentLineIndex < lines.length - 1) {
        const nextLine = lines[currentLineIndex + 1];
        const firstNonSpaceIndex = nextLine.search(/\S/); // Find the first non-space character

        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(firstNonSpaceIndex >= 0 ? firstNonSpaceIndex : 0);
        setTypedChars([]);
      }
      return;
    }

    // Check if the last character of the last line is typed (semicolon in this case)
    if (
      charIndex === currentLine.length - 1 &&
      currentLineIndex === lines.length - 1
    ) {
      // Trigger the onTypingComplete callback as soon as the semicolon is typed
      onTypingComplete();
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
      className="relative h-96 w-full overflow-x-clip overflow-y-clip outline-none items-center flex flex-col"
    >
      <div className="">
        <div className="top-0 left-0 w-full">
          {lines
            .slice(currentLineIndex, currentLineIndex + 6)
            .map((line, lineIndex) => (
              <div key={lineIndex} className="transition-all duration-500">
                <pre className="flex flex-wrap text-xl px-6 sm:text-xl md:text-2xl font-mono text-gray-300">
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
                          isCursor && cursorVisible
                            ? "bg-gray-600 text-black"
                            : ""
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
    </div>
  );
};

export default TypingArea;
