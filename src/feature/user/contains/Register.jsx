import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../../../utils/InputField.jsx';
import SelectField from '../../../utils/SelectField.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { ENDPOINT } from '../../../config/constans.js';

// Esto es para crear los años desde 1930 hasta el actual
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1930 + 1 }, (_, i) => 1930 + i);

export default function Registerpage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Este es el estado para guardar lo que escribe el usuario
  const [form, setForm] = useState({
    rut: '',
    name: '',
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
  });

  const [error, setError] = useState('');

  // Esta función actualiza lo que el usuario va escribiendo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Limpio el error si había
  };

  // Esta función sirve para saber si la persona tiene 18 años o más
  const validateAge = (y, m, d) => {
    const birth = new Date(`${y}-${m}-${d}`);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    const mo = now.getMonth() - birth.getMonth();
    const da = now.getDate() - birth.getDate();

    // Esto revisa si ya cumplió los 18 exactos
    return age > 18 || (age === 18 && (mo > 0 || (mo === 0 && da >= 0)));
  };

  // Esta función se ejecuta cuando el usuario hace click en "Registrarme"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rut, name, email, password, day, month, year } = form;

    // Validaciones: si falta algo, no deja continuar
    if (!rut || !name || !email || !password || !day || !month || !year) {
      return setError('Todos los campos son obligatorios.');
    }

    if (rut.length > 9) return setError('El RUT no puede tener más de 9 caracteres.');
    if (password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.');
    if (!validateAge(year, month, day)) return setError('Debes tener al menos 18 años.');

    try {
      // Envío los datos al backend (esto guarda al usuario en la base de datos)
      const res = await axios.post(ENDPOINT.register, form);

      // Guardo la info del usuario en el contexto (como sesión iniciada)
      login(res.data.user, res.data.token);

      alert('Registrado con éxito');
      navigate('/login'); // Lo llevo a la página de login
    } catch (err) {
      // Si algo falla, muestro el error
      setError(err.response?.data?.message || 'Error al registrar.');
    }
  };

  // Esto es lo que se ve en pantalla: el formulario pero algo pasa no renderiza?
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-xl rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Crea tu cuenta</h2>

        {/* Si hay error, lo muestro aquí */}
        {error && <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">{error}</div>}

        {/* Campo para el RUT */}
        <div className="mb-4">
          <label htmlFor="rut" className="text-sm font-medium text-gray-700">RUT</label>
          <input
            type="text"
            name="rut"
            id="rut"
            maxLength={9}
            value={form.rut}
            onChange={handleChange}
            placeholder="Ej: 123456789"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black/20"
          />
        </div>

        {/* Campo para el nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black/20"
          />
        </div>

        {/* Fecha de nacimiento con 3 select: día, mes, año */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">Fecha de nacimiento</label>
          <div className="flex gap-2">
            <SelectField name="day" label="Día" value={form.day} onChange={handleChange} options={Array.from({ length: 31 }, (_, i) => i + 1)} />
            <SelectField name="month" label="Mes" value={form.month} onChange={handleChange} options={Array.from({ length: 12 }, (_, i) => i + 1)} />
            <SelectField name="year" label="Año" value={form.year} onChange={handleChange} options={years} />
          </div>
        </div>

        {/* Campo de email */}
        <InputField
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
        />

        {/* Campo de contraseña */}
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo 8 caracteres"
        />

        {/* Botón para enviar */}
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
