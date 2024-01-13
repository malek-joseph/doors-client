// Spinner.tsx
import React from "react";
import "./Spinner.css"; // Import the stylesheet

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20 }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="spinner" style={style}>
      <div className="spinner-circle" />
    </div>
  );
};

export default Spinner;
