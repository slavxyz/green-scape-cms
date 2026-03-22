import { useState, useEffect, useCallback } from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroCarousel() {
  const { data } = useSiteData();
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const images = data.heroImages;

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (!images.length) return null;

  const titleLines = t("hero.title").split("\n");

  return (
    <section className="relative h-[400px] overflow-hidden md:h-[550px]">
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={img} alt={`Landscaping project ${i + 1}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-end">
        <div className="container pb-16">
          <h1 className="font-display text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-3 max-w-lg text-base text-white/90 drop-shadow md:text-lg">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/30 text-white backdrop-blur hover:bg-background/50">
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/30 text-white backdrop-blur hover:bg-background/50">
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
