export default function Testimonials() {
  const testimonials = [
    {
      texto:
        "Gracias a Servix encontré un electricista confiable en minutos. Todo fue rápido, seguro y sin complicaciones.",
      nombre: "Camila Rojas",
      cargo: "Usuaria verificada",
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
      rotate:
        "origin-center lg:rotate-1 hover:lg:-rotate-1 transition-transform",
    },
    {
      texto:
        "Publicar mis servicios en Servix ha sido una de las mejores decisiones. Ahora tengo clientes constantes sin pagar comisiones altas.",
      nombre: "Luis Fernández",
      cargo: "Técnico en telecomunicaciones",
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
      rotate:
        "origin-top-left lg:-rotate-2 hover:lg:rotate-2 transition-transform",
    },
    {
      texto:
        "Uso Servix para contratar personal de limpieza para mi oficina y siempre encuentro gente responsable y puntual. ¡Una app muy útil!",
      nombre: "Patricia Muñoz",
      cargo: "Administradora de oficina",
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/3.jpg",
      rotate:
        "origin-bottom lg:rotate-3 hover:lg:-rotate-3 transition-transform",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">
        No solo lo decimos nosotros.
        <br /> Más de <span className="text-highlight">1000 personas</span>{" "}
        confían en Servix.
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`${t.rotate} bg-gray-100 rounded-xl p-6 shadow`}
          >
            <p className="text-sm text-muted-foreground mb-6">"{t.texto}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{t.nombre}</p>
                <p className="text-xs text-muted-foreground">{t.cargo}</p>
              </div>
              <img
                src={t.avatar}
                alt={t.nombre}
                className="w-10 h-10 rounded-full ring-1 ring-background"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
