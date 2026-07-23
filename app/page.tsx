'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ApplyJobModal } from '@/components/common/ApplyJobModal';
import { mockJobs } from '@/lib/mockData';
import { COMPANY_DETAILS } from '@/lib/constants';
import {
  Briefcase,
  BookOpen,
  ShieldCheck,
  Eye,
  UserCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Lock,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const featuredJobs = mockJobs.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 border-b border-slate-200 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
        {/* Floating Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-400/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-purple-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8 text-center">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-full text-blue-700 text-xs font-bold shadow-md"
          >
            <Sparkles size={14} className="text-blue-600 animate-spin" />
            <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Careers Pro Serve Platform &bull; Next-Gen Job & Audit Ecosystem
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15]"
          >
            Empowering Careers. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Verified Hiring & Corporate Audits.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            The all-in-one corporate platform for candidate job applications, professional training programs, certified proctor hiring, and mystery shopper audits — with zero login friction.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center items-center pt-4"
          >
            <Link
              href="/jobs"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl text-sm transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              <Briefcase size={18} /> Explore Jobs (Upload CV)
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/mystery-shopper"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-sm border border-slate-300 hover:border-emerald-500 transition-all flex items-center gap-2 shadow-md"
            >
              <Eye size={18} className="text-emerald-600" /> Hire Mystery Shopper Team
            </Link>
          </motion.div>

          {/* Micro Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-200"
          >
            {[
              { number: '100%', label: 'No Login Friction' },
              { number: '24/7', label: 'Cloudinary CV Storage' },
              { number: 'Certified', label: 'Proctor Job Approval' },
              { number: 'Nationwide', label: 'Mystery Shopper Squads' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-blue-600">{stat.number}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Market Stats Ticker */}
      <section className="py-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900">Live Platform Status:</span> All 7 Executive Modules Active
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-slate-500">
            <span>Official Email: <strong className="text-blue-600">{COMPANY_DETAILS.email}</strong></span>
            <span>WhatsApp Support: <strong className="text-emerald-600">{COMPANY_DETAILS.whatsappDisplay}</strong></span>
          </div>
        </div>
      </section>

      {/* Core 7 Service Modules Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-xs font-extrabold uppercase tracking-widest">
            Full-Stack Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
            7 Executive Modules Built For High Velocity
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From guest job applications to certified proctor requests and corporate audits — Careers Pro Serve delivers seamless execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Jobs & CV */}
          <div className="group bg-white border border-slate-200 hover:border-blue-500/60 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Guest Job Applications</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Browse curated jobs across IT, Healthcare, Engineering & Finance. Upload CV resumes directly via Cloudinary without registering an account.
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all"
            >
              Browse Jobs & Apply <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 2: Training */}
          <div className="group bg-white border border-slate-200 hover:border-purple-500/60 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Corporate & Individual Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Enroll in professional certification programs for Individuals or Corporate Teams. Choose from multiple high-demand topics.
            </p>
            <Link
              href="/training"
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-all"
            >
              Explore Courses <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 3: Proctor Submissions */}
          <div className="group bg-white border border-slate-200 hover:border-emerald-500/60 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Proctor Hiring & Outsourcing</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Single and Team Hiring (Outsourcing & Kickstart). Submit proctor requirements or candidate postings for instant Admin verification.
            </p>
            <Link
              href="/proctors/submit-job"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-1 transition-all"
            >
              Submit Proctor Job <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 4: Mystery Shoppers */}
          <div className="group bg-white border border-slate-200 hover:border-amber-500/60 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Eye size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">4. Mystery Shopper Squads</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              CEOs and business owners can deploy certified mystery shoppers for 3-5, 5-7, 7-10, or 15-20 outstation audit visits.
            </p>
            <Link
              href="/mystery-shopper"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 group-hover:translate-x-1 transition-all"
            >
              Request Audit Squad <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 5: Talent Pool */}
          <div className="group bg-white border border-slate-200 hover:border-blue-500/60 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <UserCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">5. Executive Talent Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Register your executive candidate profile for long-term database storage. Corporate clients query our pool for executive headhunting.
            </p>
            <Link
              href="/talent-pool"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all"
            >
              Join Talent Vault <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 6: Admin Dashboard */}
          <div className="group bg-white border border-slate-200 hover:border-pink-500/60 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-pink-50 border border-pink-200 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
              <Lock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">6. Master Admin Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Unified administrative control panel to manage applications, verify candidates, approve proctor jobs, and review mystery shopper leads.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 group-hover:translate-x-1 transition-all"
            >
              Open Admin Portal <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Interactive Showcase */}
      <section className="py-20 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Immediate Hiring</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Featured Opportunities</h2>
            </div>
            <Link
              href="/jobs"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-blue-700 font-bold rounded-xl text-xs border border-slate-300 transition-all flex items-center gap-2"
            >
              View All Jobs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-bold rounded-full">
                      {job.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{job.type}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{job.title}</h3>
                  <p className="text-xs text-slate-600">{job.company} &bull; {job.location}</p>
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-700">
                    Verified Job
                  </p>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    Apply CV
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Mystery Shopper Spotlight */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-purple-50 border border-blue-200 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="px-3.5 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
                VIP Corporate Audits
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
                Hire Certified Mystery Shopper Teams
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Are you a CEO, Business Owner, or Retail Executive? Deploy mystery evaluation squads across your branch locations for 3-5, 5-7, 7-10, or 15-20 outstation audit visits.
              </p>

              <div className="space-y-3">
                {[
                  'Certified Field Audit Specialists',
                  'Comprehensive 50-Point Evaluation Reports',
                  'Staff Integrity & Cashier Compliance Checks',
                  'Direct Executive Director Consultation',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/mystery-shopper"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <Eye size={18} /> Request Mystery Audit Squad
                </Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                    MS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Executive Audit Overview</h4>
                    <p className="text-xs text-slate-500">Careers Pro Serve Operations</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Active Service
                </span>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Evaluation Scope:</span>
                  <span className="font-bold text-slate-900">3-5, 5-7, 7-10, 15-20 Visits</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Turnaround Time:</span>
                  <span className="font-bold text-slate-900">Detailed Report within 48 Hours</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Official Contact:</span>
                  <span className="font-bold text-blue-600">{COMPANY_DETAILS.whatsappDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & WhatsApp Floating CTA Banner */}
      <section className="py-16 px-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black text-slate-900">Have Questions or Custom Demands?</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Contact our executive team via official email <strong className="text-blue-600">{COMPANY_DETAILS.email}</strong> or get an immediate response on WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Careers%20Pro%20Serve`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <MessageSquare size={18} /> Chat on WhatsApp ({COMPANY_DETAILS.whatsappDisplay})
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 transition-all flex items-center gap-2"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {selectedJob && (
        <ApplyJobModal
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          company={selectedJob.company}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      <Footer />
    </div>
  );
}
