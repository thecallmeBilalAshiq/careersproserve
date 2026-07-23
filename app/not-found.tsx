import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Home size={20} /> Go Home
            </Link>
            <Link
              href="/jobs"
              className="px-8 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors inline-flex items-center justify-center gap-2"
            >
              Browse Jobs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
