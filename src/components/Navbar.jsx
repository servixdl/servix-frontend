import { useState } from "react";
import { RiCloseLargeLine, RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn-outline">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn-primary">
            Registrarse
          </Link>
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
          <a href="#servicios" className="block text-sm hover:underline">
            Servicios
          </a>
          <a href="#ofrecer" className="block text-sm hover:underline">
            Ofrecer un servicio
          </a>
          <a href="#contacto" className="block text-sm hover:underline">
            Contacto
          </a>
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/login" className="btn-outline w-full">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn-primary w-full">
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
