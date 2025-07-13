import React from "react";

interface ResultsProps {
  algorithmName: string;
  programmingLanguage: string;
  originalContent: string; // Full content of the algorithm from the markdown file
  typedContent: string; // Full content typed by the user
  totalTimeSpent: number; // Total time spent typing (in seconds)
}

// Count characters excluding leading indentation spaces on each line
const countNonIndentChars = (content: string): number => {
  return (
    content
      .split("\n")
      .map((line) => line.replace(/^\s+/, ""))
      .join("\n").length - 1
  );
};

const Results: React.FC<ResultsProps> = ({
  algorithmName,
  programmingLanguage,
  originalContent,
  typedContent,
  totalTimeSpent,
}) => {
  // Split content into words for WPM calculation
  const originalWords = originalContent.split(/\s+/);
  const wordCount = originalWords.length;

  // Count all characters except indentation spaces
  const totalChars = countNonIndentChars(originalContent);

  // Calculate WPM
  const wpm = wordCount / ((totalTimeSpent * 10) / 60);
  console.log("WPM" + wpm);

  // Compare characters for accuracy and errors
  const originalChars = originalContent.split("");
  const typedChars = typedContent.split("");

  let correctChars = 0;
  let errorCount = 0;

  originalChars.forEach((char, index) => {
    if (typedChars[index] === char) {
      correctChars++;
    } else if (typedChars[index] !== undefined) {
      console.log(
        `Mismatch at index ${index}: Expected '${char}' (${char.charCodeAt(
          0
        )}), Got '${typedChars[index]}' (${typedChars[index]?.charCodeAt(0)})`
      );
      errorCount++;
    }
  });
  console.log("Correct" + correctChars);
  console.log("Error count" + errorCount);
  console.log("originalchars:" + originalChars);

  // Calculate Accuracy
  const accuracy = (correctChars / (originalChars.length - 1)) * 100;
  console.log("A" + accuracy);

  // Calculate Time Per Word
  const timePerWord = (totalTimeSpent * 10) / wordCount;

  return (
    <div className="results-container flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold">Results</h1>
      <div className="text-lg mt-4">
        <p>
          <strong>Algorithm Name:</strong> {algorithmName}
        </p>
        <p>
          <strong>Total Characters:</strong> {totalChars}
        </p>
        <p>
          <strong>Programming Language:</strong> {programmingLanguage}
        </p>
        <p>
          <strong>Total Time Spent:</strong> {(totalTimeSpent * 10).toFixed(2)}{" "}
          seconds
        </p>
        <p>
          <strong>WPM:</strong> {wpm.toFixed(0)}
        </p>
        <p>
          <strong>Accuracy:</strong> {accuracy.toFixed(0)}%
        </p>
        <p>
          <strong>Time Per Word:</strong> {timePerWord.toFixed(2)} seconds
        </p>
        <p>
          <strong>Total Errors:</strong> {errorCount}
        </p>
      </div>
    </div>
  );
};

export default Results;
