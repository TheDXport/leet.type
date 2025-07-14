import React from "react";
import { IBM_Plex_Mono, Azeret_Mono, Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret-mono",
  weight: ["400", "500", "600", "700"],
});

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
    <div className="flex flex-col items-center justify-center space-y-12 md:mr-72 mx-auto p-4">
      <div
        className={`${geist.className} text-[#ffffff] text-3xl sm:text-5xl font-bold flex items-center relative underline underline-offset-8 `}
      >
        Results
      </div>
      <div
        className={`${azeretMono.className} font-medium text-xl sm:text-3xl flex flex-col items-center text-white space-y-10 relative md:right-10`}
      >
        <div className=" justify-center ">
          <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
            <h2 className="">problem \ language</h2>
          </div>
          <div>
            <h1 className="text-6xl text-white">
              {algorithmName} \ {programmingLanguage}{" "}
            </h1>
          </div>
        </div>

        <div className="flex justify-center gap-x-12 sm:gap-x-24 mr-auto items-start flex-wrap">
          <div className="w-40 sm:w-56">
            <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
              <h2>speed</h2>
            </div>
            <div>
              <h1 className="text-6xl text-white">
                {((wpm * accuracy) / 100).toFixed(0)}wpm
              </h1>
            </div>
          </div>

          <div className="w-40 sm:w-56">
            <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
              <h2>time/word</h2>
            </div>
            <div className="text-6xl text-white">{timePerWord.toFixed(1)}s</div>
          </div>

          <div>
            <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
              <h2>characters</h2>
            </div>
            <div className="text-6xl text-white">{totalChars}</div>
          </div>
        </div>

        <div className="flex justify-center gap-x-12 sm:gap-x-24 mr-auto flex-wrap">
          <div className="w-40 sm:w-56">
            <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
              <h2>accuracy</h2>
            </div>
            <div className="text-6xl text-white">{accuracy.toFixed(0)}%</div>
          </div>

          <div className="w-40 sm:w-56">
            <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
              <h2>Σ time</h2>
            </div>
            <div className="text-6xl text-white">
              {totalTimeSpent.toFixed(1)}s
            </div>
          </div>

          <div>
            <div className={`${ibmPlexMono.className}  text-[#646475] italic`}>
              <h2>errors made</h2>
            </div>
            <div className="text-6xl text-white">{errorCount}</div>
          </div>
        </div>
      </div>
      <div
        className={`${ibmPlexMono.className} text-[#646464] font-medium top-14 relative`}
      >
        <span className="italic">tab + enter</span> to restart
      </div>
    </div>
  );
};

export default Results;
