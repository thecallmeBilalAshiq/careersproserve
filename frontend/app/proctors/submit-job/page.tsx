'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import { sendNotificationEmail } from '@/lib/email';
import { ShieldCheck, UserCheck, Users, CheckCircle2, Loader2 } from 'lucide-react';

export default function ProctorSubmitJobPage() {
  const [formData, setFormData] = useState({
    proctorName: '',
    proctorEmail: '',
    proctorPhone: '',
    hiringType: 'Single Proctor Hiring', // 'Single Proctor Hiring' | 'Team Hiring (Outsourcing)'
    jobTitle: '',
    companyName: '',
    location: '',
    salaryExpectation: 'Competitive / Market Standard',
    jobDescription: '',
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
      const { error: dbError } = await supabase.from('proctor_job_requests').insert([
        {
          proctor_name: formData.proctorName,
          proctor_email: formData.proctorEmail,
          proctor_phone: formData.proctorPhone,
          hiring_type: formData.hiringType,
          job_title: formData.jobTitle,
          company_name: formData.companyName,
          location: formData.location,
          salary_expectation: formData.salaryExpectation,
          job_description: formData.jobDescription,
          status: 'pending',
        },
      ]);

      if (dbError) {
        console.warn('Supabase DB notice:', dbError.message);
      }

      // 2. Email Confirmation
      await sendNotificationEmail({
        to: formData.proctorEmail,
        subject: `Proctor Job Submission Received: ${formData.jobTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #2563eb; background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center;">Careers Pro Serve</h2>
            <h3 style="color: #0f172a;">Hello ${formData.proctorName},</h3>
            <p style="color: #334155;">Your <strong>${formData.hiringType}</strong> submission for <strong>${formData.jobTitle}</strong> (${formData.companyName}) has been logged.</p>
            <p style="color: #334155;">Our Admin team will review and approve it for inclusion on the main Careers Pro Serve board shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Careers Pro Serve &bull; careersproserve@gmail.com &bull; +923216714725</p>
          </div>
        `,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Proctor job submission error:', err);
      setError(err?.message || 'Failed to submit job posting');
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-purple-800 text-xs font-bold">
              <ShieldCheck size={14} /> Proctor & Recruiter Network
            </div>
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Hire Proctor & Outsourcing Teams
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Single and Team Hiring (Outsourcing & Kickstart). Submit proctor requirements or candidate postings for instant Admin verification.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xl">
              <CheckCircle2 size={64} className="text-emerald-600 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold text-slate-900">Proctor Hiring Request Submitted!</h2>
              <p className="text-sm text-slate-600">
                Thank you, <span className="text-purple-700 font-bold">{formData.proctorName}</span>! Your posting for <span className="text-blue-600 font-bold">{formData.jobTitle}</span> ({formData.hiringType}) is in the admin verification queue.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl"
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

              {/* 1. Hiring Type Options: Single vs Team Outsourcing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Hiring Scope & Model *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, hiringType: 'Single Proctor Hiring' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.hiringType === 'Single Proctor Hiring'
                        ? 'bg-purple-50 border-purple-600 text-purple-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      <UserCheck size={16} className="text-purple-600" />
                      Single Proctor Hiring
                    </div>
                    <p className="text-[10px] text-slate-500">Dedicated 1-on-1 proctor assignment for exam oversight.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, hiringType: 'Team Hiring (Outsourcing / Kickstart)' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.hiringType === 'Team Hiring (Outsourcing / Kickstart)'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      <Users size={16} className="text-emerald-600" />
                      Team Hiring (Outsourcing & Kickstart)
                    </div>
                    <p className="text-[10px] text-slate-500">Complete proctor squad outsourcing & deployment.</p>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-3">1. Proctor / Recruiter Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.proctorName}
                      onChange={(e) => setFormData({ ...formData, proctorName: e.target.value })}
                      placeholder="Proctor Full Name"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.proctorEmail}
                      onChange={(e) => setFormData({ ...formData, proctorEmail: e.target.value })}
                      placeholder="proctor@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.proctorPhone}
                      onChange={(e) => setFormData({ ...formData, proctorPhone: e.target.value })}
                      placeholder="+92 321 6714725"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">2. Job Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="e.g. Senior Certification Proctor / QA Invigilator"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Global Tech Systems"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Remote / Islamabad"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Salary Expectations *</label>
                      <input
                        type="text"
                        required
                        value={formData.salaryExpectation}
                        onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
                        placeholder="e.g. Market Standard / Negotiable"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description & Outsourcing Scope *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      placeholder="Outline role responsibilities, required proctoring skills, schedule, and outsourcing requirements..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-700 via-blue-600 to-emerald-600 hover:from-purple-800 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Submitting Request...
                  </>
                ) : (
                  'Submit Proctor Hiring Request'
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
