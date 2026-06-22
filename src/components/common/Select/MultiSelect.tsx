"use client";
import React, { useMemo, useRef, useState } from "react";
import { CustomCheckbox } from "../Checkbox/CustomCheckBox";

export interface Option {
  label: string;
  value: string | number;
}

interface MultiSelect {
  /**
   * Is Full
   */
  full?: boolean;
  /**
   * Is disabled
   */
  disabled?: boolean;
  /**
   * Is readOnly
   */
  readOnly?: boolean;
  /**
   * Tooltip of Input
   */
  tooltip?: string;
  /**
   * Id of Input
   */
  id: string;
  /**
   * Title of Input
   */
  title?: string;
  /**
   * Name of Input
   */
  name?: string;
  /**
   * Value of Input
   */
  value?: Array<string>;
  /**
   * Error of Input
   */
  error?: string;
  /**
   * Options of select
   */
  options?: Array<{ label: string; value: string | number }>; // (Title => key)
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Required
   */
  required?: boolean;
  /**
   * Has default option - 'SELECT'
   */
  hasDefaultOption?: boolean;
  /**
   * Default option text
   */
  defaultOptionText?: string;
  /**
   * Optional history handler
   */
  /**
   * Prefix
   */
  prefix?: string;
  /**
   * Show History
   */
  history?: boolean;

  sort?: boolean;

  defaultSelected?: boolean;

  additionalElements?: JSX.Element | null;

  placeholder?: string;
  /**
   * Optional click handler
   */
  onChange?: (value: any) => void;
  onBlur?: () => void;
  showHistory?: () => void;
}

const MultiSelect: React.FC<MultiSelect> = ({
  disabled = false,
  readOnly = false,
  tooltip = "",
  title = "",
  value = [],
  error = "",
  options = [],
  className = "",
  prefix = "",
  required = false,
  history = false,
  sort = false,
  defaultSelected = true,
  additionalElements = null,
  placeholder = "",
  onChange = () => {},
  onBlur = () => {},
  showHistory = () => {},
  ...props
}) => {
  const classNames = [
    "appearance-none",
    "rounded-lg",
    "px-4 lg:px-2",
    "py-3",
    "h-full",
    "w-full",
    "text-[15px]",
    "text-gray-900",
    "disabled:opacity-100",
    disabled ? "bg-gray-100" : "bg-white",
    readOnly ? "cursor-not-allowed" : "",
    "border",
    "border-stroke",
    "bg-transparent",
    "focus:outline-none",
    "focus:ring-0",
    "active:border-primary",
    "dark:border-form-strokedark",
    "dark:bg-form-input",
    "transition",
    "focus:border-primary",
    "dark:text-white text-black",
    "peer",
    prefix.length > 0 && "pl-7",
    error && "border-rose-700",
    disabled && "cursor-not-allowed",
  ];
  const [isShowDropDown, setShowDropDown] = useState(false);
  const [lastValue, setLastValue] = useState<Array<string>>([]);

  const onVisibleDropDown = (isOpen: boolean) => {
    setShowDropDown(isOpen);
    if (isShowDropDown != isOpen && onBlur && !isOpen) {
      const curVal = value.sort();
      const lastVal = lastValue.sort();
      if (JSON.stringify(curVal) != JSON.stringify(lastVal)) onBlur();
    }
    if (isOpen) setLastValue([...value]);
  };

  if (value === null) value = [];

  let keys = options.map((option) => option.value);
  if (sort) keys = keys.sort();

  const isAllSelected = useMemo(
    () => keys.length === value.length,
    [value, keys],
  );

  const onChangeValue = (key: string | number, v: boolean) => {
    const newValue = [...value];
    if (v) {
      newValue.push(String(key));
    } else {
      const pos = newValue.indexOf(String(key));
      newValue.splice(pos, 1);
    }
    onChange(newValue);
  };

  const onSelectAll = () => {
    if (!isAllSelected) {
      const newValue = options.map((option) => option.value);
      onChange(newValue);
      return;
    }
    onChange([]);
  };

  return (
    <div className="input-container h-full">
      <div className={`group group relative w-full ${className}`}>
        <button
          className={classNames.join(" ")}
          onClick={() => onVisibleDropDown(!isShowDropDown)}
        >
          <p className="h-[23px] overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-left">
            {value.length == 0 && placeholder}
            {value
              .map(
                (val) =>
                  options.find((option) => option.value === val)?.label || "",
              )
              .join(", ")}
          </p>
        </button>
        {isShowDropDown && (
          <div
            className="absolute z-40 w-full border border-stroke bg-white p-2 shadow dark:border-form-strokedark dark:bg-boxdark"
            onMouseLeave={() => onVisibleDropDown(false)}
          >
            <button
              className="text-shade-blue mb-1 ml-1 text-sm underline"
              onClick={onSelectAll}
            >
              {isAllSelected ? "Unselect All" : "Select All"}
            </button>
            <div className="max-h-72 overflow-y-auto">
              {options.map((option, key) => (
                <div key={key} className="ml-1">
                  <CustomCheckbox
                    title={option.label}
                    value={value.includes(String(option.value))}
                    onChange={(value) => onChangeValue(option.value, value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="pl-1 pt-[1px] text-[13px] text-rose-700 peer-invalid:visible">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
