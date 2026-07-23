'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { sendNotificationEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase/client';
import { UserCheck, Upload, FileText, CheckCircle2, Loader2, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function TalentPoolPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    yearsOfExperience: '3',
    highestEducation: "Bachelor's Degree",
    certifications: '',
    skills: '',
    fieldOfExpertise: 'Software Engineering',
    additionalNotes: '',
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setError('Please upload your CV document (PDF or DOCX)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload CV to Cloudinary
      const cvUrl = await uploadToCloudinary(cvFile, 'resumes');

      // 2. Save into Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from('talent_pool').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          years_of_experience: parseInt(formData.yearsOfExperience) || 0,
          highest_education: formData.highestEducation,
          certifications: formData.certifications,
          skills: formData.skills,
          field_of_expertise: formData.fieldOfExpertise,
          cv_url: cvUrl,
          additional_notes: formData.additionalNotes,
        },
      ]);

      if (dbError) {
        console.warn('Supabase DB notice:', dbError.message);
      }

      // 3. Email Notification
      await sendNotificationEmail({
        to: formData.email,
        subject: 'Welcome to Careers Pro Serve Talent Pool',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
            <h2 style="color: #00d9ff; background: #0f172a; padding: 15px; border-radius: 6px; text-align: center;">Careers Pro Serve</h2>
            <h3>Welcome ${formData.fullName}!</h3>
            <p>Your profile and CV have been added to our executive candidate database.</p>
            <p>When matching job opportunities arise, our recruiters will contact you directly.</p>
          </div>
        `,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Talent pool submission error:', err);
      setError(err?.message || 'Failed to submit profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Hero Banner */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold">
              <UserCheck size={14} /> Executive Talent Database
            </div>
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Insert Your Details for Future Jobs
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Join the Careers Pro Serve talent database. Our corporate headhunters review profiles daily to match candidates with exclusive unlisted positions.
            </p>
          </div>

          {submitted ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-4 shadow-2xl">
              <CheckCircle2 size={64} className="text-emerald-400 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold text-white">Profile Registered Successfully!</h2>
              <p className="text-sm text-slate-300">
                Thank you, <span className="text-cyan-400 font-semibold">{formData.fullName}</span>! Your CV and credentials are live in our recruiter network.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl"
              >
                Submit Another Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
              {error && (
                <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Hassan Ahmed"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hassan@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Karachi"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Pakistan"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience *</label>
                  <select
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="0">Fresh / Graduate (0 yrs)</option>
                    <option value="2">1 - 3 Years</option>
                    <option value="5">3 - 5 Years</option>
                    <option value="8">5 - 8 Years</option>
                    <option value="10">10+ Years (Senior)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Highest Education *</label>
                  <select
                    value={formData.highestEducation}
                    onChange={(e) => setFormData({ ...formData, highestEducation: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="High School">High School</option>
                    <option value="Associate">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD / Doctorate">PhD / Doctorate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Field of Expertise *</label>
                  <input
                    type="text"
                    required
                    value={formData.fieldOfExpertise}
                    onChange={(e) => setFormData({ ...formData, fieldOfExpertise: e.target.value })}
                    placeholder="e.g. Marketing / Data Analytics"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Top Skills (Comma Separated) *</label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g. React, Node.js, Project Management, SEO, Public Speaking"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Certifications (Optional)</label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect, PMP, Scrum Master"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Cloudinary CV Uploader */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Upload CV / Resume (PDF, DOCX) *</label>
                <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-950/60 rounded-xl p-5 text-center transition-colors">
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
                        <FileText size={32} className="text-cyan-400" />
                        <span className="text-xs font-semibold text-cyan-300">{cvFile.name}</span>
                        <span className="text-[10px] text-slate-400">({(cvFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </>
                    ) : (
                      <>
                        <Upload size={28} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-300">Click or drag your CV document here</span>
                        <span className="text-[10px] text-slate-500">Cloudinary Secured Upload</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Information / Target Roles</label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Mention target salary, notice period, or relocation preferences..."
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 hover:opacity-95 text-slate-950 font-black rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Uploading CV & Saving Profile...
                  </>
                ) : (
                  'Submit Details to Talent Database'
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
