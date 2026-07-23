'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/common/StatCard';
import { Briefcase, BookOpen, Award, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your career today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              label="Active Applications"
              value="12"
              icon={<Briefcase size={24} />}
              trend="up"
              trendValue="2 new this week"
            />
            <StatCard
              label="Courses Enrolled"
              value="3"
              icon={<BookOpen size={24} />}
              trend="up"
              trendValue="1 in progress"
            />
            <StatCard
              label="Certificates Earned"
              value="5"
              icon={<Award size={24} />}
              trend="up"
              trendValue="+1 this month"
            />
            <StatCard
              label="Profile Completion"
              value="85%"
              icon={<Settings size={24} />}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Explore New Opportunities</h2>
              <p className="text-muted-foreground mb-6">
                Browse through thousands of job listings and find positions that match your skills and interests.
              </p>
              <Link
                href="/jobs"
                className="inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Enhance Your Skills</h2>
              <p className="text-muted-foreground mb-6">
                Enroll in professional training courses to stay ahead and advance your career.
              </p>
              <Link
                href="/training"
                className="inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View Courses
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Applied to Senior Product Designer at TechCorp', date: '2 days ago' },
                { action: 'Enrolled in Advanced React Patterns', date: '1 week ago' },
                { action: 'Completed React Hooks Deep Dive certification', date: '2 weeks ago' },
                { action: 'Bookmarked 5 new job listings', date: '3 weeks ago' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:pb-0 last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-foreground">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
