import React from "react";

interface NavbarProps {
  onAlgorithmClick: () => void;
  selectedAlgorithm: string;
  onLanguageSelect: (language: string) => void;
  selectedLanguage: string;
}

const selectorBar: React.FC<NavbarProps> = ({
  onAlgorithmClick,
  selectedAlgorithm,
  onLanguageSelect,
  selectedLanguage,
}) => {
  const languages = ["Java", "Python", "Javascript", "C++"];

  return (
    <div className="flex justify-center space-x-4 py-4">
      <button
        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow hover:bg-gray-700"
        onClick={onAlgorithmClick}
      >
        {selectedAlgorithm}
      </button>
      <div className="flex space-x-2">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => onLanguageSelect(language)}
            className={`px-4 py-2 rounded-lg shadow ${
              selectedLanguage === language
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-200"
            } hover:bg-gray-700`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default selectorBar;
