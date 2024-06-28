// components/TextArea.tsx
import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, placeholder, onChange }) => {
  const handleContextMenu = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-lg font-medium text-gray-700">{label}</label>
      <textarea
        className="w-full p-4 border-2 min-h-[250px] border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        placeholder={placeholder}
        value={value}
        onContextMenu={handleContextMenu}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextArea;
