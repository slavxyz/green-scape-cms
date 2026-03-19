import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { useSiteData } from "@/contexts/SiteDataContext";

export default function Blog() {
  const { data } = useSiteData();
  const posts = [...data.blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Blog</h1>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Tips, news, and insights on landscaping, gardening, and outdoor living.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
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
