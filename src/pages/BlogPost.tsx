import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data } = useSiteData();
  const post = data.blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Post Not Found</h1>
            <Button asChild variant="link" className="mt-4">
              <Link to="/blog">← Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero image */}
        <div className="relative h-64 md:h-80">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        </div>

        <article className="container max-w-3xl py-10 md:py-16">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-1">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>

          <div className="prose prose-green mt-8 max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="font-display text-xl font-semibold text-foreground mt-6 mb-3">{line.replace("## ", "")}</h2>;
              if (line.startsWith("- **")) {
                const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
                if (match) return <p key={i} className="text-muted-foreground mb-1"><strong className="text-foreground">{match[1]}</strong>: {match[2]}</p>;
              }
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
