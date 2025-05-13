import PropTypes from "prop-types";

export const servicePropTypes = PropTypes.shape({
  imagen: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}).isRequired;
