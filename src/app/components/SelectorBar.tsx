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
    <div className="flex justify-center space-x-7 px-7 sm:px-7 md:px-14 py-2 bg-gray-800 text-gray-200 rounded-2xl shadow hover:-gray-700 my-3">
      <button
        className="text-md flex-col flex justify-center"
        onClick={onAlgorithmClick}
      >
        {selectedAlgorithm}
      </button>
      <div className="flex flex-col justify-center text-gray-900 text-2xl font-black">
        <h1>|</h1>
      </div>
      <div className="flex space-x-1">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => onLanguageSelect(language)}
            className={` px-3 md:px-4 rounded-lg shadow ${
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
