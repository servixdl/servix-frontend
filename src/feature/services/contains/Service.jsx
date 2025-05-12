import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import ApiService from "../../../apiServices/ApiService";
import formatToChileanPeso from "../../../utils/FormatNumber";
import { useAuth } from "../../../context/AuthContext";

export default function ServicePage() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchService = async () => {
      const response = await ApiService.getById(id);
      setService(response);
    };
    fetchService();
  }, [id]);

  const handleSolicitarServicio = () => {
    if (!user) {
      setShowModal(true);
    } else {
      // Redirigir al usuario a la página de solicitud de servicio
      window.location.href = `/sale/${service.id_servicio}`;
    }
  };

  if (!service) return <p className="text-center text-lg">Cargando...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto mt-20">
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <img
            className="rounded-xl shadow-md max-h-96 object-cover"
            src={service.imagen}
            alt="Imagen del servicio"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {service.nombre}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {service.descripcion}
          </p>
          <p className="text-highlight text-2xl mb-6">
            {formatToChileanPeso(service.precio)}
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary" onClick={handleSolicitarServicio}>
              Solicitar servicio
            </button>
            <button className="btn-outline">Valorar servicio</button>
          </div>
        </div>
      </div>

      {/* Modal */}
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
