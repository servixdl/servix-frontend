import React from "react";
import SearchService from "../components/Search";
import CardService from "../components/CardService";
import useServices from "../hooks/UseService";
import { Link } from "react-router-dom";
import formatToChileanPeso from "../../../utils/FormatNumber";

export default function AllServicePage() {
  const { services, search, loading } = useServices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 animate-fadeIn">
        <div className="w-full md:w-1/4 flex justify-center items-start">
          <div className="w-full bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:scale-105">
            <SearchService onSearch={search} />
          </div>
        </div>

        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-white rounded-xl shadow animate-pulse"
                  />
                ))
            : services.map((service) => (
                <Link
                  to={"/service/" + service.id_servicio}
                  key={service.id_servicio}
                >
                  <CardService
                    key={service.id_servicio}
                    service={{
                      name: service.nombre,
                      price: formatToChileanPeso(service.precio),
                      imagen: service.imagen,
                      description: service.descripcion,
                      id: service.id_servicio,
                    }}
                  />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
