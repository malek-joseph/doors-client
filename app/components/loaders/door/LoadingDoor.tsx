/** @format */

// components/LoadingDoor.tsx

import React from "react";

interface LoadingDoorProps {
  size?: number;
}

const LoadingDoor: React.FC<LoadingDoorProps> = ({ size = 100 }) => {
  const doorStyle = {
    height: `${size}px`,
    width: `${size / 1.2}px`, // Adjust width to be more narrow
  };

  return (
    <div
      className="flex justify-center items-center relative"
      style={doorStyle}>
      <div className="relative w-full h-full bg-teal-600">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-teal-700"></div>
        <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-yellow-500 border border-yellow-600 rounded-full"></div>
      </div>
      <div
        className="absolute w-full h-full border-4 border-teal-600 border-opacity-50 rounded animate-rotate-square"
        style={{
          animationDuration: "2s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}></div>
    </div>
  );
};

export default LoadingDoor;
