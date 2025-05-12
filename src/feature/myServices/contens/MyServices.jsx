import UseMyService from "../hooks/UseMyService";
import MyServiceCard from "../components/MyServicesCard";
import { useState } from "react";

export default function MyServices() {
  const { loading, myServices } = UseMyService();
  const [services, setServices] = useState(myServices); 
  
  const handleEdit = (service) => {
    alert(`Editar servicio: ${service.nombre}`);
    // Abrir modal o redirigir
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este servicio?")) {
      const updated = services.filter((s) => s.id_servicio !== id);
      setServices(updated);
    }
  };

  const handleCreate = () => {
    alert("Crear nuevo servicio");
  };

  // Mostrar loading si está cargando
  if (loading) return <div className="p-6">Cargando servicios...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Mis Servicios</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Crear nuevo servicio
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Descripción</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6">Imagen</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {myServices.map((service) => (
              <tr
                key={service.id_servicio}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6">{service.nombre}</td>
                <td className="py-3 px-6">{service.descripcion}</td>
                <td className="py-3 px-6">
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(service.precio)}
                </td>
                <td className="py-3 px-6">
                  <img
                    src={service.imagen}
                    alt="imagen"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id_servicio)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {myServices.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No hay servicios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
