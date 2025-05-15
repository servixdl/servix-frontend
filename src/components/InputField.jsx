import React from "react";
import PropTypes from "prop-types";

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>

    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputField;
