import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = useSiteData();
  const { t } = useLanguage();
  const project = data.projects.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">Проектът не е намерен</h1>
            <Button asChild className="mt-4">
              <Link to="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Обратно към проекти</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = project.gallery.length > 0 ? project.gallery : [project.image];
  const title = t(`project.${project.id}.title`, project.title);
  const longDesc = t(`project.${project.id}.longDescription`, project.longDescription || project.description);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary py-12 text-primary-foreground md:py-16">
          <div className="container">
            <Button asChild variant="ghost" size="sm" className="mb-4 gap-1 text-primary-foreground/80 hover:text-primary-foreground">
              <Link to="/projects"><ArrowLeft className="h-4 w-4" /> {t("projects.title", "Проекти")}</Link>
            </Button>
            <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-2 text-sm text-primary-foreground/70">
              {new Date(project.date).toLocaleDateString("bg-BG", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="overflow-hidden rounded-xl">
              <img
                src={images[selectedImage]}
                alt={`${title} - ${selectedImage + 1}`}
                className="aspect-video w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      i === selectedImage ? "border-primary ring-2 ring-primary/30" : "border-muted hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Description */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t("projectDetails.about", "За проекта")}</h2>
            <div className="prose prose-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {longDesc}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
