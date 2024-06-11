// ButtonGroup.tsx
import React from 'react';

interface ButtonGroupProps {
  onEditClick: () => void;
  onPublishClick: () => void;

}

const PublishEditBtns: React.FC<ButtonGroupProps> = ({ onEditClick, onPublishClick }) => {


  return (
    <div className="flex w-full justify-between fixed inset-x-0 bottom-0 py-6 border-t-2 border-teal-500 bg-white  ">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-auto"
        onClick={onEditClick}>
        Edit
      </button>
      <button
        className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mx-auto`}
        onClick={onPublishClick}
    >
        Publish
      </button>
    </div>
  );
};

export default PublishEditBtns;
