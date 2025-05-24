import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-black",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center
        px-5 py-2.5 rounded-lg font-medium text-sm
        ${bgColor} ${textColor}
        hover:bg-gray-900
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
        transition-colors duration-200 ease-in-out
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
