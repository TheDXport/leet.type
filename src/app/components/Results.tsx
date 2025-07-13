import React from "react";

interface ResultsProps {
  algorithmName: string;
  programmingLanguage: string;
  originalContent: string; // Full content of the algorithm from the markdown file
  totalTimeSpent: number; // Total time spent typing (in seconds)
  totalErrors: number;
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
  totalTimeSpent,
  totalErrors,
}) => {
  // Split content into words for WPM calculation
  const originalWords = originalContent.split(/\s+/);
  const wordCount = originalWords.length;

  // Count all characters except indentation spaces
  const totalChars = countNonIndentChars(originalContent);

  // Calculate WPM
  const wpm = wordCount / (totalTimeSpent / 60);

  const errorCount = totalErrors;

  // Calculate Accuracy based on total errors made during typing
  const accuracy = ((totalChars - errorCount) / totalChars) * 100;

  // Calculate Time Per Word
  const timePerWord = totalTimeSpent / wordCount;

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
          <strong>Total Time Spent:</strong> {totalTimeSpent.toFixed(2)}{" "}
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
      <pre className="mt-4 w-full overflow-auto bg-gray-800 p-4 rounded">
        <code className="whitespace-pre text-left text-sm">{originalContent}</code>
      </pre>
    </div>
  );
};

export default Results;
