'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import { sendNotificationEmail } from '@/lib/email';
import { Eye, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MysteryShopperPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    roleTitle: 'CEO / Business Owner',
    email: '',
    phone: '',
    teamSize: '5 Specialists',
    visitTier: '3-5 Visits', // '3-5 Visits' | '5-7 Visits' | '7-10 Visits' | '15-20 Visits (Outstation)'
    projectScope: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Save into Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from('mystery_shopper_requests').insert([
        {
          client_name: formData.clientName,
          company_name: formData.companyName,
          role_title: formData.roleTitle,
          email: formData.email,
          phone: formData.phone,
          team_size: formData.teamSize,
          visit_tier: formData.visitTier,
          project_scope: formData.projectScope,
          status: 'new',
        },
      ]);

      if (dbError) {
        console.warn('Supabase DB notice:', dbError.message);
      }

      // 2. Dispatch Email
      await sendNotificationEmail({
        to: formData.email,
        subject: `Mystery Shopper Team Request Logged - Sapphire Pro Serve`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #059669; background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center;">Sapphire Pro Serve Executive Audits</h2>
            <h3 style="color: #0f172a;">Dear ${formData.clientName},</h3>
            <p style="color: #334155;">Thank you for submitting your Mystery Shopper evaluation request for <strong>${formData.companyName}</strong>.</p>
            <p style="color: #334155;"><strong>Audit Scope:</strong> ${formData.visitTier} (${formData.teamSize})</p>
            <p style="color: #334155;">Our executive director will call you at <strong>${formData.phone}</strong> to confirm schedule and branch locations.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Sapphire Pro Serve &bull; careersproserve@gmail.com &bull; +923216714725</p>
          </div>
        `,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Mystery shopper submission error:', err);
      setError(err?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-serif selection:bg-purple-800 selection:text-white">
      <Navbar />

      {/* EXECUTIVE HERO HEADER */}
      <section className="bg-gradient-to-b from-purple-100/40 via-white to-slate-50 py-16 lg:py-24 px-4 border-b border-slate-200/80 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-900 text-xs font-serif font-bold shadow-sm"
          >
            <Sparkles size={14} className="text-emerald-600 animate-spin" />
            SAPPHIRE PRO SERVE &bull; VIP CORPORATE AUDITS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight"
          >
            Deploy Certified <span className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 bg-clip-text text-transparent italic font-serif">Mystery Shopper Squads</span>
          </motion.h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-serif">
            Designed for CEOs, Founders, and Retail Owners. Evaluate staff behavior, customer service quality, hygiene compliance, and cash management across 3-5, 5-7, 7-10, or 15-20 outstation visits.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xl">
              <CheckCircle2 size={64} className="text-emerald-600 mx-auto animate-bounce" />
              <h2 className="text-2xl font-serif font-bold text-slate-900">Audit Request Received!</h2>
              <p className="text-sm font-serif text-slate-600">
                Thank you, <span className="text-emerald-700 font-bold">{formData.clientName}</span> ({formData.roleTitle} at {formData.companyName}). Our executive director will coordinate your <span className="text-purple-700 font-bold">{formData.visitTier}</span> audit within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-bold rounded-xl shadow-md transition-all text-xs"
              >
                Submit Another Audit Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-xl">
              {error && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. CEO / Owner Name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Nexus Enterprises"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Your Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    placeholder="e.g. CEO, Director"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exec@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 321 6714725"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Number of Visits / Audits Options */}
              <div>
                <label className="block text-xs font-serif font-bold text-slate-800 mb-2">Number of Visits / Audits Tier *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: '3-5 Visits', label: '3 - 5 Visits', desc: 'Single Branch Audit' },
                    { id: '5-7 Visits', label: '5 - 7 Visits', desc: 'Regional Check' },
                    { id: '7-10 Visits', label: '7 - 10 Visits', desc: 'Multi-City Coverage' },
                    { id: '15-20 Visits (Outstation)', label: '15 - 20 (Outstation)', desc: 'Nationwide Outstation' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, visitTier: tier.id })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.visitTier === tier.id
                          ? 'bg-purple-900 border-purple-900 text-white shadow-md font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 font-serif'
                      }`}
                    >
                      <p className="font-serif font-bold text-xs">{tier.label}</p>
                      <p className={`text-[10px] mt-0.5 ${formData.visitTier === tier.id ? 'text-purple-200' : 'text-slate-500'}`}>{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Team Size & Squad Requirement</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  <option value="2 Specialists">2 Specialist Mystery Shoppers</option>
                  <option value="5 Specialists">5 Mystery Shoppers (Standard Squad)</option>
                  <option value="10 Specialists">10 Full Evaluation Squad</option>
                  <option value="25+ Field Team">25+ Large Scale Outstation Audit Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-slate-800 mb-1">Project Scope & Location Details *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  placeholder="Describe your store locations, staff metrics to audit (cashier honesty, greeting quality, cleanliness)..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-purple-900 hover:bg-purple-950 text-white font-serif font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Submitting Request...
                  </>
                ) : (
                  'Submit Audit Squad Request'
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
