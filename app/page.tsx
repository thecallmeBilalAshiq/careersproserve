'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JobCard } from '@/components/common/JobCard';
import AnimatedBackground from '@/components/3d/AnimatedBackground';
import { mockJobs, mockTraining, mockTestimonials } from '@/lib/mockData';
import { Briefcase, BookOpen, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const featuredJobs = mockJobs.filter(job => job.featured).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Your Next Career Opportunity Awaits
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Discover thousands of job listings, enroll in professional training programs, and advance your career with CareerHub Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Explore Jobs
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/training"
                className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                View Training
                <BookOpen size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '5,000+', label: 'Active Jobs' },
            { number: '1,200+', label: 'Training Courses' },
            { number: '50,000+', label: 'Active Users' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Jobs</h2>
            <Link href="/jobs" className="text-primary hover:underline font-medium flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobCard job={job} featured={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Popular Training Programs</h2>
            <Link href="/training" className="text-primary hover:underline font-medium flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTraining.slice(0, 3).map((training, index) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                      {training.level}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{training.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">By {training.instructor}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-primary">${training.price}</p>
                    <p className="text-xs text-muted-foreground">{training.duration} hours</p>
                  </div>
                  <div className="text-yellow-500">★ {training.rating}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Choose CareerHub?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase size={32} />,
                title: 'Job Listings',
                description: 'Access thousands of curated job listings from top companies.',
              },
              {
                icon: <BookOpen size={32} />,
                title: 'Professional Training',
                description: 'Learn from industry experts with comprehensive courses.',
              },
              {
                icon: <TrendingUp size={32} />,
                title: 'Career Growth',
                description: 'Track your progress and advance your professional skills.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border bg-card p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">&quot;{testimonial.content}&quot;</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Advance Your Career?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Start exploring opportunities today and take control of your professional future.</p>
          <Link
            href="/register"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
