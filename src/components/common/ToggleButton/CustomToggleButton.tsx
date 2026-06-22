import { useRef } from "react";

interface ToggleButtonProps {
  /**
   * Id of Input
   */
  id?: string;
  /**
   * Which one is selected
   */
  value?: boolean;
  /**
   * button label
   */
  label?: string[];
  /**
   * optional title
   */
  title?: string;
  /**
   * How large should the button be?
   */
  size?: "sm" | "md" | "lg";
  /**
   * Is disabled
   */
  disabled?: boolean;
  /**
   * Error of Input
   */
  error?: string;
  /**
   * Optional history handler
   */
  history?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Show text on left
   */
  textLeft?: boolean;
  /**
   * Optional click handler
   */
  onChange?: (checked: any) => void;
  onBlur?: () => void;
  showHistory?: () => void;
}

export const ToggleButton = ({
  id = "",
  label = ["Yes", "No"],
  title,
  size = "sm",
  disabled = false,
  error = "",
  history = false,
  value,
  className = "",
  textLeft = false,
  onChange = () => {},
  onBlur = () => {},
  showHistory = () => {},
}: ToggleButtonProps) => {
  const classes1 = [
    // `border border-primary`,
    value === true ? `bg-primary text-white` : `text-gray-900`,
    `font-${size}`,
    `text-${size}`,
    "px-2",
    "py-1.5",
    "rounded-lg items-center justify-center",
    "w-11",
    "h-9",
    disabled && "cursor-not-allowed",
  ];
  const classes2 = [
    // `border border-primary`,
    // `border-l-0`,
    value === false ? `bg-primary text-white` : `text-gray-900`,
    `font-${size}`,
    `text-${size}`,
    "px-2",
    "py-1.5",
    "rounded-lg items-center justify-center",
    "w-11",
    "h-9",
    disabled && "cursor-not-allowed",
  ];

  const textComponent = (
    <span
      className={`${textLeft ? "mr" : "ml"}-3 text-gray-900 dark:text-gray-300 flex-auto text-[14.5px] font-medium`}
    >
      {title}
    </span>
  );

  const changeValue = (value: boolean) => {
    onChange(value);
    setTimeout(() => {
      inputRef?.current?.click();
    }, 250);
  };

  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${className}`} id={id}>
      <div className={`group relative flex items-center`}>
        {textLeft ? textComponent : null}
        <div className="flex">
          <button
            type={"button"}
            className={classes1.join(" ")}
            disabled={disabled}
            onClick={() => changeValue(true)}
          >
            <span>{label[0]}</span>
          </button>
          <button
            type={"button"}
            className={classes2.join(" ")}
            disabled={disabled}
            onClick={() => changeValue(false)}
          >
            <span>{label[1]}</span>
          </button>
        </div>
        {!textLeft ? textComponent : null}
      </div>
      <div ref={inputRef} className="hidden" onClick={onBlur} />
      {error && (
        <p className="pl-1 pt-[1px] text-[13px] text-rose-700 peer-invalid:visible">
          {error}
        </p>
      )}
    </div>
  );
};
