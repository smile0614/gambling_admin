import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SelectDropdown, { Option } from "../common/Select/selectDropdown";
import AddTierPopup from "./AddTierPopup";
import CustomInput from "../common/Input/CustomInput";
import { ROLES } from "@/types";

interface TierTableFilterProps {
  type: ROLES
}

const TierTableFilter: React.FC<TierTableFilterProps> = ( { type = ROLES.TIER3 } ) => {
  const [addPopup, setAddPopup] = useState(false);
  const pathname = usePathname();

  const lineOptions: Option[] = [
    { value: "", label: "30 lines" },
    { value: "country1", label: "10 lines" },
    { value: "country2", label: "20 lines" },
    { value: "country3", label: "30 lines" },
    { value: "country4", label: "40 lines" },
  ];

  const sortOption: Option[] = [
    { value: "default", label: "Sort by: default" },
    { value: "asc", label: "Sort by: ASC" },
    { value: "dsc", label: "Sort by: DSC" },
  ];

  const handleOpenAddTier = () => {
    setAddPopup(true);
  };

  const handleCloseAddTier = () => {
    setAddPopup(false);
  };

  return (
    <div className="columm mb-3 grid grid-cols-12 gap-x-2 gap-y-2">
      {/* <div className="col-span-12 2xl:col-span-2 xl:col-span-3 md:col-span-4 ">
        <SelectDropdown options={lineOptions} />
      </div>

      <div className="col-span-12 2xl:col-span-2 xl:col-span-3 md:col-span-4 ">
        <SelectDropdown options={sortOption} />
      </div>
      <div className="col-span-12 2xl:col-span-2 xl:col-span-3 md:col-span-4 ">
        <CustomInput
          type="text"
          placeholder="Search"
          icon={<SearchIcon  />}
        />
      </div> */}
      <div className="col-span-12 xl:col-span-12">
        <div className="flex justify-end">
          <button
            onClick={() => handleOpenAddTier()}
            className="inline-block  w-full max-w-30 rounded-sm border border-indigo-600   bg-indigo-600 p-2 text-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {" "}
            Add Tier{" "}
          </button>
        </div>
      </div>
      {/* <AddTierPopup
        addPopup={addPopup}
        setAddPopup={setAddPopup}
        handleCloseAddTier={handleCloseAddTier}
        popupTitle={type}
      /> */}
    </div>
  );
};

export default TierTableFilter;

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="5.5" />
        <path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4" />
      </g>
    </svg>
  );
};
