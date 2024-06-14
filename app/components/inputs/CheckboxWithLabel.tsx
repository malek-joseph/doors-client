/** @format */

// components/CheckboxWithLabel.tsx
import React from "react";

interface CheckboxWithLabelProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="flex items-center ml-4 space-x-2 cursor-pointer mb-3 w-full">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="hidden"
    />
    <div
      className={`w-4 h-4 flex items-center justify-center border border-gray-300 rounded focus:ring-teal-500 cursor-pointer ${
        checked ? "bg-teal-500 border-teal-500" : "bg-white"
      }`}>
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
    <span className="text-gray-600 text-sm">{label}</span>
  </label>
);

export default CheckboxWithLabel;
