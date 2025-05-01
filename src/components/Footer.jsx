import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t-gray-300 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="text-xl font-bold text-highlight">
              Servix
            </Link>
            <p className="text-sm mt-1">
              Conectando personas con servicios de confianza.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <Link to="/allservice" className="hover:underline">
              Servicios
            </Link>
            <Link to="/offerservice" className="hover:underline">
              Ofrecer Servicio
            </Link>
            <Link to="contact" className="hover:underline">
              Contacto
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Servix. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
