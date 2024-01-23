/** @format */

import React, { ChangeEvent } from "react";

interface SelectInputProps {
  label: string;
  name: string;
  value: string | undefined;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => (
  <div className="mt-4 flex flex-col items-start w-full">
    <label htmlFor={name} className="block text-lg font-medium text-gray-700">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
