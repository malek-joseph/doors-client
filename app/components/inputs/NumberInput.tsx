// components/Input.tsx
import React from 'react';

interface InputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autocomplete?: string;
}

const NumberInput: React.FC<InputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  required,
  autocomplete,
}) => (
  <div className="mb-4 w-full ">
    <label className="block text-gray-900 mb-1 " htmlFor={id}>
      {label}
    </label>
    <div className="flex items-center">
      <input
        className="border w-full rounded-l-md text-xs p-2 focus:outline-none focus:ring focus:ring-teal-400"
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autocomplete}
      />
      <span className="bg-gray-200 text-gray-700 text-xs p-2 rounded-r-md border border-l-0">
        EGP
      </span>
    </div>
  </div>
);

export default NumberInput;
