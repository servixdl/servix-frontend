import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full animate-fadeIn">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Inicia sesión
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Para solicitar este servicio necesitas iniciar sesión.
        </p>
        <div className="flex justify-end gap-4">
          <button className="btn-outline" onClick={onClose}>
            Cancelar
          </button>
          <Link to="/login" className="btn-primary">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
