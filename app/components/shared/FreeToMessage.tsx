/** @format */

// FreeToMessage.tsx
import React from "react";

interface FreeToMessageProps {
  freeMessage: string;
  name: string;
}

const FreeToMessage: React.FC<FreeToMessageProps> = ({ freeMessage, name }) => {
  return (
         <div className="flex justify-between mb-2 items-center">
            <h2 className="text-xl font-semibold text-gray-600">{name}</h2>
             <p className="text-gray-500 text-xs border border-gray-500 rounded p-1">
        {freeMessage}
      </p>
          </div>
  
  );
};

export default FreeToMessage;
