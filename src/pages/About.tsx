import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export default function About() {
  const { data } = useSiteData();
  const { t } = useLanguage();
  const { about } = data;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h1 className="font-display text-3xl font-bold md:text-4xl">{t("about.title")}</h1>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              {t("about.subtitle")} {data.companyName}.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{t("about.ourStory")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t("about.story", about.story)}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <Card className="border-none bg-secondary/50 text-center shadow-sm">
                <CardContent className="p-6">
                  <Award className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{t("about.ourMission")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("about.mission", about.mission)}</p>
                </CardContent>
              </Card>
              <Card className="border-none bg-secondary/50 text-center shadow-sm">
                <CardContent className="p-6">
                  <Clock className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{t("about.experience")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("about.experienceText", about.experience)}</p>
                </CardContent>
              </Card>
              <Card className="border-none bg-secondary/50 text-center shadow-sm">
                <CardContent className="p-6">
                  <Users className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{t("about.ourTeam")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("about.ourTeamDescription")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-12 md:py-16">
          <div className="container">
            <h2 className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">{t("about.meetTheTeam")}</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {about.teamMembers.map((member, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">{t("about.getInTouch")}</h2>
              <p className="mt-3 text-center text-muted-foreground">{t("about.getInTouchSubtitle")}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
