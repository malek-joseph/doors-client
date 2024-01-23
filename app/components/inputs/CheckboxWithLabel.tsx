// components/CheckboxWithLabel.tsx
import React from 'react';

interface CheckboxWithLabelProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void; // Callback to handle change
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="form-checkbox h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
    />
    <span className="text-gray-900">{label}</span>
  </label>
);

export default CheckboxWithLabel;
