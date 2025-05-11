import { useState } from "react";
import { RiCloseLargeLine, RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import React from "react";
export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link to="/offerservice" className="text-sm hover:underline">
            Ofrecer un servicio
          </Link>
          <Link to="/contact" className="text-sm hover:underline">
            Contacto
          </Link>
          {serviceP?(<>
          <Link to="/myServices" className="text-sm hover:underline" >
            Contacto
          </Link></>):(
           <></>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            buttons(
              "/login",
              "Iniciar sesión",
              "btn-outline",
              "/register",
              "Registrarse",
              "btn-primary"
            )
          ) : (
            buttons(
              "/perfil",
              "Perfil",
              "btn-outline",
              "/",
              "Cerrar sesión",
              "btn-primary",
              () => {
                if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
                  logout();
                }
              }
            )
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
          <Link to="/offerservice" className="block text-sm hover:underline">
            Ofrecer un servicio
          </Link>
          <Link to="/contact" className="block text-sm hover:underline">
            Contacto
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            {!user ? (
              buttons(
                "/login",
                "Iniciar sesión",
                "btn-outline w-full",
                "/register",
                "Registrarse",
                "btn-primary w-full"
              )
            ) : (
              buttons(
                "/perfil",
                "Perfil",
                "btn-outline w-full",
                "/",
                "Cerrar sesión",
                "btn-primary w-full",
                () => {
                  if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
                    logout();
                  }
                }
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
