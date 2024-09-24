import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface IAlertComponent {
  icon: IconProp;
  message: string;
}

const Alert: FC<IAlertComponent> = ({ icon, message }) => {
  return (
    <div role="alert" className="alert alert-error flex">
      <FontAwesomeIcon icon={icon} className="h-6 w-6 text-white" />
      <span className="text-white">{message}</span>
    </div>
  );
};

export default Alert;
