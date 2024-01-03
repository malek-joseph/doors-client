
import Image from 'next/image'

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  onClick : () => void
};

const Button = ({ type, title, icon, variant, onClick }: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`text-sm p-1 border rounded-md w-full flex items-center justify-center  ${variant}`}
      onClick={handleClick} // Call handleClick on button click
    >
      {icon && (
        <div className="w-6 h-6 mr-2">
          <Image src={icon} alt="title" width={24} height={24} />
        </div>
      )}
      <label className="hover:cursor-pointer">{title}</label>
    </button>
  );
};

export default Button