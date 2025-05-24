import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-black"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg
            border border-gray-300 bg-white text-black
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            transition-colors duration-200 ease-in-out
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
