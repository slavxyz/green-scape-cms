import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";
import logoDefault from "@/assets/logo-default.jpeg";
import logoEaster from "@/assets/logo-easter.jpeg";

export default function Footer() {
  const { data } = useSiteData();
  const { t } = useLanguage();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/about", label: t("nav.about") },
  ];

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src={data.activeLogo === "easter" ? logoEaster : logoDefault} alt={data.companyName} className="h-8 w-8 rounded-full object-cover" />
              <span className="font-display text-lg font-bold">{data.companyName}</span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/80">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">{t("footer.quickLinks")}</h4>
            <nav className="mt-3 flex flex-col gap-2">
              {links.map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">{t("footer.contactUs")}</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/80">
              <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-primary-foreground">
                <Phone className="h-4 w-4" /> {data.phone}
              </a>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@greenscapepro.com</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Garden Lane, Springfield</div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} <a className="devhillslab" href="http://devhillslab.com">DevHillsLab</a> {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
