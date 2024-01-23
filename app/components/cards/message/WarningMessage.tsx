import Image from 'next/image';
import warning from '../../../../public/assets/images/warning.png'; 

const WarningMessage = () => {
  return (
    <div className="flex justify-center items-center space-x-2 bg-blue-100 text-gray-700 p-2 rounded-lg shadow-md">
      <div className="w-10 h-10 flexCenter">
        <Image src={warning} width={24} height={24} alt="warning" objectFit="contain" />
      </div>
      <span>
        Don&apos;t worry, other users can&apos;t see your exact location.
      </span>
    </div>
  );
};

export default WarningMessage;
