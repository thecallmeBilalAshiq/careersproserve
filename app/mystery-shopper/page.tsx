'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import { sendNotificationEmail } from '@/lib/email';
import { Eye, CheckCircle2, Loader2 } from 'lucide-react';

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
        subject: `Mystery Shopper Team Request Logged - Careers Pro Serve`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #059669; background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center;">Careers Pro Serve Executive Audits</h2>
            <h3 style="color: #0f172a;">Dear ${formData.clientName},</h3>
            <p style="color: #334155;">Thank you for submitting your Mystery Shopper evaluation request for <strong>${formData.companyName}</strong>.</p>
            <p style="color: #334155;"><strong>Audit Scope:</strong> ${formData.visitTier} (${formData.teamSize})</p>
            <p style="color: #334155;">Our executive director will call you at <strong>${formData.phone}</strong> to confirm schedule and branch locations.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Careers Pro Serve &bull; careersproserve@gmail.com &bull; +923216714725</p>
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-800 text-xs font-bold">
              <Eye size={14} /> VIP Corporate Auditing & Mystery Shopping
            </div>
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hire Mystery Shopper Squads
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Are you a CEO, Founder, or Retail Owner? Deploy certified mystery shopper teams to evaluate quality, staff behavior, customer service, and store operations.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xl">
              <CheckCircle2 size={64} className="text-emerald-600 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold text-slate-900">Audit Request Received!</h2>
              <p className="text-sm text-slate-600">
                Thank you, <span className="text-emerald-700 font-bold">{formData.clientName}</span> ({formData.roleTitle} at {formData.companyName}). Our team will coordinate your <span className="text-blue-600 font-bold">{formData.visitTier}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
              >
                Submit Another Request
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. CEO / Owner Name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Nexus Enterprises"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    placeholder="e.g. CEO, Director"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exec@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Number of Visits / Audits Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Number of Visits / Audits Tier *</label>
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
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <p className="font-bold text-xs">{tier.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Team Size & Squad Requirement</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  <option value="2 Specialists">2 Specialist Mystery Shoppers</option>
                  <option value="5 Specialists">5 Mystery Shoppers (Standard Squad)</option>
                  <option value="10 Specialists">10 Full Evaluation Squad</option>
                  <option value="25+ Field Team">25+ Large Scale Outstation Audit Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Scope & Location Details *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  placeholder="Describe your store locations, staff metrics to audit (cashier honesty, greeting quality, cleanliness)..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Logging Request...
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
