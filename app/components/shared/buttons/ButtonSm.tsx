
import Image from 'next/image'

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  onClick?: () => void;
  size?: number; // New property for image size
};

const ButtonSm = ({ type, title, icon, variant, onClick, size = 18 }: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="rounded-full overflow-hidden">
      <button
        type={type}
        className={`flexCenter gap-3 rounded w-10 ${variant}`}
        onClick={handleClick} // Call handleClick on button click
      >
        {icon && (
          <div className="rounded-full overflow-hidden">
            <Image
              src={icon}
              alt={title}
              width={size}
              height={size}
              className="rounded-full"
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
            />
          </div>
        )}
        <label className="hover:cursor-pointer text-sm">{title}</label>
      </button>
    </div>
  );
};

export default ButtonSm;