
import Image from 'next/image'
import Spinner from '../spinner/Spinner';

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  disabled?: boolean;
  onClick?: () => void;
};
 
const Button = ({
  type,
  title,
  icon,
  variant,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`text-sm p-1 border rounded-md w-full flex items-center justify-center mt-4  ${variant}`}
      disabled={disabled} onClick={onClick}>
      {icon && (
        <div className="w-6 h-6 mr-2">
          <Image src={icon} alt="title" width={24} height={24} />
        </div>
      )}
      <label className="hover:cursor-pointer">
        {disabled ? <Spinner size={20} /> : title}
      </label>
    </button>
  );
};

export default Button