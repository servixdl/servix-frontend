import { useAuth } from "../../../context/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Switch } from "@headlessui/react";
import regionesData from "../../../Json/regiones-comunas.json";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PerfilUsuario() {
  const { user } = useAuth();

  const [direccion, setDireccion] = useState("");
  const [regionSeleccionada, setRegionSeleccionada] = useState("");
  const [comunas, setComunas] = useState([]);
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagen, setImagen] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ofrecerServicio, setOfrecerServicio] = useState(false);
  const [oficio, setOficio] = useState("");
  const [experiencia, setExperiencia] = useState("");

  const inputRef = useRef();
  const direccionRef = useRef();

  const regiones = regionesData.regiones || [];

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const edad = calcularEdad(user?.fecha_nacimiento);
  const primerNombre = user?.nombre?.split(" ")[0];

  useEffect(() => {
    const region = regiones.find((r) => r["región"]?.trim() === regionSeleccionada.trim());
    setComunas(region ? region.comunas : []);
  }, [regionSeleccionada]);

  const handleImageClick = () => {
    if (imagen) {
      handleRemoveImage();
    } else {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file);
    } else {
      toast.error("Solo se permiten archivos de imagen.");
      inputRef.current.value = null;
    }
  };

  const handleRemoveImage = () => {
    setImagen(null);
    inputRef.current.value = null;
  };

  const handleTelefonoChange = (e) => {
    const valor = e.target.value;
    const soloNumeros = valor.replace(/\D/g, "");
    setTelefono(soloNumeros);
  };

  const camposCompletos = direccion && regionSeleccionada && comunaSeleccionada && telefono;

  const handleSubmit = () => {
    if (!camposCompletos) {
      toast.warning("Debes llenar todos los campos");
      return;
    }
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setBloqueado(true);
    }, 2000);
  };

  const handleEditar = () => {
    setBloqueado(false);
    setTimeout(() => direccionRef.current?.focus(), 100);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="border border-gray-700 p-6 rounded-lg shadow-lg w-full max-w-xl text-center bg-white">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          ¡Bienvenido a Servix, {primerNombre}!
        </h1>

        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {imagen ? (
              <img src={URL.createObjectURL(imagen)} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <UserCircleIcon className="w-20 h-20 text-gray-500" />
            )}
          </div>
        </div>

        <div className="flex justify-center mb-6 gap-2">
          <button
            onClick={handleImageClick}
            className={`text-sm px-3 py-1 rounded cursor-pointer ${imagen ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white`}
          >
            {imagen ? "Quitar imagen" : "Subir imagen"}
          </button>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleImageChange}
          />
        </div>

        <p><strong>Nombre:</strong> {user?.nombre}</p>
        <p><strong>RUT:</strong> {user?.rut}</p>
        <p><strong>Edad:</strong> {edad} años</p>

        <div className="text-left mt-6">
          <label className="block mb-1 font-semibold">Dirección:</label>
          <input
            ref={direccionRef}
            type="text"
            className="w-full px-3 py-2 border rounded mb-4"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingresa tu dirección"
            disabled={bloqueado}
          />

          <label className="block mb-1 font-semibold">Región:</label>
          <select
            className="w-full px-3 py-2 border rounded mb-4"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
            disabled={bloqueado}
          >
            <option value="">Selecciona una región</option>
            {regiones.map((region) => (
              <option key={region["región"]} value={region["región"].trim()}>
                {region["región"].trim()}
              </option>
            ))}
          </select>

          <label className="block mb-1 font-semibold">Comuna:</label>
          <select
            className="w-full px-3 py-2 border rounded mb-4"
            value={comunaSeleccionada}
            onChange={(e) => setComunaSeleccionada(e.target.value)}
            disabled={!comunas.length || bloqueado}
          >
            <option value="">Selecciona una comuna</option>
            {comunas.map((comuna) => (
              <option key={comuna} value={comuna.trim()}>
                {comuna.trim()}
              </option>
            ))}
          </select>

          <label className="block mb-1 font-semibold">Teléfono:</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border rounded mb-6"
            value={telefono}
            onChange={handleTelefonoChange}
            placeholder="Ingresa tu número de teléfono"
            disabled={bloqueado}
          />

          <div className="flex items-center mb-4">
            <Switch
              checked={ofrecerServicio}
              onChange={setOfrecerServicio}
              className={`${ofrecerServicio ? "bg-green-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full mr-3`}
              disabled={bloqueado}
            >
              <span className="sr-only">Ofrecer servicio</span>
              <span
                className={`${ofrecerServicio ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <span className="font-semibold">Ofrecer servicio</span>
          </div>

          {ofrecerServicio && (
            <>
              <label className="block mb-1 font-semibold">Oficio:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded mb-4"
                value={oficio}
                onChange={(e) => setOficio(e.target.value)}
                placeholder="Ingresa tu oficio"
                disabled={bloqueado}
              />

              <label className="block mb-1 font-semibold">Mensaje:</label>
              <textarea
                className="w-full px-3 py-2 border rounded mb-4"
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                placeholder="Comenta brevemente tu experiencia"
                disabled={bloqueado}
              />
            </>
          )}

          <div className="flex justify-between gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full cursor-pointer flex items-center justify-center gap-2"
              disabled={bloqueado || enviando}
            >
              {enviando && <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>}
              Guardar cambios
            </button>

            <button
              onClick={handleEditar}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full cursor-pointer"
              disabled={!bloqueado}
            >
              Editar
            </button>
          </div>

          {enviando && (
            <p className="mt-2 text-sm text-gray-600">Enviando datos...</p>
          )}
        </div>
      </div>
    </div>
  );
}