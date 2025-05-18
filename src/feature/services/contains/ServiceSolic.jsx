import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiBitacora from "../../../api/ApiBitacora";

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
        const res = await ApiBitacora.getBitacoraServicios(user.rut);
        setServicios(res);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      }
    };

    fetchServicios();
  }, [user, navigate]);

  const handleCancelar = async (id) => {
    try {
      await ApiBitacora.cancelarCita(id);
      setServicios((prev) =>
        prev.map((s) => (s.id_cita === id ? { ...s, estado_cita: "cancelada" } : s))
      );
    } catch (error) {
      console.error("Error al cancelar cita:", error);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await ApiBitacora.eliminarCita(id);
      setServicios((prev) => prev.filter((s) => s.id_cita !== id));
    } catch (error) {
      console.error("Error al borrar cita:", error);
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Servicios Solicitados</h2>

      {servicios.length === 0 ? (
        <p className="text-gray-600">No has solicitado servicios aún.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Servicio</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id_cita || s.id_venta} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{s.nombre_servicio}</td>
                <td className="px-4 py-2 border">{s.tipo_servicio}</td>
                <td className="px-4 py-2 border">{s.descripcion}</td>
                <td className="px-4 py-2 border">{s.fecha_venta}</td>
                <td className="px-4 py-2 border">${s.total}</td>
                <td className="px-4 py-2 border capitalize">{s.estado_cita || "sin cita"}</td>
                <td className="px-4 py-2 border space-x-2">
                  {s.estado_cita !== "cancelada" && (
                    <button
                      onClick={() => handleCancelar(s.id_cita)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    onClick={() => handleBorrar(s.id_cita)}
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
