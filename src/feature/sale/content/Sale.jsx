import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../../apiServices/ApiService";
import ApiSales from "../../../apiServices/ApiSales";
import ApiAppointment from "../../../apiServices/ApiAppointment";
export default function Sale() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [fechaCita, setFechaCita] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [mensaje, setMensaje] = useState("");
  const rut = sessionStorage.getItem("rut");
  useEffect(() => {
    const fetchService = async () => {
      const response = await ApiService.getById(id);
      setService(response);
    };
    fetchService();
  }, [id]);

  const handleAppointment = async () => {
    try {
      const ventaData = {
        usuario_id: rut,
        servicio_id: service.id_servicio,
        fecha_venta: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        total: service.precio,
      };
      console.log(ventaData);
      const responseSale = await ApiSales.create(ventaData);

      const citaData = {
        venta_id: responseSale.id_venta,
        servicio_id: service.id_servicio,
        fecha_cita: fechaCita,
        hora_inicio: horaInicio,
        hora_termino: horaTermino,
        usuario_id: rut,
        estado: "pendiente",
      };
      console.log(citaData);
      await ApiAppointment.create(citaData);

      setMensaje("Cita y venta creadas exitosamente.");
    } catch (error) {
      setMensaje("Ocurrió un error al crear la cita."), error;
    }
  };

  if (!service) return <p className="text-center text-lg">Cargando...</p>;
  return (
    <div className="p-4 max-w-6xl mx-auto">
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
          <p className="text-highlight text-2xl mb-6">${service.precio}</p>

          {/* Inputs para cita */}
          <div className="mb-4 space-y-2">
            <label className="block">
              Fecha de la cita:
              <input
                type="date"
                value={fechaCita}
                onChange={(e) => setFechaCita(e.target.value)}
                className="input"
              />
            </label>
            <label className="block">
              Hora inicio:
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="input"
              />
            </label>
            <label className="block">
              Hora término:
              <input
                type="time"
                value={horaTermino}
                onChange={(e) => setHoraTermino(e.target.value)}
                className="input"
              />
            </label>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary" onClick={handleAppointment}>
              Agendar y Comprar
            </button>
            <button className="btn-outline">Valorar servicio</button>
          </div>

          {/* Mensaje */}
          {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}
