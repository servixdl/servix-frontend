import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import ApiTypesServices from "../../../apiServices/ApiTypesServices";
import ApiService from "../../../apiServices/ApiService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateServiceModal = ({ isOpen, onClose, onAdd }) => {
  const rut = sessionStorage.getItem("rut");
  const [tiposServicio, setTiposServicio] = useState([]);
  const [tipoServicioSeleccionado, setTipoServicioSeleccionado] = useState("");

  useEffect(() => {
    const fetchTipos = async () => {
      const data = await ApiTypesServices.getAll();
      setTiposServicio(data);
    };

    fetchTipos();
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.nombre ||
      !form.precio ||
      !form.imagen ||
      !form.descripcion ||
      !tipoServicioSeleccionado
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoServicio = {
      ...form,
      tipo_servicio_id: tipoServicioSeleccionado,
      usuario_id: rut,
    };

    try {
      await ApiService.create(nuevoServicio);
      toast.success("Servicio creado exitosamente!");
      onAdd(nuevoServicio);
      onClose();
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      toast.error("Error al crear el servicio.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Agregar nuevo servicio</h2>
      <p className="mb-2 text-sm text-gray-600">
        Completa los campos a continuación para crear tu servicio:
      </p>
      <div className="flex flex-col gap-3">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          name="nombre"
          placeholder="Nombre del servicio"
          className="border p-2 rounded"
          value={form.nombre}
          onChange={handleChange}
        />
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Descripción detallada del servicio"
          className="border p-2 rounded"
          value={form.descripcion}
          onChange={handleChange}
        />
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          name="precio"
          type="number"
          placeholder="Precio en CLP"
          className="border p-2 rounded"
          value={form.precio}
          onChange={handleChange}
        />
          <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
        <input
          name="imagen"
          placeholder="URL de la imagen"
          className="border p-2 rounded"
          value={form.imagen}
          onChange={handleChange}
        />
        <select
          value={tipoServicioSeleccionado}
          onChange={(e) => setTipoServicioSeleccionado(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Selecciona un tipo de servicio</option>
          {tiposServicio.map((tipo) => (
            <option key={tipo.id_tipo_servicio} value={tipo.id_tipo_servicio}>
              {tipo.tipo_servicio}
            </option>
          ))}
        </select>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateServiceModal;
