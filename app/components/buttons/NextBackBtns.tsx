// ButtonGroup.tsx
import React from 'react';
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor"

interface ButtonGroupProps {
  onBackClick?: () => void;
  onNextClick?: () => void;
  isNextDisabled?: boolean;
  loading?: boolean;
}

const NextBackBtns: React.FC<ButtonGroupProps> = ({ onBackClick, onNextClick, isNextDisabled, loading }) => {


  return (
    <div className="flex w-full justify-between z-20 fixed inset-x-0 bottom-0 py-6 border-t-2 border-teal-500 bg-white  ">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-auto"
        onClick={onBackClick}>
        Back
      </button>
      <button
        className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mx-auto ${
          isNextDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } 
        ${loading ? "cursor-not-allowed bg-teal-100" :""}
        `}
        onClick={onNextClick}
        disabled={isNextDisabled}>
        {!loading ? "Next" : <LoadingDoor size={20} />}
      </button>
    </div>
  );
};

export default NextBackBtns;
