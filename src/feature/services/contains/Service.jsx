import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ApiSales from "../../../apiServices/ApiSales";
import { useAuth } from "../../../context/AuthContext";

export default function ServicePage() {
  const { oficio } = useParams();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ApiSales.getByOficio(oficio);
        setServices(response);
      } catch (error) {
        console.error("Error al buscar por oficio:", error);
        setServices([]);
      }
    };

    if (oficio) fetchServices();
  }, [oficio]);

  const handleSolicitarServicio = (rut) => {
    if (!user) {
      setShowModal(true);
    } else {
      window.location.href = `/sale/${rut}`;
    }
  };

  if (!services.length) {
    return (
      <p className="text-center text-lg mt-10">
        No se encontraron servicios para "{oficio}"
      </p>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
        Resultados para: {oficio}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.rut}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center"
          >
            <img
              src={`http://localhost:3000/uploads/${service.imagen}`}
              alt={service.nombre}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{service.nombre}</h2>
            <p className="text-sm text-indigo-600">{service.oficio}</p>
            <p className="text-sm text-gray-600 mt-2">{service.experiencia || "Sin experiencia registrada"}</p>

            <button
              onClick={() => handleSolicitarServicio(service.rut)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-full"
            >
              Solicitar servicio
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Inicia sesión
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Debes iniciar sesión para poder solicitar este servicio.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <Link to="/login" className="btn-primary">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
