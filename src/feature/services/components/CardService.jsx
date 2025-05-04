import React from 'react';

const CardService = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h2>
        <p className="text-gray-600">{service.description}</p>
        {/* Puedes agregar más información del servicio aquí */}
        {service.price && <p className="mt-4 text-blue-500 font-bold">Valor: ${service.price}</p>}
        {//service.image && <img src={service.image} alt={service.name} className="mt-4 rounded-md" />
        }
        {/* ... otros detalles ... */}
      </div>
    </div>
  );
};

export default CardService;