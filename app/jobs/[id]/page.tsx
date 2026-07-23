'use client';

import { use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockJobs } from '@/lib/mockData';
import { MapPin, Briefcase, DollarSign, BookmarkPlus, Share2, ArrowRight } from 'lucide-react';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Job Not Found</h1>
            <Link href="/jobs" className="text-primary hover:underline">
              Back to Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-2">{job.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {job.category}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                    {job.experience}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <BookmarkPlus size={20} />
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <MapPin size={18} /> {job.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Salary</p>
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <DollarSign size={18} />
                  {job.salary ? `${(job.salary.min / 1000).toFixed(0)}K - ${(job.salary.max / 1000).toFixed(0)}K` : 'Competitive'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Posted</p>
                <p className="font-semibold text-foreground">
                  {Math.floor((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">About the Role</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-8 sticky top-24">
                <button className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3 flex items-center justify-center gap-2">
                  Apply Now <ArrowRight size={18} />
                </button>
                <button className="w-full px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors">
                  Save Job
                </button>

                {/* Company Info */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4">About {job.company}</h3>
                  <div className="w-full h-20 bg-secondary rounded-lg mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    {job.company} is a leading organization in the {job.category} industry.
                  </p>
                  <button className="w-full px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                    View Company Profile
                  </button>
                </div>

                {/* Job Stats */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applicants</span>
                      <span className="font-semibold text-foreground">{job.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">View ID</span>
                      <span className="font-semibold text-foreground font-mono">{job.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockJobs.slice(0, 3).map((similarJob) => (
                <Link
                  key={similarJob.id}
                  href={`/jobs/${similarJob.id}`}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary/50"
                >
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                    {similarJob.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{similarJob.company}</p>
                  <p className="text-sm text-muted-foreground">{similarJob.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
