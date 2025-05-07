import React from 'react';
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import regionesData from "../../../Json/regiones-comunas.json";

export default function PerfilUsuario() {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento] = useState("1995-06-12");
  const [edad, setEdad] = useState(null);
  const [ofrecerServicio, setOfrecerServicio] = useState(false);
  const [experiencia, setExperiencia] = useState("");
  const [oficio, setOficio] = useState("");
  const [foto, setFoto] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vivienda, setVivienda] = useState("");

  useEffect(() => {
    const obtenerNombre = async () => {
      const nombreAPI = "Juan Pérez";
      setNombre(nombreAPI);
    };

    const calcularEdad = () => {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let age = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        age--;
      }
      setEdad(age);
    };

    obtenerNombre();
    calcularEdad();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ← Acceso corregido al arreglo de regiones
  const comunasDisponibles = regionesData.regiones.find(
    (r) => r["región"].trim() === region
  )?.comunas || [];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Perfil del Usuario</h2>

        {/* Foto */}
        <div className="flex flex-col items-center mb-6">
          {foto ? (
            <img src={foto} alt="Foto de perfil" className="w-28 h-28 rounded-full object-cover mb-2 border" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 mb-2 flex items-center justify-center text-gray-500">
              Sin foto
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <p className="text-gray-900 font-semibold">{nombre}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <p className="text-gray-900 font-semibold">{edad} años</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          {/* Región */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Región</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setComuna("");
              }}
            >
              <option value="">Selecciona una región</option>
              {regionesData.regiones.map((r) => {
                const nombreRegion = r["región"].trim();
                return (
                  <option key={nombreRegion} value={nombreRegion}>
                    {nombreRegion}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Comuna */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Comuna</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              disabled={!comunasDisponibles.length}
            >
              <option value="">Selecciona una comuna</option>
              {comunasDisponibles.map((c) => (
                <option key={c.trim()} value={c.trim()}>
                  {c.trim()}
                </option>
              ))}
            </select>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+56 9 1234 5678"
            />
          </div>

          {/* Vivienda */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de vivienda</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              value={vivienda}
              onChange={(e) => setVivienda(e.target.value)}
            >
              <option value="">Selecciona</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
            </select>
          </div>

          {/* Switch ofrecer servicio */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Ofrecer servicio</label>
            <Switch
              checked={ofrecerServicio}
              onChange={setOfrecerServicio}
              className={`${
                ofrecerServicio ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  ofrecerServicio ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Campos adicionales */}
          {ofrecerServicio && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tu oficio</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                  value={oficio}
                  onChange={(e) => setOficio(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Escribe aquí tu experiencia</label>
                <textarea
                  rows="4"
                  maxLength={1000}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                  placeholder="Describe brevemente tu experiencia..."
                  value={experiencia}
                  onChange={(e) => setExperiencia(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button className="bg-yellow-400 text-white px-4 py-1 rounded hover:opacity-90">Editar</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:opacity-90">Borrar</button>
                <button className="bg-green-600 text-white px-4 py-1 rounded hover:opacity-90">Actualizar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
