import React from "react";
import PropTypes from "prop-types";

export default function FormLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
      {children}
    </div>
  );
}

FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
