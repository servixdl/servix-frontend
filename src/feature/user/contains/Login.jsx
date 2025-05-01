// src/pages/LoginPage.jsx

import InputField from "../../../utils/InputField";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
      <form className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Iniciar sesión
        </h2>

        {/* Email */}
        <InputField
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
        />

        {/* Contraseña */}
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Tu contraseña"
        />

        {/* Botón de inicio */}
        <button type="submit" className="btn-primary w-full mt-4">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
