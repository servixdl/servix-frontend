import React from "react";
import PropTypes from "prop-types";
// import formatToChileanPeso from "../../../utils/FormatNumber"; // Importa la utilidad

const CardService = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-5">
      <img
        className="rounded-xl shadow-md max-h-48 object-cover mb-4"
        src={`http://localhost:3000/uploads/${service.imagen}`}
        alt="Imagen del servicio"
      />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{service.nombre}</h2>
      <p className="text-gray-600 mb-4">{service.oficio}</p>
      
        <p className="text-highlight text-lg">
         {service.experiencia}
        </p>
    
    </div>
  );
};

CardService.propTypes = {
  service: PropTypes.shape({
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    oficio: PropTypes.string.isRequired,
    experiencia: PropTypes.string,
  }).isRequired,
};

export default CardService;
