'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  ShieldCheck,
  Eye,
  UserCheck,
  FileText,
  Plus,
  Edit3,
  Trash2,
  Download,
  ExternalLink,
  CheckCircle,
  X,
  Search,
  Sparkles,
  ArrowUpRight,
  DollarSign,
  Users,
  Building,
  Check
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'jobs' | 'trainings' | 'proctors' | 'applications' | 'enrollments' | 'mystery' | 'talent'
  >('dashboard');

  const [loading, setLoading] = useState(false);

  // Live Data States
  const [jobs, setJobs] = useState<any[]>(mockJobsList);
  const [trainings, setTrainings] = useState<any[]>(mockTrainingsList);
  const [proctorRequests, setProctorRequests] = useState<any[]>(mockProctorRequests);
  const [applications, setApplications] = useState<any[]>(mockApplications);
  const [enrollments, setEnrollments] = useState<any[]>(mockEnrollments);
  const [mysteryRequests, setMysteryRequests] = useState<any[]>(mockMysteryRequests);
  const [talentPool, setTalentPool] = useState<any[]>(mockTalentPool);

  // Modal States
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<any | null>(null);

  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [editingTraining, setEditingTraining] = useState<any | null>(null);

  const [showProctorModal, setShowProctorModal] = useState(false);
  const [editingProctor, setEditingProctor] = useState<any | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [jobsRes, trainingsRes, appsRes, enrRes, procRes, mystRes, talRes] = await Promise.all([
        supabase.from('jobs').select('*').order('created_at', { ascending: false }),
        supabase.from('training').select('*').order('created_at', { ascending: false }),
        supabase.from('job_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('training_enrollments').select('*').order('created_at', { ascending: false }),
        supabase.from('proctor_job_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('mystery_shopper_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('talent_pool').select('*').order('created_at', { ascending: false }),
      ]);

      if (jobsRes.data && jobsRes.data.length > 0) setJobs(jobsRes.data);
      if (trainingsRes.data && trainingsRes.data.length > 0) setTrainings(trainingsRes.data);
      if (appsRes.data && appsRes.data.length > 0) setApplications(appsRes.data);
      if (enrRes.data && enrRes.data.length > 0) setEnrollments(enrRes.data);
      if (procRes.data && procRes.data.length > 0) setProctorRequests(procRes.data);
      if (mystRes.data && mystRes.data.length > 0) setMysteryRequests(mystRes.data);
      if (talRes.data && talRes.data.length > 0) setTalentPool(talRes.data);
    } catch (err) {
      console.warn('DB fetch warning, utilizing active state:', err);
    } finally {
      setLoading(false);
    }
  };

  // JOB HANDLERS
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const jobData = {
      id: editingJob ? editingJob.id : Date.now().toString(),
      title: formData.get('title'),
      company: formData.get('company'),
      location: formData.get('location'),
      type: formData.get('type'),
      category: formData.get('category'),
      salary_range: formData.get('salary_range'),
      experience_level: formData.get('experience_level'),
      description: formData.get('description'),
    };

    if (editingJob) {
      setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? { ...j, ...jobData } : j)));
      try {
        await supabase.from('jobs').update(jobData).eq('id', editingJob.id);
      } catch (err) {}
    } else {
      setJobs((prev) => [jobData, ...prev]);
      try {
        await supabase.from('jobs').insert([jobData]);
      } catch (err) {}
    }

    setShowJobModal(false);
    setEditingJob(null);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return;
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    try {
      await supabase.from('jobs').delete().eq('id', jobId);
    } catch (err) {}
  };

  // TRAINING HANDLERS
  const handleSaveTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const trainingData = {
      id: editingTraining ? editingTraining.id : Date.now().toString(),
      title: formData.get('title'),
      category: formData.get('category'),
      price: Number(formData.get('price')) || 199,
      duration: formData.get('duration'),
      instructor: formData.get('instructor'),
      mode: formData.get('mode'),
      description: formData.get('description'),
    };

    if (editingTraining) {
      setTrainings((prev) => prev.map((t) => (t.id === editingTraining.id ? { ...t, ...trainingData } : t)));
      try {
        await supabase.from('training').update(trainingData).eq('id', editingTraining.id);
      } catch (err) {}
    } else {
      setTrainings((prev) => [trainingData, ...prev]);
      try {
        await supabase.from('training').insert([trainingData]);
      } catch (err) {}
    }

    setShowTrainingModal(false);
    setEditingTraining(null);
  };

  const handleDeleteTraining = async (trainingId: string) => {
    if (!confirm('Are you sure you want to delete this training module?')) return;
    setTrainings((prev) => prev.filter((t) => t.id !== trainingId));
    try {
      await supabase.from('training').delete().eq('id', trainingId);
    } catch (err) {}
  };

  // PROCTOR HANDLERS
  const handleSaveProctor = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const proctorData = {
      id: editingProctor.id,
      proctor_name: formData.get('proctor_name'),
      company_name: formData.get('company_name'),
      job_title: formData.get('job_title'),
      location: formData.get('location'),
      hiring_type: formData.get('hiring_type'),
      salary_range: formData.get('salary_range'),
      status: formData.get('status'),
    };

    setProctorRequests((prev) => prev.map((p) => (p.id === editingProctor.id ? { ...p, ...proctorData } : p)));
    try {
      await supabase.from('proctor_job_requests').update(proctorData).eq('id', editingProctor.id);
    } catch (err) {}

    setShowProctorModal(false);
    setEditingProctor(null);
  };

  const handleVerifyEnrollment = async (enrollId: string) => {
    setEnrollments((prev) => prev.map((e) => (e.id === enrollId ? { ...e, status: 'verified' } : e)));
    try {
      await supabase.from('training_enrollments').update({ status: 'verified' }).eq('id', enrollId);
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-serif selection:bg-purple-900 selection:text-white">
      {/* 1. LUXURY EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950 text-slate-200 border-r border-slate-800 flex flex-col shrink-0 min-h-screen shadow-2xl">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-slate-950 font-serif font-black text-xs shadow-lg border border-amber-300/40">
              SPS
            </div>
            <div>
              <h1 className="font-serif font-black text-white text-base tracking-tight leading-none">
                SAPPHIRE <span className="text-amber-400 font-serif font-bold">PROSERVE</span>
              </h1>
              <span className="text-[10px] font-serif text-slate-400 tracking-wider uppercase font-semibold">Executive Admin</span>
            </div>
          </Link>
        </div>

        {/* Sidebar Nav items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null },
            { id: 'jobs', label: 'Jobs (Add / Edit)', icon: Briefcase, count: jobs.length },
            { id: 'trainings', label: 'Training Courses (Add / Edit)', icon: BookOpen, count: trainings.length },
            { id: 'proctors', label: 'Proctor Portal (Edit)', icon: ShieldCheck, count: proctorRequests.length },
            { id: 'applications', label: 'Job Applications', icon: FileText, count: applications.length },
            { id: 'enrollments', label: 'Training Enrollments', icon: BookOpen, count: enrollments.length },
            { id: 'mystery', label: 'Mystery Shop Requests', icon: Eye, count: mysteryRequests.length },
            { id: 'talent', label: 'Talent Pool DB', icon: UserCheck, count: talentPool.length },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-serif font-bold transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 shadow-lg font-black'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-center">
          <p className="text-[11px] font-serif text-slate-400">Sapphire ProServe &bull; VIP Admin</p>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200/80 py-4 px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div>
            <span className="text-xs font-serif text-slate-500">Logged in as: <strong className="text-purple-900 font-serif">admin@sapphire.career</strong></span>
            <h2 className="text-xl font-serif font-black text-slate-900 capitalize">
              {activeTab === 'dashboard' ? 'Executive Admin Overview' : activeTab.replace('_', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-xs font-serif font-bold shadow transition-all"
            >
              View Website <ArrowUpRight size={14} />
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-8 flex-1 overflow-y-auto space-y-8">

          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Active Jobs Listed', val: jobs.length, bg: 'bg-emerald-500', icon: Briefcase, action: () => setActiveTab('jobs') },
                  { label: 'Training Enrollments', val: enrollments.length, bg: 'bg-purple-600', icon: BookOpen, action: () => setActiveTab('enrollments') },
                  { label: 'Proctor Requests', val: proctorRequests.length, bg: 'bg-amber-600', icon: ShieldCheck, action: () => setActiveTab('proctors') },
                  { label: 'Mystery Shop Leads', val: mysteryRequests.length, bg: 'bg-blue-600', icon: Eye, action: () => setActiveTab('mystery') },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      onClick={stat.action}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <p className="text-2xl font-serif font-black text-slate-900">{stat.val}</p>
                        <p className="text-xs font-serif text-slate-600 mt-1">{stat.label}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bg} text-white rounded-2xl flex items-center justify-center shadow-md`}>
                        <Icon size={22} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Management Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => setActiveTab('jobs')}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 group-hover:text-purple-800 text-lg">Jobs Management</h3>
                  <p className="text-xs font-serif text-slate-600">Create new corporate job listings, edit salaries, requirements, and delete inactive positions.</p>
                  <span className="inline-block text-xs font-serif font-bold text-purple-800 underline">Manage Jobs &rarr;</span>
                </div>

                <div
                  onClick={() => setActiveTab('trainings')}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center font-bold">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 group-hover:text-purple-800 text-lg">Training Courses</h3>
                  <p className="text-xs font-serif text-slate-600">Add new executive certification programs, adjust fees, duration, and course syllabi.</p>
                  <span className="inline-block text-xs font-serif font-bold text-purple-800 underline">Manage Courses &rarr;</span>
                </div>

                <div
                  onClick={() => setActiveTab('proctors')}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
                >
                  <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 group-hover:text-purple-800 text-lg">Proctor Portal</h3>
                  <p className="text-xs font-serif text-slate-600">Review single proctor postings and team squad outsourcing requests from corporate clients.</p>
                  <span className="inline-block text-xs font-serif font-bold text-purple-800 underline">Manage Proctors &rarr;</span>
                </div>
              </div>

              {/* Recent Applications Summary */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-slate-900 text-base">Recent Candidate Applications</h3>
                  <button onClick={() => setActiveTab('applications')} className="text-xs font-serif text-purple-800 font-bold hover:underline">View All ({applications.length})</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-serif">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">Candidate</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.slice(0, 5).map((app) => (
                        <tr key={app.id}>
                          <td className="p-3 font-bold text-slate-900">{app.full_name || app.fullName}</td>
                          <td className="p-3 text-slate-600">{app.email}</td>
                          <td className="p-3 text-slate-600">{app.city}, {app.country}</td>
                          <td className="p-3 text-slate-500">{new Date(app.created_at || Date.now()).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: JOBS (ADD, EDIT, DELETE) */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-serif font-black text-slate-900">Corporate Job Postings ({jobs.length})</h2>
                  <p className="text-xs font-serif text-slate-600">Add, edit details, or remove active job opportunities.</p>
                </div>
                <button
                  onClick={() => { setEditingJob(null); setShowJobModal(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-900 hover:bg-purple-950 text-white font-serif font-bold rounded-xl text-xs shadow-md transition-all"
                >
                  <Plus size={16} /> Add New Job
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 rounded-full text-[10px] font-bold">{job.category || 'General'}</span>
                        <span className="text-xs font-serif font-bold text-emerald-700">{job.salary_range || job.salary}</span>
                      </div>
                      <h3 className="font-serif font-bold text-slate-900 text-lg">{job.title}</h3>
                      <p className="text-xs font-serif text-slate-600 font-semibold">{job.company} &bull; {job.location}</p>
                      <p className="text-xs font-serif text-slate-500 line-clamp-2">{job.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => { setEditingJob(job); setShowJobModal(true); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg text-xs font-bold hover:bg-purple-100"
                      >
                        <Edit3 size={14} /> Edit Job
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TRAINING COURSES (ADD, EDIT, DELETE) */}
          {activeTab === 'trainings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-serif font-black text-slate-900">Training Courses ({trainings.length})</h2>
                  <p className="text-xs font-serif text-slate-600">Create new training programs, adjust fees and details.</p>
                </div>
                <button
                  onClick={() => { setEditingTraining(null); setShowTrainingModal(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-900 hover:bg-purple-950 text-white font-serif font-bold rounded-xl text-xs shadow-md transition-all"
                >
                  <Plus size={16} /> Add New Course
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trainings.map((tr) => (
                  <div key={tr.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-900 rounded-full text-[10px] font-bold">{tr.category || 'Executive'}</span>
                        <span className="text-sm font-serif font-black text-purple-900">${tr.price}</span>
                      </div>
                      <h3 className="font-serif font-bold text-slate-900 text-lg">{tr.title}</h3>
                      <p className="text-xs font-serif text-slate-600 font-semibold">{tr.instructor} &bull; {tr.duration}</p>
                      <p className="text-xs font-serif text-slate-500 line-clamp-2">{tr.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => { setEditingTraining(tr); setShowTrainingModal(true); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg text-xs font-bold hover:bg-purple-100"
                      >
                        <Edit3 size={14} /> Edit Course
                      </button>
                      <button
                        onClick={() => handleDeleteTraining(tr.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROCTOR PORTAL (EDIT) */}
          {activeTab === 'proctors' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-serif font-black text-slate-900">Proctor Hiring Requests ({proctorRequests.length})</h2>
                <p className="text-xs font-serif text-slate-600">Edit proctor client details, change status, or review squad specifications.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {proctorRequests.map((proc) => (
                  <div key={proc.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1.5 ${
                          proc.hiring_type?.includes('Team') ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-900'
                        }`}>
                          {proc.hiring_type || 'Single Proctor Hiring'}
                        </span>
                        <h3 className="font-serif font-bold text-slate-900 text-base">{proc.job_title || proc.jobTitle}</h3>
                        <p className="text-xs font-serif text-slate-600 font-semibold">{proc.proctor_name || proc.proctorName} &bull; {proc.company_name || proc.companyName}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {proc.status || 'pending'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl text-xs font-serif space-y-1 text-slate-700">
                      <p><strong>Location:</strong> {proc.location}</p>
                      <p><strong>Salary / Rate:</strong> {proc.salary_range || proc.salary_expectation}</p>
                      <p className="truncate"><strong>Contact:</strong> {proc.proctor_email} | {proc.proctor_phone}</p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => { setEditingProctor(proc); setShowProctorModal(true); }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-900 text-white rounded-lg text-xs font-serif font-bold hover:bg-purple-950"
                      >
                        <Edit3 size={14} /> Edit Proctor Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: JOB APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-serif font-black text-slate-900">Job Applications ({applications.length})</h2>
                <p className="text-xs font-serif text-slate-600">Review submitted candidate resumes & contact details.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-serif">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-4">Candidate Name</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">CV Document</th>
                        <th className="p-4">Submitted Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td className="p-4 font-bold text-slate-900">{app.full_name || app.fullName}</td>
                          <td className="p-4 text-slate-600">{app.email}<br /><span className="text-slate-400">{app.phone}</span></td>
                          <td className="p-4 text-slate-600">{app.city}, {app.country}</td>
                          <td className="p-4">
                            <a
                              href={app.cv_url || app.cvUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg text-[11px] font-bold"
                            >
                              <Download size={13} /> View Resume
                            </a>
                          </td>
                          <td className="p-4 text-slate-500">{new Date(app.created_at || Date.now()).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TRAINING ENROLLMENTS */}
          {activeTab === 'enrollments' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-serif font-black text-slate-900">Training Enrollments ({enrollments.length})</h2>
                <p className="text-xs font-serif text-slate-600">Verify student fee payments and approve enrollment badges.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-serif">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-4">Student</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Fee Paid</th>
                        <th className="p-4">Payment Proof</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enrollments.map((enr) => (
                        <tr key={enr.id}>
                          <td className="p-4 font-bold text-slate-900">{enr.client_name || enr.clientName}</td>
                          <td className="p-4 text-slate-600">{enr.client_email || enr.clientEmail}<br /><span className="text-slate-400">{enr.client_phone || enr.clientPhone}</span></td>
                          <td className="p-4 font-bold text-purple-900">${enr.fee_amount || enr.feeAmount || 199}</td>
                          <td className="p-4">
                            <a
                              href={enr.payment_screenshot_url || enr.screenshotUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-lg text-[11px] font-bold"
                            >
                              <ExternalLink size={13} /> View Proof Image
                            </a>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              enr.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {enr.status || 'pending_verification'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {enr.status !== 'verified' && (
                              <button
                                onClick={() => handleVerifyEnrollment(enr.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px]"
                              >
                                Verify Payment
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MYSTERY SHOPPER REQUESTS */}
          {activeTab === 'mystery' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-serif font-black text-slate-900">Mystery Shopper Audit Requests ({mysteryRequests.length})</h2>
                <p className="text-xs font-serif text-slate-600">Store quality check deployments requested by CEOs and business owners.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {mysteryRequests.map((myst) => (
                  <div key={myst.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm font-serif">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{myst.client_name || myst.clientName}</h3>
                        <p className="text-xs text-purple-900 font-semibold">{myst.role_title || myst.roleTitle} &bull; {myst.company_name || myst.companyName}</p>
                      </div>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">{myst.visit_tier || myst.visitTier}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 text-slate-700">
                      <p><strong>Email:</strong> {myst.email}</p>
                      <p><strong>Phone:</strong> {myst.phone}</p>
                      <p><strong>Squad Size:</strong> {myst.team_size || myst.teamSize}</p>
                      <p className="line-clamp-2"><strong>Scope:</strong> {myst.project_scope || myst.projectScope}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TALENT POOL DATABASE */}
          {activeTab === 'talent' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-serif font-black text-slate-900">Executive Talent Pool Database ({talentPool.length})</h2>
                <p className="text-xs font-serif text-slate-600">Headhunter directory for matching candidates to unlisted executive roles.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-serif">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-4">Candidate</th>
                        <th className="p-4">Expertise</th>
                        <th className="p-4">Experience</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">CV Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {talentPool.map((cand) => (
                        <tr key={cand.id}>
                          <td className="p-4 font-bold text-slate-900">{cand.full_name || cand.fullName}</td>
                          <td className="p-4 text-purple-900 font-semibold">{cand.field_of_expertise || cand.fieldOfExpertise}</td>
                          <td className="p-4 text-slate-700">{cand.years_of_experience || cand.yearsOfExperience} Yrs Exp</td>
                          <td className="p-4 text-slate-600">{cand.city}, {cand.country}</td>
                          <td className="p-4">
                            <a
                              href={cand.cv_url || cand.cvUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg text-[11px] font-bold"
                            >
                              <Download size={13} /> View CV
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 3. MODAL: ADD / EDIT JOB */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-serif font-black text-slate-900 text-lg">{editingJob ? 'Edit Job Posting' : 'Add New Job Listing'}</h3>
              <button onClick={() => setShowJobModal(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveJob} className="space-y-4 font-serif text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Job Title *</label>
                  <input name="title" defaultValue={editingJob?.title || ''} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" placeholder="e.g. Senior Operations Manager" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Company Name *</label>
                  <input name="company" defaultValue={editingJob?.company || 'Sapphire ProServe'} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Location *</label>
                  <input name="location" defaultValue={editingJob?.location || 'Remote / Lahore'} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Salary Range *</label>
                  <input name="salary_range" defaultValue={editingJob?.salary_range || editingJob?.salary || '$80,000 - $110,000'} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Category</label>
                  <input name="category" defaultValue={editingJob?.category || 'Executive'} className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Job Type</label>
                  <select name="type" defaultValue={editingJob?.type || 'Full-time'} className="w-full px-3 py-2 bg-slate-50 border rounded-lg">
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Job Description *</label>
                <textarea name="description" rows={3} defaultValue={editingJob?.description || ''} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-purple-900 text-white font-bold rounded-xl shadow-md text-xs">{editingJob ? 'Update Job' : 'Publish Job Listing'}</button>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: ADD / EDIT TRAINING */}
      {showTrainingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-serif font-black text-slate-900 text-lg">{editingTraining ? 'Edit Training Course' : 'Add New Training Course'}</h3>
              <button onClick={() => setShowTrainingModal(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveTraining} className="space-y-4 font-serif text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Course Title *</label>
                  <input name="title" defaultValue={editingTraining?.title || ''} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" placeholder="e.g. Certified Quality Auditor" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Category *</label>
                  <input name="category" defaultValue={editingTraining?.category || 'Operations'} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Price ($) *</label>
                  <input name="price" type="number" defaultValue={editingTraining?.price || 199} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Duration</label>
                  <input name="duration" defaultValue={editingTraining?.duration || '4 Weeks'} className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Instructor</label>
                  <input name="instructor" defaultValue={editingTraining?.instructor || 'Sapphire Executive Team'} className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Course Description *</label>
                <textarea name="description" rows={3} defaultValue={editingTraining?.description || ''} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-purple-900 text-white font-bold rounded-xl shadow-md text-xs">{editingTraining ? 'Update Course' : 'Publish Course'}</button>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: EDIT PROCTOR REQUEST */}
      {showProctorModal && editingProctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-serif font-black text-slate-900 text-lg">Edit Proctor Hiring Request</h3>
              <button onClick={() => setShowProctorModal(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveProctor} className="space-y-4 font-serif text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Client Name *</label>
                  <input name="proctor_name" defaultValue={editingProctor.proctor_name || editingProctor.proctorName} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Company Name *</label>
                  <input name="company_name" defaultValue={editingProctor.company_name || editingProctor.companyName} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Project / Job Title *</label>
                  <input name="job_title" defaultValue={editingProctor.job_title || editingProctor.jobTitle} required className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Hiring Scope</label>
                  <select name="hiring_type" defaultValue={editingProctor.hiring_type} className="w-full px-3 py-2 bg-slate-50 border rounded-lg">
                    <option value="Single Proctor Hiring">Single Proctor Hiring</option>
                    <option value="Team Hiring (Outsourcing & Kickstart)">Team Hiring (Outsourcing & Kickstart)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Location</label>
                  <input name="location" defaultValue={editingProctor.location} className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Status</label>
                  <select name="status" defaultValue={editingProctor.status || 'pending'} className="w-full px-3 py-2 bg-slate-50 border rounded-lg">
                    <option value="pending">pending</option>
                    <option value="approved">approved</option>
                    <option value="contacted">contacted</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Salary / Budget Expectation</label>
                <input name="salary_range" defaultValue={editingProctor.salary_range || editingProctor.salary_expectation} className="w-full px-3 py-2 bg-slate-50 border rounded-lg" />
              </div>
              <button type="submit" className="w-full py-3 bg-purple-900 text-white font-bold rounded-xl shadow-md text-xs">Save Proctor Details</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Initial Live Mock Data Sets
const mockJobsList = [
  {
    id: '1',
    title: 'Senior Operations Director',
    company: 'Sapphire ProServe',
    location: 'Lahore / Remote',
    salary_range: '$120,000 - $150,000',
    category: 'Executive',
    type: 'Full-time',
    description: 'Oversee regional team deployments, client proctoring logistics, and quality assurance metrics.',
  },
  {
    id: '2',
    title: 'Certified Lead Proctor / Invigilator',
    company: 'Nexus Academic Systems',
    location: 'Karachi / On-site',
    salary_range: '$60,000 - $80,000',
    category: 'Proctoring',
    type: 'Full-time',
    description: 'Lead examination integrity monitoring teams across high-security examination halls.',
  },
];

const mockTrainingsList = [
  {
    id: '1',
    title: 'Certified Corporate Proctor Training',
    category: 'Proctoring',
    price: 199,
    duration: '4 Weeks',
    instructor: 'Sapphire Academic Board',
    description: 'Comprehensive certification in exam security, candidate verification, and LMS proctoring tools.',
  },
  {
    id: '2',
    title: 'Mystery Shopper Leadership Certification',
    category: 'Auditing',
    price: 249,
    duration: '6 Weeks',
    instructor: 'Executive Audit Team',
    description: 'Train to lead high-level retail customer experience and cashier honesty audits.',
  },
];

const mockProctorRequests = [
  {
    id: 'p1',
    proctor_name: 'Dr. Tariq Mahmood',
    company_name: 'Apex Testing Services',
    job_title: '15-Member Exam Proctoring Squad',
    hiring_type: 'Team Hiring (Outsourcing & Kickstart)',
    location: 'Islamabad Center',
    salary_range: '$12,000 Total Project Budget',
    proctor_email: 'tariq@apextesting.com',
    proctor_phone: '+92 300 1234567',
    status: 'pending',
  },
];

const mockApplications = [
  {
    id: 'a1',
    full_name: 'Hassan Ahmed',
    email: 'hassan.ahmed@gmail.com',
    phone: '+92 321 9876543',
    city: 'Karachi',
    country: 'Pakistan',
    cv_url: '#',
    created_at: new Date().toISOString(),
  },
];

const mockEnrollments = [
  {
    id: 'e1',
    client_name: 'Ayesha Khan',
    client_email: 'ayesha.k@gmail.com',
    client_phone: '+92 333 4567890',
    fee_amount: 199,
    payment_screenshot_url: '#',
    status: 'pending_verification',
  },
];

const mockMysteryRequests = [
  {
    id: 'm1',
    client_name: 'Zubair Raza (CEO)',
    company_name: 'Royal Retail Group',
    role_title: 'Chief Executive Officer',
    email: 'zubair@royalretail.com',
    phone: '+92 321 6714725',
    visit_tier: '7 - 10 Visits',
    team_size: '5 Specialists',
    project_scope: 'Audit cashier honesty, branch cleanliness, and staff greeting etiquette across 8 retail stores.',
  },
];

const mockTalentPool = [
  {
    id: 't1',
    full_name: 'Kamran Shah',
    field_of_expertise: 'Quality Auditing & HR Management',
    years_of_experience: 8,
    city: 'Lahore',
    country: 'Pakistan',
    cv_url: '#',
  },
];
