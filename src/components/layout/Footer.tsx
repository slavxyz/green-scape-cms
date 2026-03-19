import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { data } = useSiteData();

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6" />
              <span className="font-display text-lg font-bold">{data.companyName}</span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Professional landscaping services to transform your outdoor spaces into beautiful, functional environments.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="mt-3 flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "Projects" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "About Us" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Contact Us</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/80">
              <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-primary-foreground">
                <Phone className="h-4 w-4" /> {data.phone}
              </a>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@greenscapepro.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> 123 Garden Lane, Springfield
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} {data.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
