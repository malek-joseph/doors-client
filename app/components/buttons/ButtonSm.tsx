
import Image from 'next/image'

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  onClick? : () => void
};

const ButtonSm = ({ type, title, icon, variant, onClick }: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`flexCenter gap-3 rounded border  ${variant}`}
      onClick={handleClick} // Call handleClick on button click
    >
      {icon && (
       
          <Image src={icon} alt="title" width={18} height={18} />
    
      )}
      <label className="hover:cursor-pointer text-sm ">{title}</label>
    </button>
  );
};

export default ButtonSm;