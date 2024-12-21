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
  const [preservedLineIndex, setPreservedLineIndex] = useState<number | null>(
    null
  );
  const typingContainerRef = useRef<HTMLDivElement>(null);
  const [prevIncorrect, setPrevIncorrect] = useState(false);

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

        setTypedChars((prev) => {
          const updated = [...prev];
          updated[prevCharIndex] = "pending"; // Set to neutral
          return updated;
        });

        setCharIndex(prevCharIndex);
      }
      return;
    }

    // Handle printable characters
    if (charIndex < currentLine.length) {
      const isCorrect = keystroke === currentChar;

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
        const firstNonSpaceIndex = nextLine.search(/\S/); // Find first non-space character
        setPreservedLineIndex(currentLineIndex);
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(firstNonSpaceIndex >= 0 ? firstNonSpaceIndex : 0);
        setTypedChars([]);
      } else {
        // If no next line, finish typing test
        onTypingComplete();
      }
      return;
    }

    if (
      charIndex === currentLine.length - 1 &&
      currentLineIndex === lines.length - 1
    ) {
      // Check if the last character of the last line is typed (e.g., semicolon)
      onTypingComplete(); // Trigger completion
    }
  };

  return (
    <div
      ref={typingContainerRef}
      tabIndex={0}
      onKeyDown={handleTyping}
      className=" relative w-full overflow-hidden outline-none flex flex-col justify-center items-center "
    >
      <div className="typing-container typing-line transition-all duration-500 text-xl px-6 sm:text-xl md:text-2xl font-mono text-gray-300">
        {preservedLineIndex !== null &&
          preservedLineIndex < currentLineIndex && (
            <div className="">
              {lines[preservedLineIndex].split("").map((char, index) => (
                <span key={index} className="text-gray-500">
                  {char}
                </span>
              ))}
            </div>
          )}

        {lines
          .slice(currentLineIndex, currentLineIndex + 6)
          .map((line, lineIndex) => (
            <div
              key={lineIndex}
              className={`typing-line transition-all duration-500 text-xs px-6 sm:text-sm md:text-xl lg:text-2xl font-mono text-gray-300`}
            >
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
                      isCursor && cursorVisible ? "bg-gray-600 text-black" : ""
                    }`}
                  >
                    {char}
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
