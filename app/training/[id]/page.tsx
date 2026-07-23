'use client';

import { use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTraining } from '@/lib/mockData';
import { Users, Clock, BarChart3, CheckCircle, Star, Share2, ArrowRight } from 'lucide-react';

export default function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const training = mockTraining.find(t => t.id === id);

  if (!training) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Course Not Found</h1>
            <Link href="/training" className="text-primary hover:underline">
              Back to Training
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
                    {training.level}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {training.category}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{training.title}</h1>
                <p className="text-lg text-muted-foreground">By {training.instructor}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <Clock size={18} /> {training.duration} hours
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Students</p>
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <Users size={18} /> {training.students}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rating</p>
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <Star size={18} className="text-yellow-500 fill-yellow-500" /> {training.rating}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-2xl font-bold text-primary">${training.price}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{training.description}</p>
              </div>

              {/* Curriculum */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">What You&apos;ll Learn</h2>
                <ul className="space-y-3">
                  {training.curriculum.map((item, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-semibold">•</span>
                    <span>Depending on level, prior experience may be needed</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold">•</span>
                    <span>Basic computer skills required</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold">•</span>
                    <span>Consistent learning commitment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-8 sticky top-24">
                <p className="text-3xl font-bold text-primary mb-2">${training.price}</p>
                <p className="text-sm text-muted-foreground mb-6">One-time payment</p>
                
                <button className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3 flex items-center justify-center gap-2">
                  Enroll Now <ArrowRight size={18} />
                </button>
                <button className="w-full px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors">
                  Save for Later
                </button>

                {/* Course Info */}
                <div className="mt-8 pt-8 border-t border-border space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-semibold text-foreground">{training.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold text-foreground">{training.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold text-foreground">{training.duration}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-semibold text-foreground">{training.students}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4">About Instructor</h4>
                  <div className="w-full h-16 bg-secondary rounded-lg mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    {training.instructor} is an experienced instructor with expertise in {training.category}.
                  </p>
                  <button className="w-full px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                    View Instructor Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
