/** @format */

import Image from "next/image";
import { ReactNode } from "react";


type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: ReactNode;
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
      className={`text-sm p-1 border rounded-md w-max flex items-center justify-center  ${variant}`}
      disabled={disabled}
      onClick={onClick}>
            <label className="hover:cursor-pointer">
        {disabled ? <div>loading</div> : title}
      </label>
      {icon && <div className="ml-2 hidden md:block lg:block">{icon}</div>}
  
    </button>
  );
};

export default Button;
