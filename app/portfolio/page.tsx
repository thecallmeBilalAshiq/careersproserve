'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Sparkles,
  Award,
  Users,
  BarChart3,
  Target,
  Briefcase,
  Mail,
  Download,
  RotateCw,
  CheckCircle2,
  Building,
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  MessageSquare,
  Globe,
} from 'lucide-react';

export default function PortfolioPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  const stats = [
    { count: '3,000+', label: 'Candidates Recruited', desc: 'Across national & international QSR brands', icon: Users, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { count: '5,000+', label: 'Employees Trained', desc: 'Service etiquette, SOPs, safety & leadership', icon: Award, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { count: '100+', label: 'Audits & Mystery Shops', desc: 'Quality assurance & compliance checks', icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { count: '10+ Yrs', label: 'Executive Leadership', desc: 'KFC, Burger King, Papa John’s & COLABS', icon: TrendingUp, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  ];

  const consultancyServices = [
    {
      title: 'Comprehensive Staff Training',
      description: 'Extensive training for restaurant staff from customer service etiquette to operational SOPs, ensuring impeccable service.',
      category: 'People & Culture',
      icon: Users,
    },
    {
      title: 'Strategic Menu Optimization',
      description: 'Collaborative menu fine-tuning using data-driven insights, profitability analysis & streamlined prep strategies.',
      category: 'Operations',
      icon: BarChart3,
    },
    {
      title: 'Operational Efficiency Enhancement',
      description: 'Refined kitchen and front-of-house workflows to reduce wait times and deliver a delightful dining experience.',
      category: 'Optimization',
      icon: Zap,
    },
    {
      title: 'Front-of-House Excellence',
      description: 'Elevated guest interactions with polished greetings, seating etiquette, and flawless table service.',
      category: 'Hospitality',
      icon: Star,
    },
    {
      title: 'Back-of-House & Culinary SOPs',
      description: 'Guiding kitchen teams in culinary techniques, waste minimization, and organized workspace maintenance.',
      category: 'Operations',
      icon: Building,
    },
    {
      title: 'Strategic Inventory Control',
      description: 'Inventory strategies, prudent ordering solutions, storage management & meticulous tracking to eliminate waste.',
      category: 'Cost Control',
      icon: TrendingUp,
    },
    {
      title: 'Health & Food Safety Compliance',
      description: 'Rigorous food safety protocols, hygiene standards, and regulatory health compliance training.',
      category: 'Compliance',
      icon: ShieldCheck,
    },
    {
      title: 'Leadership Nurturing & LEAD Program',
      description: 'Empowering supervisors and managers with conflict resolution, team management, and motivational skills.',
      category: 'Leadership',
      icon: Award,
    },
    {
      title: 'Mystery Shopper Action Plans',
      description: 'Targeted operational growth powered by real mystery shopper data and action-oriented staff feedback.',
      category: 'Auditing',
      icon: Target,
    },
    {
      title: 'Artful Upselling & Menu Presentation',
      description: 'Train servers for persuasive upselling and artful presentation to maximize check averages and revenue.',
      category: 'Sales Growth',
      icon: Sparkles,
    },
    {
      title: 'Crisis & Grievance Management',
      description: 'Equipping teams to handle emergencies, guest grievances, and unexpected incidents with calm efficiency.',
      category: 'Risk Management',
      icon: ShieldCheck,
    },
    {
      title: 'Custom Brand Launch Workshops',
      description: 'Tailored workshops designed specifically for new store openings, expansions, or corporate rebrands.',
      category: 'Workshops',
      icon: Briefcase,
    },
  ];

  const careerTimeline = [
    {
      role: 'Training and Standards Specialist',
      company: 'COLABS',
      period: 'October 2023 – Present (2 yrs 10 mos)',
      location: 'Lahore, Punjab, Pakistan',
      description: 'Leading training initiatives and service quality standards in hospitality. Designing internal certifications, elevating guest experiences, and fostering an empathetic, performance-driven culture.',
      badge: 'Current Role',
      accent: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      role: 'Founder & CEO',
      company: 'Sapphire ProServe Consultancy',
      period: 'August 2023 – Present (3 yrs)',
      location: 'Pakistan / Global Consultancy',
      description: 'Directing freelance restaurant operations coaching, customized staff training, menu engineering, mystery shopper audits, and supervisor leadership development programs.',
      badge: 'Founder & CEO',
      accent: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      role: 'Sr. Trainings Executive',
      company: 'Papa John’s Pakistan',
      period: 'June 2022 – October 2023 (1 yr 5 mos)',
      location: 'Pakistan',
      description: 'Adept at designing and executing high-impact learning programs, closing performance gaps, and amplifying guest experiences for measurable bottom-line growth.',
      badge: 'Corporate Executive',
      accent: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      role: 'Training Manager',
      company: 'Burger King Pakistan',
      period: 'March 2021 – June 2022 (1 yr 4 mos)',
      location: 'Pakistan',
      description: 'Designed comprehensive learning modules across all levels, implemented engaging workshops, measured training effectiveness, and cultivated operational pride.',
      badge: 'Management',
      accent: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      role: 'Assistant Restaurant Manager',
      company: 'KFC Pakistan',
      period: 'January 2020 – March 2021 (1 yr 3 mos)',
      location: 'Lahore, Punjab, Pakistan',
      description: 'Optimized front-of-house and back-of-house workflows, managed inventory control, and upheld strict food safety and customer satisfaction standards.',
      badge: 'Operations',
      accent: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      role: 'Assistant Manager Training',
      company: 'Burger King Pakistan',
      period: 'February 2019 – January 2020 (1 yr)',
      location: 'Pakistan',
      description: 'Developed talent development pathways, conducted hands-on skills workshops, and provided constructive coaching to boost staff retention and operational quality.',
      badge: 'Training',
      accent: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      role: 'Shift Manager',
      company: 'Burger King Pakistan',
      period: 'August 2018 – January 2019 (6 mos)',
      location: 'Lahore, Punjab, Pakistan',
      description: 'Overseeing daily restaurant shifts, inventory management, product freshness, and customer satisfaction during peak service hours.',
      badge: 'Shift Leadership',
      accent: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    },
    {
      role: 'Guest Relations Officer',
      company: 'Burger King Pakistan',
      period: 'March 2016 – August 2018 (2 yrs 6 mos)',
      location: 'Lahore, Punjab, Pakistan',
      description: 'Pioneered patron rapport building, managed customer feedback & special requests, and created unforgettable dining memories.',
      badge: 'Guest Relations',
      accent: 'bg-teal-100 text-teal-800 border-teal-200',
    },
    {
      role: 'Customer Sales Representative',
      company: 'KFC Pakistan',
      period: 'June 2014 – March 2016 (1 yr 10 mos)',
      location: 'Lahore, Pakistan',
      description: 'Customer-centric transactions, tailored order recommendations, and delivering welcoming customer experiences at POS registers.',
      badge: 'Foundational Role',
      accent: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-purple-600 selection:text-white">
      <Navbar />

      {/* Decorative Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-purple-100/60 via-indigo-50/50 to-emerald-50/60 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-purple-100/50 blur-[150px] rounded-full" />
      </div>

      <main className="flex-1 relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        {/* HERO SECTION - 3D FLIP CARD LANDING */}
        <section className="bg-white/90 border border-slate-200/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/80 via-indigo-50/50 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-purple-800 text-xs font-serif font-bold shadow-sm">
                <Sparkles size={14} className="text-purple-600 animate-spin" />
                CEO & FOUNDER &bull; SAPPHIRE PRO SERVE
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-slate-900 tracking-tight leading-[1.1]">
                Sapphire Loyal <span className="text-purple-700 font-extrabold text-2xl sm:text-3xl ml-1 font-sans">CHRP</span>
              </h1>

              <p className="text-lg md:text-xl text-purple-900 font-serif font-bold leading-snug">
                Empowering Service Excellence Through <span className="bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-700 bg-clip-text text-transparent italic">People, Process & Performance</span>
              </p>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                With over a decade of hands-on leadership at multinational QSR giants—<strong className="text-slate-900">KFC, Burger King, Papa John’s, and COLABS</strong>—I help hospitality brands build high-performing teams, optimize menu engineering, and enforce top-tier operational standards.
              </p>

              {/* Stat Highlights Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  '3,000+ Candidates Recruited',
                  '5,000+ Employees Trained',
                  '100+ Compliance Audits',
                  'Creator of LEAD Program',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 font-bold shadow-sm">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/Sapphire_Loyal_Profile.pdf"
                  download="Sapphire_Loyal_Profile.pdf"
                  className="px-6 py-3.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Download size={16} /> Download Executive Profile PDF
                </a>
                <a
                  href="https://wa.me/923216714725?text=Hello%20Sapphire%20Loyal,%20I%20am%20interested%20in%20your%20Executive%20Consultancy%20and%20Training%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/10 transition-all flex items-center gap-2"
                >
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: 3D Animated Flip Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm h-[490px] [perspective:1000px]">
                <div
                  className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-purple-200 p-6 flex flex-col justify-between shadow-xl shadow-purple-950/10 [backface-visibility:hidden]">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-[10px] font-extrabold text-purple-800 tracking-wider">
                        CHRP CERTIFIED CEO
                      </span>
                      <button
                        onClick={() => setIsFlipped(true)}
                        className="px-3 py-1 bg-slate-100 hover:bg-purple-100 text-purple-700 text-[11px] font-bold rounded-lg border border-purple-200 transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <RotateCw size={13} className="animate-spin text-purple-600" /> 3D Flip Card
                      </button>
                    </div>

                    {/* Executive Image Frame */}
                    <div className="relative w-44 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-purple-300 shadow-xl shadow-purple-900/15 group">
                      <Image
                        src="/saphire.jpeg"
                        alt="Sapphire Loyal - Owner & CEO"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-1">
                      <h3 className="text-xl font-black text-slate-900">Sapphire Loyal</h3>
                      <p className="text-xs text-purple-700 font-extrabold">Founder & CEO – Sapphire ProServe</p>
                      <p className="text-[11px] text-slate-500">Lahore, Punjab, Pakistan</p>
                    </div>

                    <button
                      onClick={() => setIsFlipped(true)}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                    >
                      Click to View Founder Bio & Quote <RotateCw size={14} />
                    </button>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 border-2 border-purple-400 p-6 flex flex-col justify-between shadow-2xl text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-purple-800/80 border border-purple-400/40 rounded-full text-[10px] font-black text-purple-200 tracking-wider">
                        FOUNDER STATEMENT
                      </span>
                      <button
                        onClick={() => setIsFlipped(false)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-purple-200 text-[11px] font-bold rounded-lg border border-purple-400/30 transition-all flex items-center gap-1.5"
                      >
                        <RotateCw size={13} /> Flip Back
                      </button>
                    </div>

                    <div className="space-y-3 my-auto text-center">
                      <div className="text-amber-400 text-3xl font-serif">“</div>
                      <p className="text-xs md:text-sm text-slate-100 italic leading-relaxed font-serif">
                        At ProServe Consultancy, our goal is simple: to support QSR brands with the right people, processes, and purpose. Watching someone grow into their best self is my biggest reward.
                      </p>
                      <p className="text-[11px] text-purple-300 font-bold uppercase tracking-wider">— Sapphire Loyal, CHRP</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-purple-700/50">
                      <a
                        href="mailto:sapphireloyal@gmail.com"
                        className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-purple-300/30"
                      >
                        <Mail size={14} className="text-purple-300" /> sapphireloyal@gmail.com
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sapphireloyal-chrp-7b0522186"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow"
                      >
                        <Globe size={14} /> Connect on LinkedIn
                      </a>
                      <button
                        onClick={() => setIsFlipped(false)}
                        className="w-full py-2 bg-slate-800 text-slate-200 hover:text-white text-xs font-bold rounded-lg border border-slate-700"
                      >
                        Return to Front ↺
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS COUNTER BAR */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-lg shadow-purple-950/5 hover:border-purple-300 transition-all hover:-translate-y-1 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-3xl font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                    {st.count}
                  </p>
                  <div className={`p-2.5 rounded-xl border ${st.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 mb-1">{st.label}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">{st.desc}</p>
              </div>
            );
          })}
        </section>

        {/* 1. OVERVIEW SECTION */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 space-y-6 shadow-xl shadow-purple-950/5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl border border-purple-200">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">CEO Overview & Vision</h2>
              <p className="text-xs text-purple-700 font-bold">Sapphire Loyal — Owner & Founder</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-slate-600 leading-relaxed">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-extrabold text-purple-900">About Sapphire Loyal</h4>
              <p>
                I’m <strong className="text-slate-900">Sapphire Loyal</strong>, a CHRP-certified trainer, operations coach, and the proud founder of <strong className="text-purple-700">ProServe Consultancy</strong>—where we help Quick Service Restaurant (QSR) brands build service-driven, high-performing teams that customers remember.
              </p>
              <p>
                With over a decade of hands-on experience in hospitality and operations, I’ve worked with some of the most recognized names in the QSR industry—<strong className="text-slate-900">KFC, Burger King, Papa John’s, and COLABS</strong>. I’ve led everything from front-line training and team audits to launching new stores and building people-first cultures.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-extrabold text-emerald-800">Current Leadership at COLABS</h4>
              <p>
                Currently serving as <strong className="text-slate-900">Training & Standards Specialist at COLABS</strong>, I lead Training & Standards, designing internal certifications, improving service delivery across hospitality touchpoints, and building a performance-driven yet empathetic team culture.
              </p>
              <p>
                My passion lies in people—watching someone grow into their best self is my biggest reward. If you’re a QSR brand looking to raise your standards, or someone ready to step into your potential—I’d love to connect.
              </p>
            </div>
          </div>
        </section>

        {/* 3. EXECUTIVE CAREER HISTORY SECTION */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-xs font-bold">
              <Building size={14} /> LEADERSHIP JOURNEY
            </div>
            <h2 className="text-3xl font-black text-slate-900">Executive Career History</h2>
            <p className="text-xs text-slate-500">Over 10 years of progressive leadership across top QSR brands & enterprise hubs</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 space-y-8 pl-6 md:pl-10 pt-2">
            {careerTimeline.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-purple-600 group-hover:bg-purple-600 transition-all shadow" />

                <div className="bg-white border border-slate-200/80 hover:border-purple-300 p-6 rounded-2xl space-y-2 shadow-lg shadow-purple-950/5 transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-xs text-purple-700 font-bold">{exp.company} &bull; <span className="text-slate-500 font-medium">{exp.location}</span></p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${exp.accent}`}>
                      {exp.badge}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500">{exp.period}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA LANDING PAGE BANNER */}
        <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Ready to Elevate Your QSR Operations & Staff Standards?
          </h3>
          <p className="text-xs md:text-sm text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Connect directly with <strong className="text-white">Sapphire Loyal</strong> for specialized staff training, operational audits, menu engineering, or executive talent recruitment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href="mailto:sapphireloyal@gmail.com"
              className="px-8 py-3.5 bg-white text-purple-900 hover:bg-purple-50 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Mail size={16} /> Email sapphireloyal@gmail.com
            </a>
            <a
              href="https://wa.me/923216714725?text=Hello%20Sapphire%20Loyal,%20I%20am%20interested%20in%20consultancy%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
            >
              <MessageSquare size={16} /> WhatsApp (+92 321 6714725)
            </a>
            <a
              href="/Sapphire_Loyal_Profile.pdf"
              download="Sapphire_Loyal_Profile.pdf"
              className="px-8 py-3.5 bg-purple-950/80 hover:bg-purple-950 text-purple-200 font-extrabold text-xs rounded-xl border border-purple-400/40 flex items-center gap-2 transition-all"
            >
              <Download size={16} /> Download Full CV (PDF)
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
