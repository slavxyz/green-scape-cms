import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

export default function Blog() {
  const { data } = useSiteData();
  const posts = [...data.blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / ITEMS_PER_PAGE));
  const paginated = posts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

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
              <>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {paginated.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination className="mt-10">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <PaginationItem key={n}>
                          <PaginationLink isActive={n === page} onClick={() => setPage(n)} className="cursor-pointer">
                            {n}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
