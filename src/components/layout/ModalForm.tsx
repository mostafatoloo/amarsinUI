import React from "react";
import { colors } from "../../utilities/color";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
};

const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full relative p-4 mt-12">
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
          <header
            className={`w-full p-3 mb-4 rounded-md ${colors.cyan}`}
          >
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
