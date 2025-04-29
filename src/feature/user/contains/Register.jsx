import { useState } from 'react';
import InputField from '../../../utils/InputField';
import SelectField from '../../../utils/SelectField';

// Lista de años desde 1930 hasta el año actual
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1930 + 1 }, (_, i) => 1930 + i);

export default function RegisterPage() {
  const [form, setForm] = useState({
    rut: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    day: '',
    month: '',
    year: '',
  });

  const [error, setError] = useState('');

  /**
   * Actualiza los valores del formulario y limpia errores.
   * @param {Object} e - Evento del input.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  /**
   * Valida que el usuario tenga al menos 18 años.
   * @param {string|number} y - Año de nacimiento.
   * @param {string|number} m - Mes de nacimiento.
   * @param {string|number} d - Día de nacimiento.
   * @returns {boolean} true si cumple los 18 años.
   */
  const validateAge = (y, m, d) => {
    const birth = new Date(`${y}-${m}-${d}`);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  };

  /**
   * Valida que la contraseña cumpla con las reglas requeridas.
   * @param {string} password - Contraseña a validar.
   * @returns {string|null} Mensaje de error si hay, o null si es válida.
   */
  const validatePassword = (password) => {
    if (password.length < 6 || password.length > 10) {
      return 'La contraseña debe tener entre 6 y 10 caracteres.';
    }
    if (!/^[a-zA-Z0-9.]+$/.test(password)) {
      return 'La contraseña solo puede contener letras, números y puntos.';
    }
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    if (uppercaseCount > 2) {
      return 'La contraseña solo puede contener hasta 2 letras mayúsculas.';
    }
    return null;
  };

  /**
   * Maneja el envío del formulario y valida los datos.
   * @param {Object} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { rut, name, email, password, confirmPassword, day, month, year } = form;

    if (!rut || !name || !email || !password || !confirmPassword || !day || !month || !year) {
      return setError('Todos los campos son obligatorios.');
    }

    if (rut.length > 9) return setError('El RUT no puede tener más de 9 caracteres.');
    if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');

    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);

    if (!validateAge(year, month, day)) return setError('Debes tener al menos 18 años.');

    alert('Formulario válido.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registro</h2>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm border border-red-300">
            {error}
          </div>
        )}

        <InputField
          label="RUT"
          name="rut"
          type="text"
          placeholder="Ej: 123456789"
          value={form.rut}
          onChange={handleChange}
        />

        <InputField
          label="Nombre"
          name="name"
          type="text"
          placeholder="Tu nombre completo"
          value={form.name}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">Fecha de nacimiento</label>
          <div className="flex gap-2">
            <SelectField
              name="day"
              label="Día"
              value={form.day}
              onChange={handleChange}
              options={Array.from({ length: 31 }, (_, i) => i + 1)}
            />
            <SelectField
              name="month"
              label="Mes"
              value={form.month}
              onChange={handleChange}
              options={Array.from({ length: 12 }, (_, i) => i + 1)}
            />
            <SelectField
              name="year"
              label="Año"
              value={form.year}
              onChange={handleChange}
              options={years}
            />
          </div>
        </div>

        <InputField
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={form.password}
          onChange={handleChange}
        />

        <InputField
          label="Repite la contraseña"
          name="confirmPassword"
          type="password"
          placeholder="Repite tu contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}