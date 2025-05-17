import React from "react";
import PropTypes from "prop-types";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const baseClass =
    "font-semibold py-2 px-4 rounded w-full flex items-center justify-center gap-2";
  const disabledClass = "opacity-60 cursor-not-allowed pointer-events-none";
  const enabledClass = "cursor-pointer";

  return (
    <button
      className={`
        ${baseClass}
        ${variantClass[variant]}
        ${disabled ? disabledClass : enabledClass}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
