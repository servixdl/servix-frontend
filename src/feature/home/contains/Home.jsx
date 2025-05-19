import React from "react";
import CarouselServices from "../components/CarouselServices";
import Hero from "../components/Hero";
import Metrics from "../components/Metrics";
import NewsletterCTA from "../components/NewsletterCTA";
import Testimonials from "../components/Testimonials";
import WhatsAppButton from "../../../components/complex/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarouselServices />
      <Testimonials />
      <Metrics />
      <NewsletterCTA />
      <WhatsAppButton
        phone="56998765432"
        message="Hola, ¿me puedes ayudar con una consulta?"
      />
    </>
  );
}
