// components/PhotoUpload.tsx
import React, { ChangeEvent } from 'react'; // Corrected import

interface PhotoUploadProps {
  onPhotoSelect: (files: FileList | null) => void;
  onPhotoUpload: (files: FileList) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoSelect, onPhotoUpload }) => {

const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  // Call the onPhotoSelect prop with the files from the event target
  if (onPhotoSelect) {
    onPhotoSelect(event.target.files);
  }
};

  const handleUpload = () => {
    const fileInput = document.getElementById("photo-upload") as HTMLInputElement;
    if (fileInput.files) {
      onPhotoUpload(fileInput.files);
    }
  };
  
  
return (
  <div className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center">
    <div className="mb-3">
      <p className="font-semibold text-gray-900 mb-1">
        Show off your property!
      </p>
      <p className="text-gray-600">
        Let potential roommates know you&apos;re for real and that your room is
        their best option.
      </p>
    </div>
    <button
      className="bg-white text-teal-600 px-4 py-2 rounded shadow hover:bg-teal-300 hover:text-white transition-all"
      onClick={handleUpload}>
      Add photos
    </button>
    <input
      id="photo-upload"
      type="file"
      multiple
      onChange={handleFileInputChange}
      className="hidden"
    />
    <p className="text-gray-500 text-xs mt-3">
      For your safety, please don&apos;t upload images of the front of your
      home.
    </p>
  </div>
);
}

export default PhotoUpload;
