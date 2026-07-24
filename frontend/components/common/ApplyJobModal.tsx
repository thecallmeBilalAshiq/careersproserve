'use client';

import { useState } from 'react';
import { X, Upload, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { sendNotificationEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase/client';

interface ApplyJobModalProps {
  jobId: string;
  jobTitle: string;
  company: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyJobModal({ jobId, jobTitle, company, isOpen, onClose }: ApplyJobModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    expectedSalary: '',
    coverLetter: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setError('Please select your CV document (PDF or DOCX)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload CV to Cloudinary
      const cvUrl = await uploadToCloudinary(cvFile, 'resumes');

      // 2. Save Application to Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from('job_applications').insert([
        {
          job_id: jobId,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          expected_salary: formData.expectedSalary,
          cv_url: cvUrl,
          cover_letter: formData.coverLetter,
        },
      ]);

      if (dbError) {
        console.warn('Supabase DB Notice:', dbError.message);
      }

      // 3. Send Notification Email from careersproserve@gmail.com
      await sendNotificationEmail({
        to: formData.email,
        subject: `Application Received: ${jobTitle} - Sapphire ProServe`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #2563eb; background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center;">Sapphire ProServe</h2>
            <h3 style="color: #0f172a;">Dear ${formData.fullName},</h3>
            <p style="color: #334155;">Thank you for applying for the position of <strong>${jobTitle}</strong> at <strong>${company}</strong>.</p>
            <p style="color: #334155;"><strong>Expected Salary:</strong> ${formData.expectedSalary || 'Not specified'}</p>
            <p style="color: #334155;">Your application and CV have been safely received in our candidate database. Our hiring team will review your qualifications and reach out to you shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Sapphire ProServe &bull; careersproserve@gmail.com &bull; +923216714725</p>
          </div>
        `,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Application submission error:', err);
      setError(err?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-blue-700">Apply for Position</h2>
            <p className="text-xs text-slate-500 font-medium">{jobTitle} &bull; {company}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 size={56} className="text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-sm text-slate-600">
              Thank you, <span className="font-semibold text-blue-600">{formData.fullName}</span>! Your CV has been stored safely and an email confirmation has been dispatched.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Sarah Khan"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Lahore / Karachi"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Country *</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Pakistan"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expected Salary *</label>
              <input
                type="text"
                required
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                placeholder="e.g. 150,000 PKR / month"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Cloudinary CV Uploader */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Upload CV / Resume (PDF, DOCX) *</label>
              <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-600 bg-slate-50 rounded-xl p-4 text-center transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center gap-1">
                  {cvFile ? (
                    <>
                      <FileText size={28} className="text-blue-600" />
                      <span className="text-xs font-bold text-blue-700">{cvFile.name}</span>
                      <span className="text-[10px] text-slate-500">({(cvFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </>
                  ) : (
                    <>
                      <Upload size={24} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">Click or drag your CV file here</span>
                      <span className="text-[10px] text-slate-500">Secure Upload</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cover Letter / Note (Optional)</label>
              <textarea
                rows={3}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder="Tell us briefly why you're a great fit..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
