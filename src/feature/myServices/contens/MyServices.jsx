import React, { useEffect } from "react";
import ApiService from "../../../apiServices/ApiService";
import UseMyService from "../hooks/UseMyService";
import { useState } from "react";
import CreateServiceModal from "../components/modalNewService";
import EditServiceModal from "../components/ModalUpdateService";
import { toast } from "react-toastify";
import Button from "../../../components/atomic/Button";
import Swal from "sweetalert2";
export default function MyServices() {
  const { loading, myServices } = UseMyService();
  const [services, setServices] = useState(myServices);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setServices(myServices);
  }, [myServices]);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setServices(myServices);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el servicio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await ApiService.delete(id);
        setServices((prev) => prev.filter((s) => s.id_servicio !== id));
        toast.success("Servicio eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
        toast.error("Error al eliminar el servicio");
      }
    }
  };

  const handleCreate = (newService) => {
    setServices((prev) => [...prev, newService]);
  };

  // Mostrar loading si está cargando
  if (loading) return <div className="p-6">Cargando servicios...</div>;

  return (
    <div className="max-w-7xl mx-auto my-20 px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Mis Servicios</h1>
        <div>
          <Button onClick={() => setShowModal(true)}>
            Crear nuevo servicio
          </Button>
        </div>
      </div>

      <CreateServiceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleCreate}
      />

      <EditServiceModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        service={selectedService}
        onUpdate={handleUpdate}
      />

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
            {services.map((service) => (
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
            {services.length === 0 && (
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
