"use client";
import CustomDateInput from "../common/Input/CustomDateInput";
import CustomInput from "../common/Input/CustomInput";
import MultiSelect from "../common/Select/MultiSelect";
import SelectDropdown from "../common/Select/selectDropdown";

interface FilterProps {
  data: Array<{
    type: "select" | "text" | "datepicker" | "multiselect";
    value: string | number | any;
    setValue: (value: string | number | any) => void;
    placeholder?: string;
    options?: Array<{ label: string; value: string | number }>;
    options1?: Array<string> | Record<string, string>;
  }>;
}

export default function Filters({ data }: FilterProps) {
  return (
    <div className="columm mb-3 grid grid-cols-12  gap-x-2 gap-y-2">
      {data.map((filter, index) => (
        <div
          key={index}
          className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2 "
        >
          {filter.type === "select" && (
            <SelectDropdown
              options={filter.options}
              value={filter.value}
              onChange={filter.setValue}
            />
          )}

          {filter.type === "text" && (
            <CustomInput
              type="text"
              placeholder={filter.placeholder}
              value={filter.value}
              onChange={filter.setValue}
            />
          )}

          {filter.type === "datepicker" && (
            <CustomDateInput
              value={filter.value}
              onDateChange={filter.setValue}
              showTimeSelect
              placeholder={filter.placeholder}
              dateFormat={"yyyy-MM-dd HH:mm:ss"}
            />
          )}

          {filter.type === "multiselect" && (
            <MultiSelect
              options={filter.options}
              placeholder={filter.placeholder}
              className="h-full"
              value={filter.value}
              onChange={filter.setValue}
              id="filterbox"
            />
          )}
        </div>
      ))}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2 "></div>
    </div>
  );
}
