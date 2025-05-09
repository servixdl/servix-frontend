import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../../../config/constans';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import regionesData from '../../../Json/regiones-comunas.json';
import { Switch } from '@headlessui/react';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const [direccion, setDireccion] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vivienda, setVivienda] = useState("");
  const [ofrecerServicio, setOfrecerServicio] = useState(false);
  const [oficio, setOficio] = useState("");
  const [experiencia, setExperiencia] = useState("");

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

  const obtenerPrimerNombre = (nombreCompleto) => {
    return nombreCompleto.split(' ')[0];
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(ENDPOINT.perfil, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;
        if (!data) throw new Error('No se encontró información del usuario.');
        const edad = calcularEdad(data.fecha_nacimiento);
        setUserData({ ...data, edad });
        setHasImage(!!data.imagen);
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
        sessionStorage.removeItem('token');
        navigate('/login');
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();
      formData.append('imagen', file);

      axios.post(ENDPOINT.perfil, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          alert('Imagen actualizada con éxito');
          setSelectedFile(null);
          window.location.reload();
        })
        .catch((err) => {
          console.error('Error al subir la imagen:', err);
          alert('Hubo un error al subir la imagen');
        });
    }
  };

  const comunasDisponibles =
    regionesData.regiones.find((r) => r["región"].trim() === region)?.comunas || [];

  if (!userData) return <p className="text-center mt-10 text-gray-600">Cargando perfil...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-bold mb-2 text-red-600 drop-shadow-sm">
        ¡Bienvenido a Servix, {obtenerPrimerNombre(userData.nombre)}!
      </h2>
      <div className="flex flex-col items-center mb-4">
        {userData.imagen ? (
          <img
            src={`${ENDPOINT.base}/uploads/${userData.imagen}`}
            alt="Foto de perfil"
            className="w-28 h-28 object-cover rounded-full border-4 border-gray-400 shadow mb-2"
          />
        ) : (
          <FaUserCircle className="w-28 h-28 text-gray-400 mb-2" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-input"
        />
        <label htmlFor="upload-input">
          <span className="bg-gray-700 text-white py-1 px-3 rounded hover:bg-gray-800 cursor-pointer mt-1 inline-block">
            {hasImage ? 'Editar imagen' : 'Subir imagen'}
          </span>
        </label>
      </div>
      <div className="border-t border-gray-200 pt-4 text-left space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={userData.nombre || ''}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">RUT</label>
          <input
            type="text"
            value={userData.rut || ''}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="text"
            value={`${userData.edad} años` || ''}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Región</label>
          <select
            className="w-full mt-1 px-3 py-2 border rounded-md"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setComuna("");
            }}
          >
            <option value="">Selecciona una región</option>
            {regionesData.regiones.map((r) => (
              <option key={r["región"]} value={r["región"].trim()}>{r["región"].trim()}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comuna</label>
          <select
            className="w-full mt-1 px-3 py-2 border rounded-md"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            disabled={!comunasDisponibles.length}
          >
            <option value="">Selecciona una comuna</option>
            {comunasDisponibles.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de vivienda</label>
          <select
            className="w-full mt-1 px-3 py-2 border rounded-md"
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
            className={`${ofrecerServicio ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${ofrecerServicio ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        {ofrecerServicio && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tu oficio</label>
              <input
                type="text"
                value={oficio}
                onChange={(e) => setOficio(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Escribe aquí tu experiencia</label>
              <textarea
                rows="4"
                maxLength={1000}
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Describe brevemente tu experiencia..."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}