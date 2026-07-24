import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_DETAILS } from '@/lib/constants';
import { ArrowRight, Target, Users, Mail, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-purple-700 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-100/40 via-white to-slate-50 border-b border-slate-200/80 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-900 text-sm font-serif font-bold shadow-sm">
            <Sparkles size={16} className="text-amber-600 animate-spin" /> Official Corporate Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tight">
            Sapphire <span className="bg-gradient-to-r from-purple-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent italic font-serif">ProServe</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-serif">
            Empowering professionals, connecting certified proctors, training ambitious talent, and delivering corporate audit solutions.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Sapphire%20ProServe`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <MessageSquare size={18} /> WhatsApp Contact ({COMPANY_DETAILS.whatsappDisplay})
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-serif font-bold rounded-xl border border-slate-300 transition-all flex items-center gap-2 text-sm"
            >
              <Mail size={18} /> {COMPANY_DETAILS.email}
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-lg">
            <div className="w-14 h-14 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center mx-auto text-purple-700">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-serif">
              To provide zero-barrier career advancement for candidates, proctors, and organizations with immediate automated recruitment workflows.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-lg">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-center mx-auto text-indigo-700">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Certified Proctors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our network of certified proctors ensures authentic, verified job placement and high-standard executive hiring evaluations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-lg">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-700">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Mystery Shopper Auditing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deploying full field mystery shopper and operational quality audit teams for founders, CEOs, and retail chains nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-white border border-slate-200 rounded-3xl p-10 space-y-6 shadow-xl">
          <h2 className="text-3xl font-serif font-black text-slate-900">Ready to Connect With Sapphire ProServe?</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">Explore open jobs without logging in, apply for training certifications, or submit your profile to our talent pool.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jobs"
              className="px-8 py-3.5 bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              Browse Open Jobs <ArrowRight size={18} />
            </Link>
            <Link
              href="/talent-pool"
              className="px-8 py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
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
