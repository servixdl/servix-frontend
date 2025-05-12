import React from "react";
import PropTypes from "prop-types";
// import formatToChileanPeso from "../../../utils/FormatNumber"; // Importa la utilidad

const CardService = ({ service }) => {
  return (
   <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center">
      <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-gray-200 shadow-sm">
        <img
          src={`http://localhost:3000/uploads/${service.imagen}`}
          alt={`Perfil de ${service.nombre}`}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">{service.nombre}</h2>
      <p className="text-sm text-indigo-600 font-medium mt-1">{service.oficio}</p>

      <div className="mt-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md shadow-inner w-full text-sm text-gray-700 leading-relaxed">
        {service.experiencia || "Sin experiencia registrada."}
      </div>

      <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded-full shadow-sm text-sm cursor-pointer ">
        Solicitar servicio
      </button>
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
