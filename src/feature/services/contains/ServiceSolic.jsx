import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ServiceSolic() {
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
        const data = [
          {
            id_servicio: 1,
            nombre_servicio: "Clases de guitarra",
            tipo_servicio: "Educación",
            descripcion: "Curso intensivo para principiantes",
            fecha_venta: "2025-05-14",
            total: 30000,
          },
          {
            id_servicio: 2,
            nombre_servicio: "Paseo de mascotas",
            tipo_servicio: "Mascotas",
            descripcion: "Paseo de perros diario por 1 hora",
            fecha_venta: "2025-05-13",
            total: 10000,
          },
        ];

        setServicios(data);
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
              <th className="px-4 py-2 ">Tipo</th>
              <th className="px-4 py-2 ">Descripción</th>
              <th className="px-4 py-2 ">Fecha</th>
              <th className="px-4 py-2 ">Total</th>
              <th className="px-4 py-2 ">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {servicios.map((s) => (
              <tr key={s.id_servicio} className="hover:bg-gray-50">
                <td className="px-4 py-2 ">{s.nombre_servicio}</td>
                <td className="px-4 py-2 ">{s.tipo_servicio}</td>
                <td className="px-4 py-2 ">{s.descripcion}</td>
                <td className="px-4 py-2 ">{s.fecha_venta}</td>
                <td className="px-4 py-2 ">${s.total}</td>
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
