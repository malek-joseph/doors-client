/** @format */

// FreeToMessage.tsx
import React from "react";

interface FreeToMessageProps {
  name: string;
  placeOrPerson?: string;
  city?: string;
  governance?: string;
}

const FreeToMessage: React.FC<FreeToMessageProps> = ({  name, placeOrPerson, city, governance }) => {
  return (
    <div className="flex justify-between mb-2 items-center">
      <h2 className="text-xl font-semibold text-gray-600">
        {placeOrPerson === "person" && name}
        {placeOrPerson === "place" && (
          <div>
           {city}, {governance}
          </div>
        )}
      </h2>
    
    </div>
  );
};

export default FreeToMessage;
