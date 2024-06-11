// components/TextArea.tsx

import React, { ChangeEvent } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Type your message..."
      className="border border-gray-300 p-2 rounded-md w-full h-32 resize-none"
    />
  );
};

export default TextArea;
