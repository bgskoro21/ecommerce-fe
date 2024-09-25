interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
}

import React, { ButtonHTMLAttributes, FC } from "react";

const ButtonElement: FC<IButtonProps> = ({ type, className, isLoading }: IButtonProps) => {
  return (
    <button type={type} className={`${className} text-center rounded-lg hover:opacity-80 duration-300`} disabled={isLoading}>
      {isLoading ? <span className="loading loading-dots loading-md"></span> : "LOGIN"}
    </button>
  );
};

export default ButtonElement;
