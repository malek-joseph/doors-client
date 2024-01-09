/** @format */

// FreeToMessage.tsx
import React from "react";

interface AgeAndPlaceProps {
  age?: string;
  gender?: string;
  governance: string;
  city: string;
  type: string;
  list?: string;
  name: string;

}

const AgeAndPlace: React.FC<AgeAndPlaceProps> = ({ age, gender, city,governance, type, list, name  }) => {
  return (
          <div className="flex flex-col">
              <div className="text-gray-600 text-sm">
                {type === "person" && <div>{age} year old {gender}</div>}
                {type === "place" && <div>{list}</div>}
              </div>
            {type === "person" &&   <div className="text-teal-500">
                {" "}
                <span className="text-sm text-gray-500">Looking in:</span>{" "}
                {governance}, {city}
              </div>}
              {type === "place" && <p className="text-teal-500">
               
                <span className="text-sm text-gray-500">Listed by: {" "}</span>
                {name}
              </p>}
            </div>
  
  );
};

export default AgeAndPlace;
