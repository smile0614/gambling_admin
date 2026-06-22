import React from "react";
import SelectDropdown, { Option } from "../common/Select/selectDropdown";

interface TierCardProps {
  tierTitle: string;
  dropdownOptions: Option[];
  onButtonClick?: (value: String) => void;
  popupTitle: string;
}

const TierCard: React.FC<TierCardProps> = ({
  tierTitle,
  dropdownOptions,
  onButtonClick,
  popupTitle
}) => {
  return (
    <div className="relative rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="absolute right-6 top-6 flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {onButtonClick && (
          <button
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={()=> onButtonClick(popupTitle) }
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H20M12 4V20"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-2 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {tierTitle}
          </h4>
        </div>
      </div>

      <div className="mt-8">
        <SelectDropdown options={dropdownOptions} />
      </div>
    </div>
  );
};

export default TierCard;
