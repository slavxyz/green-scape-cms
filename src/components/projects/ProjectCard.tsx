import { Project } from "@/data/siteData";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group overflow-hidden border-none shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
          <span className="text-xs font-medium text-white/80">
            {new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  );
}
