import { Link } from "react-router-dom";
import { BlogPost } from "@/data/siteData";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useLanguage();

  return (
    <Card className="group overflow-hidden border-none shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img src={post.image} alt={t(`blog.${post.id}.title`, post.title)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
          {t(`blog.${post.id}.title`, post.title)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(`blog.${post.id}.excerpt`, post.excerpt)}
        </p>
        <Link to={`/blog/${post.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
          {t("blog.readMore")} <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
