/** @format */

// FreeToMessage.tsx
import React from "react";

interface AgeAndPlaceProps {
  age?: string;
  gender?: string;
  governance: string;
  city: string;

}

const AgeAndPlace: React.FC<AgeAndPlaceProps> = ({ age, gender, city,governance  }) => {
  return (
          <div className="flex flex-col">
              <p className="text-gray-600 text-sm">
                {age} year old {gender}
              </p>
              <p className="text-teal-500">
                {" "}
                <span className="text-sm text-gray-500">Looking in:</span>{" "}
                {governance}, {city}
              </p>
            </div>
  
  );
};

export default AgeAndPlace;
