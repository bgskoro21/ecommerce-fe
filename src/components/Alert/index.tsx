import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface IAlertComponent {
  icon: IconProp;
  message: string;
  type: string;
}

const Alert: FC<IAlertComponent> = ({ icon, message, type }) => {
  return (
    <div role="alert" className={`alert ${type} flex`}>
      <FontAwesomeIcon icon={icon} className="h-6 w-6 text-white" />
      <span className="text-white text-sm lg:text-base">{message}</span>
    </div>
  );
};

export default Alert;
