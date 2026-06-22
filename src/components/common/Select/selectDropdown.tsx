"use client";
import React, { useMemo, useRef, useState } from "react";
import cn from "classnames";

export interface Option {
  label: string;
  value: string | number;
}

interface SelectDropdown {
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
  id?: string;
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
  value?: string | any;
  /**
   * Error of Input
   */
  error?: string;
  /**
   * Options of select
   */
  options?:
    | Record<string, string>
    | Array<{ label: string; value: string | number }>; // (Title => key)
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
  /**
   * Sort
   */
  sort?: boolean;
  /**
   * Optional click handler
   */
  copyable?: boolean;

  onChange?: (value: any) => void;
  onBlur?: () => void;
  showHistory?: () => void;
}

const SelectDropdown: React.FC<SelectDropdown> = ({
  disabled = false,
  readOnly = false,
  tooltip = "",
  id = "",
  title = "",
  name = "",
  value = "",
  error = "",
  options = [],
  className = "",
  prefix = "",
  required = false,
  hasDefaultOption = false,
  defaultOptionText = "- Select -",
  history = false,
  sort = false,
  copyable = false,
  onChange = () => {},
  onBlur = () => {},
  showHistory = () => {},
  ...props
}) => {
  const classNames = [
    "block",
    "px-2.5",
    "py-3",
    "w-full h-full",
    "text-[15px]",
    "text-gray-900",
    "disabled:opacity-100",
    disabled ? "bg-gray-100" : "bg-transparent",
    readOnly ? "cursor-not-allowed" : "",
    "outline-none",
    "focus:outline-none",
    "focus:ring-0",
    "peer",
    "rounded-lg",
    "dark:bg-form-input",
    prefix.length > 0 && "pl-7",
    disabled && "cursor-not-allowed",
  ];
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  if (value === null) value = "";

  const renderOptions = useMemo(() => {
    let rlt: any = [];
    if (Array.isArray(options)) {
      let _options = options;
      if (sort) {
        _options = options.sort(function (a, b) {
          return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
        });
      }
      _options.map((option) => {
        rlt.push(
          <option
            key={`${title}-${option.value}`}
            value={option.value}
            // selected={option.value == value}
          >
            {option.label}
          </option>,
        );
      });
    }

    if (!Array.isArray(options)) {
      let _options: any = [];
      Object.keys(options).map((key) => {
        _options.push({
          key: key,
          value: options[key],
        });
      });
      if (sort) {
        _options = _options.sort(function (a: any, b: any) {
          return a.value.toLowerCase().localeCompare(b.value.toLowerCase());
        });
      }
      _options.map((item: any) => {
        rlt.push(
          <option
            key={`${title}-${item.key}`}
            value={item.key}
            selected={item.key == value}
          >
            {item.value}
          </option>,
        );
      });
    }
    return rlt;
  }, [options, value]);

  const changeSelect = (event: any) => {
    onChange(event.target.value);
    setTimeout(() => {
      if (document.activeElement === inputRef.current) {
        inputRef?.current?.blur();
      }
    }, 250);
  };

  const inputRef = useRef<HTMLSelectElement>(null);

  return (
    <div
      className={cn(
        "group relative z-20 mx-auto h-full rounded-lg pr-2 dark:bg-form-input",
        "border border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",
        {
          "border-rose-700": error,
        },
      )}
    >
      <select
        name={name}
        value={value}
        disabled={disabled || readOnly}
        onChange={changeSelect}
        ref={inputRef}
        onBlur={onBlur}
        required={required}
        {...props}
        // className={cn(
        //   `relative z-20 w-full rounded border border-stroke bg-transparent px-4 py-3  outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input lg:px-2 ${
        //     isOptionSelected ? "text-black dark:text-white" : ""
        //   }`,
        //   className,
        // )}
        // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        className={cn(classNames.join(" "), className)}
      >
        <option value="">{defaultOptionText}</option>
        {renderOptions}
      </select>
    </div>
  );
};

export default SelectDropdown;
