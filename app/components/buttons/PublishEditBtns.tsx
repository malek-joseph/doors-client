// ButtonGroup.tsx
import React from 'react';
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor"

interface ButtonGroupProps {
  onEditClick: () => void;
  onPublishClick: () => void;
  loading: boolean;

}

const PublishEditBtns: React.FC<ButtonGroupProps> = ({ onEditClick, onPublishClick, loading }) => {
console.log(loading)

  return (
    <div className="flex w-full justify-between fixed inset-x-0 bottom-0 py-6 border-t-2 border-teal-500 bg-white  ">
      <button
        className={`bg-gray-500 min-w-[100px] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-auto
        ${loading ? "cursor-not-allowed" : ""}`}
        onClick={onEditClick}>
        Edit
      </button>
      <button
        className={`min-w-[150px] flexCenter  text-white font-bold py-2 px-4 rounded mx-auto ${
          loading ? "bg-teal-100 hover:bg-teal-100 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-700"
        }`}
        onClick={onPublishClick}
        disabled={loading}>
        {!loading ? "Publish" : <LoadingDoor size={20} />}
      </button>
    </div>
  );
};

export default PublishEditBtns;
