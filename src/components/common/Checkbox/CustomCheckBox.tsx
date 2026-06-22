import { useRef } from "react";
import cn from "classnames";

interface CheckboxProps {
  /**
   * Is Full
   */
  full?: boolean;
  /**
   * Is disabled
   */
  disabled?: boolean;
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
  value?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  fontClass?: string;
  /**
   * Custom color
   */
  color?: string;
  /**
   * Custom size
   */
  size?: number;

  checked?: boolean;
  onClick?: () => void;

  /**
   * Optional click handler
   */
  /**
   * Optional history handler
   */

  readOnly?: boolean;
  history?: boolean;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
  showHistory?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const CustomCheckbox = ({
  disabled = false,
  id = "",
  title = "",
  name = "",
  color = "blue",
  size = 4,
  value = false,
  history = false,
  className = "",
  fontClass = "",
  onChange = () => {},
  onBlur = () => {},
  showHistory = () => {},
  readOnly,
  ...props
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const _onChange = (_checked: boolean) => {
    onChange(_checked);
    setTimeout(() => {
      if (document.activeElement === inputRef.current) {
        inputRef?.current?.blur();
      }
    }, 250);
  };

  const now = Date.now();
  return (
    <div className={`group group relative z-0 w-full ${className}`}>
      <div
        // htmlFor={`checkBox-${id}-${now}`}
        className="relative inline-flex min-h-5 cursor-pointer items-center"
        onClick={() => _onChange(!value)}
      >
        <input
          type="checkbox"
          id={`checkBox-${id}-${now}`}
          name={name}
          className={`w-${size} h-${size} ${disabled ? `text-blue-300` : `text-blue-600`} ${
            size >= 4 ? "rounded" : ""
          } ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600`}
          // defaultChecked={value}
          checked={value}
          disabled={disabled}
          readOnly={readOnly}
          // onChange={(event) => _onChange(value ? false : true)}
          ref={inputRef}
          onBlur={onBlur}
          {...props}
        />
        <span
          className={`ml-2 ${
            size >= 4 ? "text-sm" : "text-[13px]"
          } text-gray-900 dark:text-gray-300 font-medium ${fontClass}`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
