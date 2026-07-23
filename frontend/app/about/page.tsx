import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Heart, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Transforming Careers, One Opportunity at a Time
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            CareerHub Pro is dedicated to connecting talented professionals with meaningful opportunities and empowering them through continuous learning.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower professionals worldwide by providing access to quality job opportunities and career development resources.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Values</h3>
              <p className="text-muted-foreground">
                We believe in integrity, innovation, and inclusivity. Every professional deserves an equal chance to succeed.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Community</h3>
              <p className="text-muted-foreground">
                With 50,000+ active users and counting, we&apos;re building a thriving community of career-focused professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder' },
              { name: 'Michael Chen', role: 'CTO' },
              { name: 'Emily Rodriguez', role: 'VP of Operations' },
              { name: 'David Park', role: 'Head of Product' },
            ].map((member) => (
              <div key={member.name} className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Join thousands of professionals who have transformed their careers with CareerHub.</p>
          <Link
            href="/register"
            className="inline-flex px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors items-center gap-2"
          >
            Get Started Today <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
