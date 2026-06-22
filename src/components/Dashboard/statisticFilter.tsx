"use client";
import React from "react";

import SelectDropdown, { Option } from "../common/Select/selectDropdown";
import CustomDateInput from "../common/Input/CustomDateInput";

const StatisticsFilter: React.FC = () => {
    const options: Option[] = [
        { value: "", label: "Tier 1" },
        { value: "country1", label: "Country 1" },
        { value: "country2", label: "Country 2" },
        { value: "country3", label: "Country 3" },
        { value: "country4", label: "Country 4" },
    ];
    const branchOptions: Option[] = [
        { value: "", label: "Tier 2" },
        { value: "country1", label: "Country 1" },
        { value: "country2", label: "Country 2" },
        { value: "country3", label: "Country 3" },
        { value: "country4", label: "Country 4" },
    ];
    const leafOptions: Option[] = [
        { value: "", label: "Tier 3" },
        { value: "country1", label: "Country 1" },
        { value: "country2", label: "Country 2" },
        { value: "country3", label: "Country 3" },
        { value: "country4", label: "Country 4" },
    ];
    const lineOptions: Option[] = [
        { value: "", label: "30 lines" },
        { value: "country1", label: "10 lines" },
        { value: "country2", label: "20 lines" },
        { value: "country3", label: "30 lines" },
        { value: "country4", label: "40 lines" },
    ];
    const levelOptions: Option[] = [
        { value: "", label: "Level" },
        { value: "country1", label: "Basic Level" },
        { value: "country2", label: "VIP Level" },
        { value: "country3", label: "Premium Level" },
    ];
    const regDateOption: Option[] = [
        { value: "", label: "Register Date" },
        { value: "country1", label: "Register Date" },
        { value: "country2", label: "Register Date" },
        { value: "country3", label: "Register Date" },
        { value: "country4", label: "Register Date" },
    ];
    const memberIdOption: Option[] = [
        { value: "", label: "Member ID" },
        { value: "12345", label: "12345" },
        { value: "678901", label: "678901" },
        { value: "23456", label: "23456" },
        { value: "789012", label: "789012" },
    ];

    return (
        <div className="grid grid-cols-12 columm gap-x-2  md:gap-x-2 mb-3">
            {/* <div className="col-span-12 xl:col-span-2"> <SelectDropdown options={options} /></div>
            <div className="col-span-12 xl:col-span-2">
            <SelectDropdown options={branchOptions} />
            </div>
            <div className="col-span-12 xl:col-span-2">
            <SelectDropdown options={leafOptions} />
            </div>
            <div className="col-span-12 xl:col-span-1">
            <SelectDropdown options={lineOptions} />
            </div>
            <div className="col-span-12 xl:col-span-1">
            <SelectDropdown options={levelOptions} />
            </div>
            <div className="col-span-12 xl:col-span-2">
            <CustomDateInput placeholder="Register date" />
            </div>
            <div className="col-span-12 xl:col-span-2">
            <SelectDropdown options={memberIdOption} />
            </div> */}
        
        </div>

    );
};

export default StatisticsFilter;
