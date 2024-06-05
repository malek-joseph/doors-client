/** @format */

import React from "react";

interface PreferenceOptionsProps {
  options: string[];

  onSelect: (option: string) => void;
  selectedPreference: string;
}

const PreferenceOptions: React.FC<PreferenceOptionsProps> = ({
    options,

  onSelect,
  selectedPreference,
}) => {
 

  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`w-full p-4 my-2 text-center transition-all ${
            selectedPreference === option
              ? "bg-teal-400 text-white"
              : "bg-transparent text-black"
          } rounded-lg border-2 border-gray-300 `}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default PreferenceOptions;
