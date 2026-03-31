import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesSection from "@/components/home/ServicesSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import apobLogo from "@/assets/apob-logo.jpeg";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <ServicesSection />

        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
              <a
                href="https://apobg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 transition-transform hover:scale-105"
              >
                <img
                  src={apobLogo}
                  alt="Асоциация на Професионалните Озеленители в България (АПОБ)"
                  className="h-40 w-40 rounded-full object-cover shadow-lg md:h-52 md:w-52"
                />
              </a>
              <div className="text-center md:text-left">
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {t("apob.title")}
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                  {t("apob.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("cta.subtitle")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/projects">{t("cta.viewProjects")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">{t("cta.learnAbout")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
