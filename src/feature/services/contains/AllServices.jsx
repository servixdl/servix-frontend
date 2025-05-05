import React from "react";
import SearchService from "../components/Search";
import CardService from "../components/CardService";
import useServices from "../hooks/UseService";
import { Link } from "react-router-dom";
export default function AllServicePage() {
  const { services, search } = useServices();

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Panel de búsqueda */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 shadow-sm rounded-xl">
            <SearchService onSearch={search} />
          </div>
        </div>

        {/* Grid de servicios */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                to={`/service/${service.id_servicio}`}
                key={service.id_servicio}
              >
                <CardService
                  service={{
                    name: service.nombre,
                    price: service.precio,
                    description: service.descripcion,
                    id: service.id_servicio,
                    imagen: service.imagen,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
