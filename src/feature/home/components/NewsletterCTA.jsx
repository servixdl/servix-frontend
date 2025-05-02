export default function NewsletterCTA() {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dog on bed"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          ¿Quieres recibir novedades de Servix?
        </h2>
        <p className="text-md sm:text-lg mb-6 text-white/80">
          Suscríbete a nuestro newsletter y recibe tips, nuevos servicios y
          promociones exclusivas.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="w-full max-w-xs px-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="btn-primary px-6 py-2 rounded-lg shadow-md"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  );
}
