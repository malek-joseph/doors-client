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

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  required,
    autocomplete,
}) => (
  <div className="mb-4">
    <label className="block text-xs mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      className="border p-1 w-full rounded-md text-xs p-2"
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required
      autoComplete={autocomplete}
    />
  </div>
);

export default Input;
