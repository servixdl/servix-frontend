import React from "react";
import constructor from "../../../assets/images/constrructor.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section relative overflow-hidden py-16 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 items-center gap-12">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Bienvenido a{" "}
            <span className="text-highlight">Servix Marketplace</span>
          </h1>
          <p className="text-base sm:text-lg hero-paragraph mb-8">
            Encuentra los mejores servicios a tu alcance, rápido y fácil.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/allservice" type="button" className="btn-primary">
              Explorar Servicios
            </Link>
            <button type="button" className="btn-outline">
              Ofrecer un servicio
            </button>
          </div>
          <div className="flex justify-center lg:justify-start mt-8">
            <div className="bg-background flex items-center rounded-full border px-3 py-1 shadow-sm gap-3 flex-wrap">
              {/* Avatares */}
              <div className="flex -space-x-2">
                <img
                  className="ring-background rounded-full ring-1"
                  src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
                  width={24}
                  height={24}
                  alt="Avatar 01"
                />
                <img
                  className="ring-background rounded-full ring-1"
                  src="https://xsgames.co/randomusers/assets/avatars/male/12.jpg"
                  width={24}
                  height={24}
                  alt="Avatar 02"
                />
                <img
                  className="ring-background rounded-full ring-1"
                  src="https://xsgames.co/randomusers/assets/avatars/male/73.jpg"
                  width={24}
                  height={24}
                  alt="Avatar 03"
                />
                <img
                  className="ring-background rounded-full ring-1"
                  src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg"
                  width={24}
                  height={24}
                  alt="Avatar 04"
                />
              </div>

              {/* Texto */}
              <p className="text-muted-foreground text-sm sm:text-xs">
                Más de{" "}
                <strong className="text-foreground font-medium">60K+</strong>{" "}
                usuarios confían en nosotros.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:max-w-full lg:h-[500px] rounded-2xl overflow-hidden">
          <img
            src={constructor}
            alt="Constructor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
