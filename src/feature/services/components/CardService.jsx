import React from "react";

const CardService = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-5">
      <img
        className="rounded-xl shadow-md max-h-48 object-cover mb-4"
        src={service.imagen}
        alt="Imagen del servicio"
      />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{service.name}</h2>
      <p className="text-gray-600 mb-4">{service.description}</p>
      {service.price && (
        <p className="text-highlight text-lg">Valor: ${service.price}</p>
      )}
    </div>
  );
};

export default CardService;
