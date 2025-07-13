'use client'

import React, { useState } from "react";

interface ComboboxProps {
  options: string[];
  onSelect: (value: string) => void;
  value: string;
  placeholder?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  onSelect,
  value,
  placeholder = "Select option...",
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const menuId = React.useId();

  return (
    <div className="relative">
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
        className="w-[200px] flex justify-between items-center border rounded px-2 py-1 text-xs md:text-lg"
      >
        {value || placeholder}
        <svg
          className="ml-auto opacity-50 w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div id={menuId} className="absolute mt-1 w-[200px] bg-white shadow rounded z-10">
          <input
            placeholder="Search..."
            className="h-9 w-full border-b px-2 outline-none text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="max-h-40 overflow-auto">
            {filtered.length ? (
              filtered.map((option) => (
                <div
                  key={option}
                  onMouseDown={() => {
                    onSelect(option);
                    setOpen(false);
                    setFilter("");
                  }}
                  className={`px-4 py-2 text-sm flex items-center hover:bg-gray-100 ${
                    value === option ? "bg-gray-200" : ""
                  }`}
                >
                  {option}
                  {value === option && (
                    <svg
                      className="ml-auto w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.04a.75.75 0 010 1.06l-7.35 7.35a.75.75 0 01-1.06 0L3.296 8.394a.75.75 0 111.06-1.06L8.5 11.478l6.144-6.144a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No option found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Combobox;
