import React from 'react';

function Button({
    children,
    type = "button",
    bgColor = "bg-cyan-500",
    hoverBgColor = "hover:bg-cyan-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button className={`px-4 py-1  text-xl rounded-lg transition-all ${bgColor} ${hoverBgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
  )
};

export default Button;