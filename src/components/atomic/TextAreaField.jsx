import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  onClick,
  rows = 4,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      onClick={onClick}
      rows={rows}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400
        ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}
      `}
    />
  </div>
);

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  rows: PropTypes.number,
};

export default TextAreaField;
