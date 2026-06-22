import { InputConvert } from "@/utils/convertor";
import React, { InputHTMLAttributes, useRef } from "react";
import cn from "classnames";

interface CustomTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * What background color to use
   */
  // color?: Color;
  label?: string;
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
   * Is autofocus
   */
  autoFocus?: boolean;
  /**
   * Title of Input
   */
  title?: string;
  /**
   * Placeholder of Input
   */
  placeholder?: string;
  /**
   * Name of Input
   */
  name?: string;
  /**
   * Value of Input
   */
  value?: string | number | any;
  /**
   * Font Size of Input
   */
  fontSize?: number;
  /**
   * Error of Input
   */
  error?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Is has icon
   */
  hasIcon?: boolean;
  /**
   * Is has icon
   */
  required?: boolean;
  /**
   * Icon component
   */
  icon?: string | JSX.Element | null;
  /**
   * Prefix
   */
  prefix?: string;
  /**
   * onChange
   */
  history?: boolean;

  additionalElements?: JSX.Element | null;

  onBlurNull?: boolean;

  copyable?: boolean;

  onChange?: (e: any) => void; // string | React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void;
  showHistory?: () => void;
  onKeyPress?: (e: any) => void;
  onIcon?: () => void;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  color = "sky",
  disabled = false,
  readOnly = false,
  tooltip = "",
  autoFocus = false,
  type = "text",
  title = "",
  placeholder = " ",
  name = "",
  value = "",
  fontSize = 15,
  error = "",
  className = "",
  hasIcon = false,
  icon = null,
  prefix = "",
  history = false,
  required = false,
  additionalElements = null,
  onBlurNull = true,
  copyable = false,
  onChange = () => {},
  onBlur = () => {},
  showHistory = () => {},
  onIcon = () => {},
  ...inputProps
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const changeInput = (e: any) => {
    let _value = e.target.value;
    if (type.toLowerCase() === "email") _value = _value.trim().toLowerCase();
    onChange(_value);
    if (!onBlurNull) {
      setTimeout(() => {
        if (document.activeElement === inputRef.current) {
          if (inputRef?.current?.value === InputConvert({ type }, _value)) {
            inputRef?.current?.blur();
          }
        }
      }, 5000);
    }
  };

  return (
    <div className="w-full ">
      {label && (
        <label className="text-gray-700 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          {...inputProps}
          autoComplete="off"
          autoSave="off"
          name={name}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          ref={inputRef}
          required={required}
          onChange={changeInput}
          onBlur={onBlur}
          readOnly={readOnly}
          className={cn(
            `relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none transition autofill:bg-form-input focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white`,
            {
              "border-red-500": error,
              "pr-9": icon,
            },
            className,
          )}
        />

        {icon && (
          <div
            className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 hover:cursor-pointer"
            onClick={onIcon}
          >
            {icon}
          </div>
        )}

        {error && (
          <div className="text-red-500 flex items-center pr-3 text-red">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextArea;
