import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Menu, X, Globe } from "lucide-react";
import logoDefault from "@/assets/logo-default.jpeg";
import logoEaster from "@/assets/logo-easter.jpeg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data } = useSiteData();
  const { t, currentLang, setCurrentLang, languages } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/about", label: t("nav.about") },
  ];

  const currentFlag = languages.find((l) => l.code === currentLang)?.flag || "🌐";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile call banner */}
      <div className="flex items-center justify-center gap-2 bg-primary py-1.5 text-xs font-semibold text-primary-foreground sm:hidden">
        <Phone className="h-3.5 w-3.5" />
        <a href={`tel:${data.phone}`}>{t("nav.callUs", "Обадете ни се")}: {data.phone}</a>
      </div>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={data.activeLogo === "easter" ? logoEaster : logoDefault}
            alt={data.companyName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-display text-xl font-bold text-primary">{data.companyName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary ${
                location.pathname === link.to ? "bg-secondary text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          {languages.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>{currentFlag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={currentLang === lang.code ? "bg-secondary" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <a
            href={`tel:${data.phone}`}
            className="hidden items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex"
          >
            <Phone className="h-4 w-4" />
            {data.phone}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname === link.to ? "bg-secondary text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {languages.length > 1 && (
              <div className="mt-2 flex flex-wrap gap-2 px-3">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={currentLang === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setCurrentLang(lang.code); setMobileOpen(false); }}
                  >
                    {lang.flag} {lang.name}
                  </Button>
                ))}
              </div>
            )}
            <a
              href={`tel:${data.phone}`}
              className="mt-2 flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              {data.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
