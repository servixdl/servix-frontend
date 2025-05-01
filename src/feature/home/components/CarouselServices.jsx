import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    titulo: "Electricista",
    comuna: "Recoleta",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/30.jpg",
  },
  {
    id: 2,
    titulo: "Plomero",
    comuna: "Maipú",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/15.jpg",
  },
  {
    id: 3,
    titulo: "Personal de limpieza",
    comuna: "Concepción",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/17.jpg",
  },
  {
    id: 4,
    titulo: "Técnico en telecomunicaciones",
    comuna: "Las condes",
    reviewer: "Juan Lopez",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/10.jpg",
  },
  {
    id: 5,
    titulo: "Jardinero",
    comuna: "Ñuñoa",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/25.jpg",
  },
  {
    id: 6,
    titulo: "Pintor",
    comuna: "Providencia",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/30.jpg",
  },
  {
    id: 7,
    titulo: "Gasfiter",
    comuna: "La Florida",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/15.jpg",
  },
  {
    id: 8,
    titulo: "Carpintero",
    comuna: "Puente Alto",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
  },
  {
    id: 9,
    titulo: "Mecánico",
    comuna: "Santiago Centro",
    reviewer: "Reviewer name",
    fecha: "00/00/0000",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/20.jpg",
  },
];

export default function CarouselServices() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Título y enlace */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">
          Servicios disponibles
        </h2>
        <Link
          to="/allservice"
          className="text-sm hover:underline flex items-center gap-1"
        >
          Ver todos <span>›</span>
        </Link>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full 2xl:w-72 z-10 bg-gradient-to-r from-white to-transparent " />
      <div className="pointer-events-none absolute right-0 top-0 h-full 2xl:w-72 z-10 bg-gradient-to-l from-white to-transparent " />

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="embla__slide flex-shrink-0 w-[250px] py-4"
            >
              <Link
                to={`/service/${service.id}`}
                className="block bg-white rounded-lg p-4 shadow hover:shadow-3xl transition duration-300 h-full"
              >
                <div className="flex gap-1 mb-2 text-sm text-yellow-500">
                  {Array(5)
                    .fill("★")
                    .map((star, i) => (
                      <span key={i} className="text-gray-400">
                        {star}
                      </span>
                    ))}
                </div>
                <h3 className="font-semibold text-foreground">
                  {service.titulo}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.comuna}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <img
                    src={service.avatar}
                    alt={service.reviewer}
                    className="w-6 h-6 rounded-full ring-1 ring-background"
                  />
                  <div>
                    <p className="text-xs text-foreground">
                      {service.reviewer}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {service.fecha}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
