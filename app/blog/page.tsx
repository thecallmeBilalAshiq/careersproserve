import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockBlogPosts } from '@/lib/mockData';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 md:py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights, tips, and trends to help you advance your career.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {mockBlogPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all hover:border-primary/50"
              >
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors mb-3">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User size={16} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                    {post.category}
                  </span>
                  <span>{post.readTime} min read</span>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
