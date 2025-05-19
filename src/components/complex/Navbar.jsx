import { useState, useContext } from "react";
import { RiCloseLargeLine, RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import React from "react";
import { ServiceProviderContext } from "../../context/serviceProviderContext.jsx";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { serviceP } = useContext(ServiceProviderContext);

  const buttons = (
    ruta1,
    nombre1,
    class1,
    ruta2,
    nombre2,
    class2,
    onSecondClick
  ) => {
    return (
      <>
        <Link to={ruta1} className={class1}>
          {nombre1}
        </Link>
        {nombre2 === "Cerrar sesión" ? (
          <button className={class2} onClick={onSecondClick}>
            {nombre2}
          </button>
        ) : (
          <Link to={ruta2} className={class2}>
            {nombre2}
          </Link>
        )}
      </>
    );
  };

  return (
    <header className="bg-background text-foreground shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="text-xl font-bold text-highlight">
          Servix
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/allservice" className="text-sm hover:underline">
            Servicios
          </Link>
          {!user && (
            <Link to="/register" className="text-sm hover:underline">
              Ofrecer un servicio
            </Link>
          )}
          {user && (
            <Link to="/myServices" className="text-sm hover:underline">
              Mis servicios
            </Link>
          )}
          {user && (
            <Link
              to="/servicios-solicitados"
              className="text-sm hover:underline"
            >
              Servicios Solicitados
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user
            ? buttons(
                "/login",
                "Iniciar sesión",
                "btn-outline",
                "/register",
                "Registrarse",
                "btn-primary"
              )
            : buttons(
                "/perfil",
                "Perfil",
                "btn-outline",
                "/",
                "Cerrar sesión",
                "btn-primary",
                async () => {
                  const result = await Swal.fire({
                    title: "¿Estás seguro que deseas cerrar sesión?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, cerrar sesión",
                    cancelButtonText: "Cancelar",
                  });
                  if (result.isConfirmed) {
                    logout();
                  }
                }
              )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md border"
        >
          {menuOpen ? <RiCloseLargeLine /> : <RiMenuFill />}
        </button>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/allservice" className="block text-sm hover:underline">
            Servicios
          </Link>
          {!user && (
            <Link to="/register" className="block text-sm hover:underline">
              Ofrecer un servicio
            </Link>
          )}
          {user && (
            <Link to="/myServices" className="block text-sm hover:underline">
              Mis servicios
            </Link>
          )}
          {user && (
            <Link
              to="/servicios-solicitados"
              className="block text-sm hover:underline"
            >
              Servicios Solicitados
            </Link>
          )}
          <div className="flex flex-col gap-2 pt-2">
            {!user
              ? buttons(
                  "/login",
                  "Iniciar sesión",
                  "btn-outline w-full",
                  "/register",
                  "Registrarse",
                  "btn-primary w-full"
                )
              : buttons(
                  "/perfil",
                  "Perfil",
                  "btn-outline w-full",
                  "/",
                  "Cerrar sesión",
                  "btn-primary w-full",
                  async () => {
                    const result = await Swal.fire({
                      title: "¿Estás seguro que deseas cerrar sesión?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Sí, cerrar sesión",
                      cancelButtonText: "Cancelar",
                    });
                    if (result.isConfirmed) {
                      logout();
                    }
                  }
                )}
          </div>
        </div>
      )}
    </header>
  );
}
