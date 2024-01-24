// components/CheckboxWithLabel.tsx
import React from 'react';
import { Checkbox } from "@nextui-org/react";


interface CheckboxWithLabelProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void; // Callback to handle change
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
      className="form-checkbox h-3 w-3 border-gray-300 rounded focus:ring-teal-500 checkbox"
    />
    <span className="text-gray-600 text-sm">{label}</span>
  </label>

);

export default CheckboxWithLabel;
