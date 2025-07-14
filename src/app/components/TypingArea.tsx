import React, { useState, useEffect, useRef } from "react";

interface TypingAreaProps {
  lines: string[];
  onTypingStart: () => void;
  onTypingComplete: (totalErrors: number) => void;
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
  const [errorCount, setErrorCount] = useState(0);
  const [lineTransition, setLineTransition] = useState(false);
  const typingContainerRef = useRef<HTMLDivElement>(null);

  const totalChars =
    lines
      .join("\n")
      .split("\n")
      .map((line) => line.replace(/^\s+/, ""))
      .join("\n").length - 1;

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    typingContainerRef.current?.focus();
  }, [lines]);

  useEffect(() => {
    if (currentLineIndex > 0) {
      setLineTransition(true);
      const timeout = setTimeout(() => setLineTransition(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  const handleTyping = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onTypingStart();

    const keystroke = e.key;
    const currentLine = lines[currentLineIndex];
    const currentChar = currentLine[charIndex];

    // Skip non-printable keys
    if (
      keystroke.length > 1 &&
      keystroke !== "Backspace" &&
      keystroke !== " " &&
      keystroke !== "Enter"
    )
      return;

    // Handle Backspace
    if (keystroke === "Backspace") {
      if (charIndex > 0) {
        const prevCharIndex = charIndex - 1;

        setTypedChars((prev) => prev.slice(0, prevCharIndex));

        setCharIndex(prevCharIndex);
      }
      return;
    }

    // Handle printable characters
    if (charIndex < currentLine.length) {
      const isCorrect = keystroke === currentChar;

      if (!isCorrect) {
        setErrorCount((prev) => (prev < totalChars ? prev + 1 : prev));
      }

      setTypedChars((prev) => {
        const updated = [...prev];
        updated[charIndex] = isCorrect ? "correct" : "incorrect";
        return updated;
      });

      setCharIndex((prev) => prev + 1);
    }

    // Handle space and Enter for line transition
    if (
      (keystroke === " " || keystroke === "Enter") &&
      charIndex >= currentLine.length
    ) {
      const nextLine = lines[currentLineIndex + 1];
      if (nextLine) {
        const firstNonSpaceIndex = nextLine.search(/\S/);
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(firstNonSpaceIndex >= 0 ? firstNonSpaceIndex : 0);
        setTypedChars([]);
      } else {
        handleCompletion();
      }
      return;
    }

    // Check if the last character of the last line is typed (e.g., semicolon)
    if (
      charIndex === currentLine.length - 1 &&
      currentLineIndex === lines.length - 1
    ) {
      handleCompletion();
    }
  };

  // ✅ Function to handle completion and send the typed content
  const handleCompletion = () => {
    onTypingComplete(errorCount);
  };

  return (
    <div
      ref={typingContainerRef}
      tabIndex={0}
      onKeyDown={handleTyping}
      className="w-full overflow-hidden outline-none flex flex-col ml-10 sm:ml-3 "
    >
      <div className={`space-y-4 ${lineTransition ? "slide-up" : ""}`}>
        {lines
          .slice(currentLineIndex, currentLineIndex + 6)
          .map((line, lineIndex) => (
            <div
              key={lineIndex}
              className={`transition-all duration-500 text-xl sm:text-xl md:text-2xl font-mono text-gray-300`}
            >
              {line.split("").map((char, index) => {
                const isCursor = lineIndex === 0 && index === charIndex;

                return (
                  <span
                    key={index}
                    className={`${
                      lineIndex === 0 && typedChars[index] !== undefined
                        ? typedChars[index] === "correct"
                          ? "text-white"
                          : char === " "
                          ? "bg-red-500"
                          : "text-red-500"
                        : "text-gray-500"
                    } ${
                      isCursor && cursorVisible ? "bg-[#3c3c3c] text-black" : ""
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TypingArea;
