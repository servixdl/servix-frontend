import { useState ,useContext} from "react";
import { RiCloseLargeLine, RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {TokenContext} from "../context/tokenContext.jsx";
import {useAuth} from '../context/AuthContext.jsx'

export default function Navbar() {
  
  const {token } =useContext(TokenContext);
  const {logout} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const buttons = (ruta1, nombre1, class1, ruta2, nombre2, class2, onSecondClick) => {
    return (
      <>
        <Link to={ruta1} className={class1}>
          {nombre1}
        </Link>
  
        {nombre2 === "Cerrar sesion" ? (
          <Link className={class2} onClick={onSecondClick}>
            {nombre2}
            </Link>
        ) : (
          <Link to={ruta2} className={class2}>
            {nombre2}
          </Link>
        )}
      </>
    );};
    console.log(token)
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
          <Link to="/contact" className="text-sm hover:underline" onClick={logout}>
            Contacto
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
        {!token?(<>
          {buttons("/login","Iniciar sesión","btn-outline",
                  "/register","Registrarse","btn-primary")
          }
        </>):(<>
          {buttons("/perfil","Perfil","btn-outline",
                  "","Cerrar sesion","btn-primary",logout)
          }
        </>)}
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

          {!token?(<>
          {buttons("/login","Iniciar sesión","btn-outline w-full",
                  "/register","Registrarse","btn-primary w-full")
          }
        </>):(<>
          {buttons("/perfil","Perfil","btn-outline w-full",
                  "/","Cerrar sesion","btn-primary w-full",logout)
          }
        </>)}
          </div>
        </div>
      )}
    </header>
  );
}
