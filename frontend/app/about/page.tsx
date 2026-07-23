import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_DETAILS } from '@/lib/constants';
import { ArrowRight, Heart, Target, Users, Mail, Phone, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold">
            <Sparkles size={14} /> Official Company Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Careers Pro Serve
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Empowering professionals, connecting certified proctors, training ambitious talent, and delivering corporate audit solutions.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Careers%20Pro%20Serve`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <MessageSquare size={18} /> WhatsApp Contact ({COMPANY_DETAILS.whatsappDisplay})
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-sm"
            >
              <Mail size={18} /> {COMPANY_DETAILS.email}
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To provide zero-barrier career advancement for candidates, proctors, and organizations with immediate automated recruitment workflows.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center mx-auto text-purple-400">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Certified Proctors</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our network of certified proctors ensures authentic, verified job placement and high-standard executive hiring evaluations.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Mystery Shopper Auditing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploying full field mystery shopper and operational quality audit teams for founders, CEOs, and retail chains nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-slate-900 border border-slate-800 rounded-3xl p-10 space-y-6 shadow-2xl">
          <h2 className="text-3xl font-black text-white">Ready to Connect With Careers Pro Serve?</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">Explore open jobs without logging in, apply for training certifications, or submit your profile to our talent pool.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jobs"
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              Browse Open Jobs <ArrowRight size={18} />
            </Link>
            <Link
              href="/talent-pool"
              className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              Join Talent Pool
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
