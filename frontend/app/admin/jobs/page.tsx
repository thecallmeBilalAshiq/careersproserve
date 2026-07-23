'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  status: string;
  created_at: string;
}

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    checkAdminAndLoadJobs();
  }, []);

  const checkAdminAndLoadJobs = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login');
        return;
      }

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!adminUser || adminUser.role !== 'admin') {
        router.push('/admin/login');
        return;
      }

      setIsAdmin(true);

      // Load jobs
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      setJobs(jobsData || []);
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const { error } = await supabase.from('jobs').delete().eq('id', jobId);

      if (!error) {
        setJobs(jobs.filter((j) => j.id !== jobId));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-muted-foreground" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Jobs Management</h1>
          </div>
          <Link
            href="/admin/jobs/create"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground px-4 py-2 rounded-lg font-semibold transition-all"
          >
            <Plus size={20} />
            New Job
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No jobs posted yet</p>
            <Link
              href="/admin/jobs/create"
              className="text-primary hover:underline font-semibold"
            >
              Create the first job
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    job.status === 'open'
                      ? 'bg-green-400/20 text-green-400'
                      : 'bg-red-400/20 text-red-400'
                  }`}>
                    {job.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="text-foreground">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Salary Range</p>
                    <p className="text-foreground">
                      ${(job.salary_min || 0).toLocaleString()} - ${(job.salary_max || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Posted: {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
