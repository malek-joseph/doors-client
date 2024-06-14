

type NumericValue = number | string; // This allows both numbers and strings

interface NumericSelectorProps {
  title: string;
  range: NumericValue[]; // Use the NumericValue type here
  selectedNumber: NumericValue; // And also here
  onSelectNumber: (value: NumericValue) => void; // Ensure the function parameter type matches
}

const NumericSelector: React.FC<NumericSelectorProps> = ({
  title,
  range,
  selectedNumber,
  onSelectNumber,
}) => {
  return (
    <div className="flex flex-col items-start w-full mt-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {title}
      </label>
      <div className="flex space-x-2">
        {range.map((value, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-md ${
              selectedNumber === value
                ? "bg-teal-500 text-white"
                : "bg-white border-gray-300"
            }`}
            onClick={() => onSelectNumber(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumericSelector;
