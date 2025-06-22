import React from "react";
import { colors } from "../../utilities/color";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  width?: string;
};

const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  width,
}) => {
  if (!isOpen) return null;

  let classname="bg-white rounded-lg shadow-lg w-full relative p-4 mt-4 animate-open-modal";
  switch (width) {
    case "1/2":
      classname=`md:w-1/2 ${classname}`
      break;
    case "2/3":
      classname=`md:w-2/3 ${classname}`
      break;
  
    default:
      break;
  }
  /*const classname =
    width === "50%"
      ? `bg-white rounded-lg shadow-lg w-full md:w-1/2 relative p-4 mt-4 animate-open-modal`
      : `bg-white rounded-lg shadow-lg w-full relative p-4 mt-4 animate-open-modal`;*/

  return (
    <div
      className={`fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 opacity-100`}
    >
      <div className={classname}>
        {showCloseButton && (
          <button
            className="absolute top-2 right-2 text-gray-200 hover:text-white text-4xl w-16 h-16"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}
        {title && (
          <header className={`w-full p-2 mb-2 rounded-md ${colors.cyan}`}>
            <h2 className="text-center text-white font-bold text-sm md:text-base">
              {title}
            </h2>
          </header>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalForm;
