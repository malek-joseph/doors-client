/** @format */

// FreeToMessage.tsx
import React from "react";

interface FreeToMessageProps {
  freeMessage: string;
  name: string;
  type: string;
  city: string;
  governance: string;
}

const FreeToMessage: React.FC<FreeToMessageProps> = ({ freeMessage, name, type, city, governance }) => {
  return (
    <div className="flex justify-between mb-2 items-center">
      <h2 className="text-xl font-semibold text-gray-600">
        {type === "person" && name}
        {type === "place" && (
          <div>
           {city}, {governance}
          </div>
        )}
      </h2>
      <p className="text-gray-500 text-xs border border-gray-500 rounded p-1">
        {freeMessage}
      </p>
    </div>
  );
};

export default FreeToMessage;
