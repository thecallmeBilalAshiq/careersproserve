import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JOB_CATEGORIES } from '@/lib/constants';
import { mockJobs } from '@/lib/mockData';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const getCategoryCount = (category: string) => {
    return mockJobs.filter(job => job.category === category).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 md:py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Job Categories</h1>
          <p className="text-lg text-muted-foreground">
            Explore job opportunities across different industries and specializations.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOB_CATEGORIES.map((category, index) => {
              const count = getCategoryCount(category);
              const colors = [
                'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                'bg-pink-500/10 text-pink-600 dark:text-pink-400',
                'bg-green-500/10 text-green-600 dark:text-green-400',
                'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
                'bg-red-500/10 text-red-600 dark:text-red-400',
                'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
              ];
              const bgColor = colors[index % colors.length];

              return (
                <Link
                  key={category}
                  href={`/jobs?category=${category}`}
                  className="group rounded-lg border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {category}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {count} {count === 1 ? 'position' : 'positions'} available
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Can&apos;t Find Your Category?</h2>
          <p className="text-muted-foreground mb-8">Browse all available positions or create a job alert to stay updated.</p>
          <Link
            href="/jobs"
            className="inline-flex px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors items-center gap-2"
          >
            Browse All Jobs <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
