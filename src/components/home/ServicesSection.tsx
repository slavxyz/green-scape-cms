import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Calendar, Flower2, Sprout, Droplets } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  scissors: <Scissors className="h-8 w-8" />,
  calendar: <Calendar className="h-8 w-8" />,
  flower: <Flower2 className="h-8 w-8" />,
  sprout: <Sprout className="h-8 w-8" />,
  droplets: <Droplets className="h-8 w-8" />,
};

export default function ServicesSection() {
  const { data } = useSiteData();
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">{t("services.title")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("services.subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service) => (
            <Card key={service.id} className="group border-none bg-background shadow-md transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {iconMap[service.icon] || <Sprout className="h-8 w-8" />}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {t(`service.${service.id}.title`, service.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`service.${service.id}.description`, service.description)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
