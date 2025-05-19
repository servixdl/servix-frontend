import React from "react";
import PropTypes from "prop-types";
import { BsWhatsapp } from "react-icons/bs";

const WhatsAppButton = ({ phone, message }) => {
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute bottom-20 right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-sm rounded px-3 py-1 shadow-lg">
        Contacto por WhatsApp
      </div>

      {/* Botón */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition duration-300 ease-in-out"
        aria-label="Contactar por WhatsApp"
      >
        <BsWhatsapp />
      </button>
    </div>
  );
};

WhatsAppButton.propTypes = {
  phone: PropTypes.string.isRequired,
  message: PropTypes.string,
};

WhatsAppButton.defaultProps = {
  message: "Hola, tengo una consulta",
};

export default WhatsAppButton;
