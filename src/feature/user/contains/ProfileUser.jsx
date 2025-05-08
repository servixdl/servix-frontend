import React from 'react';
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import regionesData from "../../../Json/regiones-comunas.json";
;
import { ENDPOINT } from "../../../config/constans.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
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

  const calcularEdad = (fecha) => {
    if (!fecha) return null;
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const getUserData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/");

    try {
      const { data } = await axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNombre(data.nombre || "");
      setRut(data.rut || "");
      setFechaNacimiento(data.fechaNacimiento || "");
      setEdad(calcularEdad(data.fechaNacimiento));
    } catch (error) {
      console.error(error?.response?.data || error.message);
      sessionStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    getUserData();
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

  const comunasDisponibles =
    regionesData.regiones.find((r) => r["región"].trim() === region)?.comunas || [];

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
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <p className="text-gray-900 font-semibold">{nombre}</p>
          </div>

          {/* Rut */}
          <div>
            <label className="block text-sm font-medium text-gray-700">RUT</label>
            <p className="text-gray-900 font-semibold">{rut}</p>
          </div>

          {/* Edad (calculada) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <p className="text-gray-900 font-semibold">{edad ? `${edad} años` : "Sin datos"}</p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
