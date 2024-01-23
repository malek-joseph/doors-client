// components/PhotoUpload.tsx
import React from 'react';

interface PhotoUploadProps {
  onPhotoSelect: (files: FileList | null) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoSelect }) => (
  <div className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center">
    <div className="mb-3">
      <p className="font-semibold text-gray-900 mb-1">
        Show off your property!
      </p>
      <p className="text-gray-600">
        Let potential roommates know you&apos;re for real and that your room is their best option.
      </p>
    </div>
    <button
      className="bg-white text-teal-600 px-4 py-2 rounded shadow hover:bg-teal-300 hover:text-white transition-all"
      onClick={() => document.getElementById("photo-upload")?.click()}>
      Add photos
    </button>
    <input
      id="photo-upload"
      type="file"
      multiple
      onChange={(e) => onPhotoSelect(e.target.files)}
      className="hidden"
    />
    <p className="text-gray-500 text-xs mt-3">
      For your safety, please don&apos;t upload images
      of the front of your home.
    </p>
  </div>
);

export default PhotoUpload;
