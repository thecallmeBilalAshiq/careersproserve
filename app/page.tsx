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
  Award,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const featuredJobs = mockJobs.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-purple-700 selection:text-white">
      <Navbar />

      {/* FORTUNE 500 WORLD-CLASS EXECUTIVE HERO SECTION */}
      <section className="relative py-24 lg:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-purple-100/40 via-white to-slate-50">
        {/* Subtle Luxury Glow Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-br from-purple-200/50 via-indigo-100/40 to-amber-100/30 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-emerald-100/40 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-10 text-center">
          {/* Executive Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 border border-purple-200/90 rounded-full text-purple-900 text-xs font-serif font-bold shadow-md backdrop-blur-md"
          >
            <Sparkles size={14} className="text-amber-600 animate-spin" />
            <span className="tracking-wide">
              SAPPHIRE PRO SERVE &bull; WORLD-CLASS EXECUTIVE & AUDIT ECOSYSTEM
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>

          {/* Times New Roman Style Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-slate-900 leading-[1.12]"
          >
            Empowering Executive Careers. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent italic font-serif">
              Verified Talent, Proctors & Audits.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Sapphire Pro Serve delivers Fortune 500 level operations coaching, executive talent headhunting, certified proctor outsourcing, and mystery shopper auditing—with zero friction.
          </motion.p>

          {/* Executive Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center items-center pt-4"
          >
            <Link
              href="/jobs"
              className="px-8 py-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 hover:from-purple-950 hover:to-indigo-950 text-white font-bold rounded-xl text-sm transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2.5 border border-purple-400/20"
            >
              <Briefcase size={18} /> Explore Executive Jobs (Apply CV)
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/portfolio"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-sm border border-slate-300 hover:border-purple-400 transition-all flex items-center gap-2 shadow-md"
            >
              <Award size={18} className="text-purple-700" /> Executive Profile & Portfolio
            </Link>
          </motion.div>

          {/* Micro Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-200/80"
          >
            {[
              { number: '10+ Yrs', label: 'Executive QSR Leadership', color: 'text-purple-800' },
              { number: '3,000+', label: 'Candidates Recruited', color: 'text-indigo-800' },
              { number: '5,000+', label: 'Professionals Trained', color: 'text-emerald-700' },
              { number: '100+', label: 'Audit & Mystery Shops', color: 'text-amber-700' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className={`text-2xl sm:text-3xl font-serif font-black ${stat.color}`}>{stat.number}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-extrabold">{stat.label}</p>
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
            <span className="font-bold text-slate-900">Live Corporate Status:</span> Sapphire Pro Serve Operational
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-slate-500">
            <span>Official Email: <strong className="text-purple-700">{COMPANY_DETAILS.email}</strong></span>
            <span>WhatsApp Support: <strong className="text-emerald-600">{COMPANY_DETAILS.whatsappDisplay}</strong></span>
          </div>
        </div>
      </section>

      {/* Core 6 Executive Service Modules */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 bg-purple-100 border border-purple-200 rounded-full text-purple-800 text-xs font-extrabold uppercase tracking-widest">
            Executive Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900">
            6 Core Modules Designed For Sapphire Pro Serve
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From candidate job applications to proctor outsourcing, team trainings, and mystery audits—Sapphire Pro Serve guarantees excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Jobs & CV */}
          <div className="group bg-white border border-slate-200 hover:border-purple-400 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center text-purple-700 mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">1. Guest Job Applications</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Browse curated jobs across QSR, IT, Healthcare, Engineering & Finance. Upload CV resumes directly without registering an account.
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-800 group-hover:translate-x-1 transition-all"
            >
              Browse Jobs & Apply <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 2: Training */}
          <div className="group bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-center text-indigo-700 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">2. Corporate Staff Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Enroll in specialized restaurant & service etiquette certifications designed by Sapphire Loyal (CHRP).
            </p>
            <Link
              href="/training"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 hover:text-indigo-800 group-hover:translate-x-1 transition-all"
            >
              Explore Courses <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 3: Proctor Submissions */}
          <div className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">3. Proctor Hiring & Outsourcing</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Single and Team Hiring for examination and event proctoring with customized roles, specifications, and instant approval.
            </p>
            <Link
              href="/proctors/submit-job"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all"
            >
              Submit Proctor Requirement <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 4: Mystery Shoppers */}
          <div className="group bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 transition-transform">
              <Eye size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">4. Mystery Shopper Audits</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Deploy certified evaluation squads across 3-5, 5-7, 7-10, or 15-20 outstation audit visits for QA compliance.
            </p>
            <Link
              href="/mystery-shopper"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 group-hover:translate-x-1 transition-all"
            >
              Request Mystery Audit Squad <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 5: Talent Pool */}
          <div className="group bg-white border border-slate-200 hover:border-purple-400 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center text-purple-700 mb-6 group-hover:scale-110 transition-transform">
              <UserCheck size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">5. Executive Talent Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Register your candidate CV for long-term database storage. Corporate clients query our pool for executive recruitment.
            </p>
            <Link
              href="/talent-pool"
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-800 group-hover:translate-x-1 transition-all"
            >
              Join Talent Vault <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 6: Admin Dashboard */}
          <div className="group bg-white border border-slate-200 hover:border-rose-400 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-center text-rose-700 mb-6 group-hover:scale-110 transition-transform">
              <Lock size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">6. Master Admin Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Unified administrative control panel to manage applications, verify candidates, approve proctor jobs, and review mystery shopper leads.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 hover:text-rose-800 group-hover:translate-x-1 transition-all"
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
              <span className="text-xs font-bold text-purple-700 uppercase tracking-widest block mb-1">Immediate Hiring</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">Featured Opportunities</h2>
            </div>
            <Link
              href="/jobs"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-purple-900 font-bold rounded-xl text-xs border border-slate-300 transition-all flex items-center gap-2"
            >
              View All Jobs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-400 transition-all shadow-sm hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-purple-100 border border-purple-200 text-purple-800 text-[10px] font-bold rounded-full">
                      {job.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{job.type}</span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">{job.title}</h3>
                  <p className="text-xs text-slate-600">{job.company} &bull; {job.location}</p>
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-700">
                    Verified Job
                  </p>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3.5 py-1.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
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
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-slate-50 border border-purple-200 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="px-3.5 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
                VIP Corporate Audits
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 leading-tight">
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
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-serif flex items-center justify-center font-black">
                    SPS
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-slate-900">Executive Audit Overview</h4>
                    <p className="text-xs text-slate-500">Sapphire Pro Serve Operations</p>
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
                  <span className="font-bold text-purple-700">{COMPANY_DETAILS.whatsappDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & WhatsApp Floating CTA Banner */}
      <section className="py-16 px-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-serif font-black text-slate-900">Have Questions or Custom Demands?</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Contact our executive team via official email <strong className="text-purple-700">{COMPANY_DETAILS.email}</strong> or get an immediate response on WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Sapphire%20Pro%20Serve`}
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
