import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../components/InputField";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name || !email || !message) {
      return toast.error("Todos los campos son obligatorios.");
    }

    if (!emailFormat.test(email)) {
      return toast.error("Formato de correo electrónico inválido.");
    }

    toast.success("Mensaje enviado correctamente ✅");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Contáctanos
        </h2>

        <InputField
          label="Nombre"
          name="name"
          type="text"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
        />

        <InputField
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Escribe tu mensaje..."
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button type="submit" className="w-full mt-4 btn-primary">
          Enviar mensaje
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
