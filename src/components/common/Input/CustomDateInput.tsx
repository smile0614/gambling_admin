"use client";
import React, { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDateInputProps
  extends Omit<ReactDatePickerProps, "selected" | "onChange"> {
  value?: string;
  onDateChange?: (date: Date | null) => void;
  placeholder?: string;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  value = Date.now(),
  onDateChange,
  placeholder = "",
  ...restProps
}) => {
  const handleDateChange = (date: Date | null) => {
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <DatePicker
      selected={new Date(value)}
      onChange={handleDateChange}
      {...restProps}
      placeholderText={placeholder}
      showIcon
      toggleCalendarOnIconClick
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z"
          />
        </svg>
      }
      className={` z-20 w-full  rounded-lg border border-stroke bg-transparent px-4 py-6 outline-none transition autofill:bg-form-input focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
    />
  );
};

export default CustomDateInput;
