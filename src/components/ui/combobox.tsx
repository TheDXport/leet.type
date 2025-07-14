"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

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
  const [closing, setClosing] = useState(false);
  const [filter, setFilter] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setClosing(true);
    setOpen(false);
    setTimeout(() => setClosing(false), 200);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeMenu]);

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const menuId = React.useId();

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu() : setOpen(true))}
        className={`w-auto flex text-center justify-between items-center px-1 py-1 sm:text-lg md:text-xl interactive-item ${
          open ? "active" : ""
        }`}
      >
        {value || placeholder}
      </button>
      {(open || closing) && (
        <div
          id={menuId}
          className={`absolute mt-1 w-auto bg-[#0e0e0e] shadow z-10 ${
            open ? "dropdown-animation" : "dropdown-close-animation"
          }`}
        >
          <input
            placeholder="Search..."
            className="h-9 w-full border-b border-[#303030] px-2 outline-none text-sm bg-black"
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
                    closeMenu();
                    setFilter("");
                  }}
                  className={`px-4 py-2 text-sm flex items-center  ${
                    value === option ? "text-white" : "text-[#c8c7c7]"
                  } hover:text-black hover:bg-[#e6e6e6] cursor-pointer transition-all duration-200`}
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
              <div className="px-4 py-2 text-sm text-gray-500">
                No option found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Combobox;
