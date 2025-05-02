import CarouselServices from "../components/CarouselServices";
import Hero from "../components/Hero";
import Metrics from "../components/Metrics";
import NewsletterCTA from "../components/NewsletterCTA";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarouselServices />
      <Testimonials />
      <Metrics />
      <NewsletterCTA />
    </>
  );
}
