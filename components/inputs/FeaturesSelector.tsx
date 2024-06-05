/** @format */

import Image from "next/image";
import type { StaticImageData } from "next/image";

// Define a new type for the items including a name and an SVG path or component for the icon
type FeatureTypes = {
  name: string;
  src: StaticImageData; // Use the correct type for static images
};

interface FeatureSelectorProps {
  title: string;
  items: FeatureTypes[]; // The array of furnishing features
  selectedFeatures: string[]; // An array of the names of the selected features
  onSelectFeature: (name: string) => void; // The handler function for selecting a feature
}

// The modified selector component for furnishings
const FeaturesSelector: React.FC<FeatureSelectorProps> = ({
  title,
  items,
  selectedFeatures,
  onSelectFeature,
}) => {

    const isFeatureSelected = (name: string) => selectedFeatures?.includes(name);

  return (
    <div className="flex flex-col items-start w-full mt-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {title}
      </label>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            className="flex flex-col items-center justify-center"
            key={item.name}>
            <button
              className={`p-1 border rounded-full transition-all ${
                isFeatureSelected(item.name)
                  ? "bg-teal-200 text-white"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => onSelectFeature(item.name)}
              aria-label={item.name}>
              <div className="w-12 h-12 flex justify-center items-center p-1">
                <Image src={item.src} alt={item.name} width={60} height={60} />
              </div>
            </button>
            <div className="text-xs text-gray-500 font-extralight mt-3">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSelector;
