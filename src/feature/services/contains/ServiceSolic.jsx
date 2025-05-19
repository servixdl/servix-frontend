import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiTransaction from "../../../apiServices/ApiTransaction";
import dateFormat from "../../../utils/FormatDate";
function ServiceSolic() {
  const rut = sessionStorage.getItem("rut")
  const { user } = useAuth();
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    if (!user?.rut) {
      navigate("/login");
      return;
    }

    const fetchServicios = async () => {
      try {
        // const res = await axios.get(`/api/usuarios/${user.rut}/servicios-solicitados`);
        // setServicios(res.data);

        // Simulación temporal sin backend:
        const dataService = await ApiTransaction.getByRut(rut)
        console.log(dataService)
        
        setServicios(dataService);
      } catch (error) {
        console.error(
          "Error al obtener servicios solicitados (simulado):",
          error
        );
      }
    };

    fetchServicios();
  }, [user, navigate]);
  
  const handleCancelar = async (id) => {
    try {
      await axios.put(`/api/ventas/${id}/cancelar`);
      setServicios((prev) => prev.filter((s) => s.id_servicio !== id));
    } catch (error) {
      console.error("Error al cancelar servicio:", error);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await axios.delete(`/api/ventas/${id}`);
      setServicios((prev) => prev.filter((s) => s.id_servicio !== id));
    } catch (error) {
      console.error("Error al borrar servicio:", error);
    }
  };

  return (
    <div className="p-6 overflow-x-auto max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Servicios Solicitados</h2>

      {servicios.length === 0 ? (
        <p className="text-gray-600">No has solicitado servicios aún.</p>
      ) : (
        <table className="min-w-full bg-white  -gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="px-4 py-2 ">Servicio</th>
              <th className="px-4 py-2 ">Descripción</th>
              <th className="px-4 py-2 ">Fecha</th>
              <th className="px-4 py-2 ">Total</th>
              <th className="px-4 py-2 ">Estado</th>
              <th className="px-4 py-2 ">Acciones</th>
              
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {servicios.map((s) => (
              <tr key={s.id_cita} className="hover:bg-gray-50">
                <td className="px-4 py-2 ">{s.nombre}</td>
                <td className="px-4 py-2 ">{s.descripcion}</td>
                <td className="px-4 py-2 ">{dateFormat(s.fecha_venta)}</td>
                <td className="px-4 py-2 ">${s.total}</td>
                 <td className="px-4 py-2 ">{s.estado}</td>
                <td className="px-4 py-2  space-x-2">
                  <button
                    onClick={() => handleCancelar(s.id_servicio)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleBorrar(s.id_servicio)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ServiceSolic;
