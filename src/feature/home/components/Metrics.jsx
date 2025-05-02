import TextTicker from "./TextTicker";

export default function Metrics() {
  const metrics = [
    { label: "Ingresos generados", value: "500K+" },
    { label: "Usuarios registrados", value: "200K+" },
    { label: "Servicios contratados", value: "100K+" },
  ];

  return (
    <section className="bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Los números hablan por sí solos
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Servix ayuda a miles de personas a conectar con servicios confiables
            en todo el país. Nuestra comunidad crece cada día.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {metrics.map((m, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-highlight">{m.value}</p>
                <p className="text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <div className="text-2xl font-semibold tabular-nums tracking-tight">
            <TextTicker value={1000} duration={3000} />
          </div>
        </div>
      </div>
    </section>
  );
}
