import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import { useSiteData } from "@/contexts/SiteDataContext";

export default function Projects() {
  const { data } = useSiteData();
  const projects = [...data.projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Our Projects</h1>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Explore our latest landscaping transformations, from residential gardens to commercial properties.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            {projects.length === 0 ? (
              <p className="text-center text-muted-foreground">No projects yet. Check back soon!</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
