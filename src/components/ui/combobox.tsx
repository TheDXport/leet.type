import React, { useState } from "react";

interface ComboboxProps {
  options: string[];
  onSelect: (value: string) => void;
  value: string;
}

const Combobox: React.FC<ComboboxProps> = ({ options, onSelect, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (option: string) => {
    setInputValue(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="text-xs md:text-lg px-2 md:px-4 rounded-lg border border-gray-300 focus:outline-none"
      />
      {open && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
          {filtered.map((option) => (
            <div
              key={option}
              onMouseDown={() => handleSelect(option)}
              className={`px-4 py-2 text-sm hover:bg-gray-100 ${option === value ? "bg-gray-200" : ""}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Combobox;
