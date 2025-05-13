import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../../apiServices/ApiService";
import formatToChileanPeso from "../../../utils/FormatNumber";
import LoginModal from "../components/LoginModal";

export default function ServicePage() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const response = await ApiService.getById(id);
      setService(response);
    };
    fetchService();

    const userLoggedIn = Boolean(localStorage.getItem("userToken"));
    setIsLoggedIn(userLoggedIn);
  }, [id]);

  const handleRequestService = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      window.location.href = `/sale/${service.id_servicio}`;
    }
  };

  if (!service) return <p className="text-center text-lg">Cargando...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto my-10">
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-lg p-6">
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
            <button className="btn-primary" onClick={handleRequestService}>
              Solicitar servicio
            </button>
            <button className="btn-outline">Valorar servicio</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
