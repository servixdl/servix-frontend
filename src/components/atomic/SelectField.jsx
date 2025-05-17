import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
  disabled = false,
  onClick,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onClick={onClick}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400
        ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}
      `}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option
          key={option.value ?? option.id}
          value={option.value ?? option.id}
        >
          {option.label ?? option.nombre}
        </option>
      ))}
    </select>
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SelectField;
