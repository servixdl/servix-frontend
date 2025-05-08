// src/pages/LoginPage.jsx
import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../../utils/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext.jsx";
import ApiUser from '../../../apiServices/ApiUser.jsx';

const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const location = useLocation();
 
  useEffect(() => {
    if (location.state?.error) {
      toast.error(location.state.error);
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      return toast.error("Todos los campos son obligatorios.");
    }

    if (!emailFormat.test(email)) {
      return toast.error("Formato de correo inválido.");
    }

    login(email, password); 
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
