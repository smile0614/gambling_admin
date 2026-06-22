"use client";
import React from "react";
import SelectDropdown, { Option } from "../common/Select/selectDropdown";
import CustomInput from "../common/Input/CustomInput";
import CustomDateInput from "../common/Input/CustomDateInput";

const WagerRewardsFilter: React.FC = () => {
  const lineOptions: Option[] = [
    { value: "", label: "Display 30 List" },
    { value: "40", label: "Display 40 List" },
    { value: "50", label: "Display 50 List" },
    { value: "60", label: "Display 60 List" },
  ];
  return (
    <div className="columm mb-3 grid grid-cols-12  gap-x-2 gap-y-2">
      <div className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2 ">
        <CustomDateInput placeholder="From date" />
      </div>

      <div className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2 ">
        <CustomDateInput placeholder="To date" />
      </div>
      <div className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2 ">
        {/* <SelectDropdown options={lineOptions} /> */}
      </div>

      <div className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2 ">
        <CustomInput type="text" placeholder="Search" icon={<SearchIcon />} />
      </div>
    </div>
  );
};

export default WagerRewardsFilter;

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
