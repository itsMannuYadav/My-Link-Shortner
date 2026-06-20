import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { UrlShortener } from "@/components/home/url-shortener";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="pb-20">
        <UrlShortener />
      </div>
      <Features />
    </>
  );
}
