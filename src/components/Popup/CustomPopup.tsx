import cn from "classnames";
import React, { useEffect, useRef } from "react";

interface CustomPopupProps {
  showModal: boolean;
  onClose: () => void;
  setShowModal: (showModal: boolean) => void;
  title: string;
  children: React.ReactNode;
  classNames?: string;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  showModal,
  onClose,
  title,
  children,
  setShowModal,
  classNames,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0  z-999 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={cn(
          "m-5 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark-2 dark:text-bodydark",
          classNames,
        )}
        ref={popupRef}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-title-md font-bold text-black dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default CustomPopup;
