interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
  label: string;
}

import React, { ButtonHTMLAttributes, FC } from "react";

const ButtonElement: FC<IButtonProps> = ({ type, className, isLoading, label }: IButtonProps) => {
  return (
    <button type={type} className={`${className} text-center rounded-lg hover:opacity-80 duration-300`} disabled={isLoading}>
      {isLoading ? <span className="loading loading-dots loading-md"></span> : label}
    </button>
  );
};

export default ButtonElement;
