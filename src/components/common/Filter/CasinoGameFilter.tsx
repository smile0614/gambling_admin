import React from "react";

interface CasinoGameFilterProps {
  activeItem: string;
  sectionTitle: string;
  providers: string[];
  onItemClick: (item: string) => void;
}

const CasinoGameFilter: React.FC<CasinoGameFilterProps> = ({
  activeItem,
  providers,
  onItemClick,
  sectionTitle,
}) => {
  return (
    <div className=" rounded-sm border border-stroke bg-white p-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
        {sectionTitle}
      </h4>
      <div className="flex flex-wrap gap-2">
        {providers.map((provider) => (
          <button
            key={provider}
            className={` min-w-14 rounded-sm border p-2 py-1 text-center shadow-sm hover:text-white focus:outline-none ${
              activeItem === provider
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "text-indigo-600 hover:bg-indigo-500"
            }`}
            onClick={() => onItemClick(provider)}
          >
            {provider}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CasinoGameFilter;
