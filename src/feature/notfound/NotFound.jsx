import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-muted-foreground mb-6">
        Lo sentimos, no pudimos encontrar la página que buscas.
      </p>

      <Link to="/" className="btn-primary px-6 py-2 rounded-lg">
        Volver al inicio
      </Link>
    </section>
  );
}
