import React, { useId } from "react";

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      className = "",
      inputClassName = "",
      labelClassName = "",
      placeholder,
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className={`block mb-2 text-sm font-medium text-black ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2.5 rounded-lg
            border border-gray-300 bg-white text-black
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300
            transition-colors duration-200 ease-in-out
            ${inputClassName}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
