// src/pages/LoginPage.jsx
import { useState } from "react";
import InputField from "../../../utils/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userCreate } from "../../../config/users.js";

const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validatePassword = (password) => {
    if (password.length < 6 || password.length > 10) {
      return "La contraseña debe tener entre 6 y 10 caracteres.";
    }
    if (!/^[a-zA-Z0-9.]+$/.test(password)) {
      return "Solo se permiten letras, números y puntos.";
    }
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    if (uppercaseCount > 2) {
      return "Máximo 2 letras mayúsculas.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    
    const userFound = userCreate.find((u) => u.email === email);

    if (!userFound) {
      return toast.error('Este usuario no está registrado.');
    }
  
    if (userFound.password !== password) {
      return toast.error('Contraseña incorrecta o email incorrecto!.');
    }
  
    // Si pasa ambas validaciones:
    toast.success('Inicio de sesión exitoso. Redirigiendo al perfil...');
    setTimeout(() => {
      navigate('/perfil');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Iniciar sesión
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm border border-red-300">
            {error}
          </div>
        )}

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
          placeholder="Tu contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="w-full mt-4 btn-primary">
          Iniciar sesión
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
