import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesSection from "@/components/home/ServicesSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <ServicesSection />

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Ready to Transform Your Yard?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Browse our past projects for inspiration, or get in touch today for a free consultation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/projects">
                  View Our Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn About Us</Link>
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
