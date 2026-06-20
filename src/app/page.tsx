import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Showcase } from "@/components/home/showcase";
import { UrlShortener } from "@/components/home/url-shortener";

export default function HomePage() {
  return (
    <>
      <Hero />
      <UrlShortener />
      <HowItWorks />
      <Showcase />
      <Features />
    </>
  );
}
