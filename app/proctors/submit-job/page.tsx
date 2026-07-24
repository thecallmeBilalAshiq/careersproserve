'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import { sendNotificationEmail } from '@/lib/email';
import { ShieldCheck, UserCheck, Users, CheckCircle2, Loader2, Plus, Trash2, Layers, DollarSign, Building } from 'lucide-react';

interface TeamRoleItem {
  id: string;
  roleTitle: string;
  count: string;
  specifications: string;
  salaryDetails: string;
}

export default function ProctorSubmitJobPage() {
  const [hiringType, setHiringType] = useState<'Single Proctor Hiring' | 'Team Hiring (Outsourcing & Kickstart)'>('Single Proctor Hiring');

  // Contact Info (Same for both)
  const [contactInfo, setContactInfo] = useState({
    proctorName: '',
    proctorEmail: '',
    proctorPhone: '',
    companyName: '',
  });

  // Single Proctor Form State
  const [singleForm, setSingleForm] = useState({
    jobTitle: '',
    location: '',
    salaryExpectation: '',
    jobDescription: '',
  });

  // Team Hiring Form State
  const [teamForm, setTeamForm] = useState({
    projectTitle: '',
    location: '',
    totalTeamCount: '5',
    projectDuration: '1 Month',
    teamTotalBudget: '',
    teamDescription: '',
  });

  // Dynamic Team Roles State
  const [teamRoles, setTeamRoles] = useState<TeamRoleItem[]>([
    {
      id: '1',
      roleTitle: 'Senior Lead Proctor / Invigilator',
      count: '2',
      specifications: '3+ years experience in proctored exam oversight, security protocols',
      salaryDetails: '$1,000 / month per proctor',
    },
    {
      id: '2',
      roleTitle: 'Assistant Proctor / Room Monitor',
      count: '3',
      specifications: 'Strong communication skills, familiarity with LMS platforms',
      salaryDetails: '$600 / month per proctor',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTeamRole = () => {
    setTeamRoles((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        roleTitle: '',
        count: '1',
        specifications: '',
        salaryDetails: '',
      },
    ]);
  };

  const removeTeamRole = (id: string) => {
    if (teamRoles.length <= 1) return;
    setTeamRoles((prev) => prev.filter((r) => r.id !== id));
  };

  const updateTeamRole = (id: string, field: keyof TeamRoleItem, value: string) => {
    setTeamRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isSingle = hiringType === 'Single Proctor Hiring';

    // Build unified payload for DB and Email
    const jobTitle = isSingle ? singleForm.jobTitle : teamForm.projectTitle;
    const location = isSingle ? singleForm.location : teamForm.location;
    const salaryExpectation = isSingle
      ? singleForm.salaryExpectation
      : `Total Budget: ${teamForm.teamTotalBudget || 'Negotiable'} (${teamForm.totalTeamCount} members)`;

    let detailedScope = '';
    if (isSingle) {
      detailedScope = singleForm.jobDescription;
    } else {
      const rolesSummary = teamRoles
        .map(
          (r, idx) =>
            `  • Role #${idx + 1}: ${r.roleTitle || 'Unspecified'} (Qty: ${r.count || 1})\n    Specs: ${r.specifications || 'N/A'}\n    Salary/Rate: ${r.salaryDetails || 'Market Standard'}`
        )
        .join('\n\n');

      detailedScope = `[TEAM HIRING OUTSOURCING SCOPE]
Project Title: ${teamForm.projectTitle}
Total Team Members: ${teamForm.totalTeamCount}
Project Duration: ${teamForm.projectDuration}
Total Team Budget: ${teamForm.teamTotalBudget}

--- ROLES & SPECIFICATIONS BREAKDOWN ---
${rolesSummary}

--- OVERALL PROJECT SCOPE & INSTRUCTIONS ---
${teamForm.teamDescription}`;
    }

    try {
      // 1. Insert into Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from('proctor_job_requests').insert([
        {
          proctor_name: contactInfo.proctorName,
          proctor_email: contactInfo.proctorEmail,
          proctor_phone: contactInfo.proctorPhone,
          company_name: contactInfo.companyName,
          hiring_type: hiringType,
          job_title: jobTitle,
          location: location,
          salary_range: salaryExpectation,
          salary_expectation: salaryExpectation,
          job_description: detailedScope,
          status: 'pending',
        },
      ]);

      if (dbError) {
        console.warn('Supabase DB notice:', dbError.message);
      }

      // 2. Send Notification Email
      const emailHtml = isSingle
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #6d28d9; margin-top: 0; text-align: center;">Sapphire Pro Serve - Single Proctor Hiring Request</h2>
            <p>Hello <strong>${contactInfo.proctorName}</strong>,</p>
            <p>Thank you for submitting a single proctor hiring requirement. Below are your request details:</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #cbd5e1;">
              <p style="margin: 4px 0;"><strong>Hiring Type:</strong> ${hiringType}</p>
              <p style="margin: 4px 0;"><strong>Company:</strong> ${contactInfo.companyName}</p>
              <p style="margin: 4px 0;"><strong>Job Title:</strong> ${jobTitle}</p>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${location}</p>
              <p style="margin: 4px 0;"><strong>Salary Expectation:</strong> ${salaryExpectation}</p>
            </div>
            <p>Our Admin team is reviewing your posting. You will be notified once it is approved and listed.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center;">Sapphire Pro Serve &bull; careersproserve@gmail.com &bull; +923216714725</p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #047857; margin-top: 0; text-align: center;">Sapphire Pro Serve - Team Hiring Request</h2>
            <p>Hello <strong>${contactInfo.proctorName}</strong>,</p>
            <p>We received your Team Hiring & Proctor Squad Outsourcing request for <strong>${contactInfo.companyName}</strong>.</p>
            <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #bbf7d0;">
              <p style="margin: 4px 0;"><strong>Project Title:</strong> ${jobTitle}</p>
              <p style="margin: 4px 0;"><strong>Total Team Size:</strong> ${teamForm.totalTeamCount} Proctors</p>
              <p style="margin: 4px 0;"><strong>Duration:</strong> ${teamForm.projectDuration}</p>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${location}</p>
              <p style="margin: 4px 0;"><strong>Total Budget:</strong> ${teamForm.teamTotalBudget}</p>
            </div>
            <h4 style="color: #0f172a; margin-bottom: 8px;">Roles & Specifications Breakdown:</h4>
            <ul style="padding-left: 20px; color: #334155;">
              ${teamRoles
                .map(
                  (r) =>
                    `<li style="margin-bottom: 8px;"><strong>${r.roleTitle}</strong> (Qty: ${r.count}) - ${r.salaryDetails}<br/><span style="font-size: 13px; color: #64748b;">Specs: ${r.specifications}</span></li>`
                )
                .join('')}
            </ul>
            <p>Our executive recruitment team will review your team requirements and reach out to confirm candidate matching.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center;">Sapphire Pro Serve &bull; careersproserve@gmail.com &bull; +923216714725</p>
          </div>
        `;

      await sendNotificationEmail({
        to: contactInfo.proctorEmail,
        subject: `Proctor Request Received: ${jobTitle} (${hiringType})`,
        html: emailHtml,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Proctor job submission error:', err);
      setError(err?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-serif selection:bg-purple-800 selection:text-white">
      <Navbar />

      {/* EXECUTIVE PROCTORS HERO */}
      <section className="bg-gradient-to-b from-purple-100/40 via-white to-slate-50 py-16 lg:py-24 px-4 border-b border-slate-200/80 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-purple-900 text-xs font-serif font-bold shadow-sm">
            <ShieldCheck size={14} className="text-purple-700" />
            SAPPHIRE PRO SERVE &bull; CERTIFIED PROCTOR & INVIGILATOR NETWORK
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            Hire Certified Proctors & <span className="bg-gradient-to-r from-purple-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent italic font-serif">Invigilator Squads</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-serif">
            Select your preferred hiring model below. Hire individual certified proctors or deploy dedicated proctor team outsourcing with custom role specifications and salary structures.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 max-w-4xl mx-auto w-full">
        <div className="space-y-8">

          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xl">
              <CheckCircle2 size={64} className="text-emerald-600 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold text-slate-900">Hiring Request Submitted Successfully!</h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <span className="text-purple-700 font-bold">{contactInfo.proctorName}</span>! Your request for{' '}
                <span className="text-blue-600 font-bold">{hiringType === 'Single Proctor Hiring' ? singleForm.jobTitle : teamForm.projectTitle}</span> ({hiringType}) has been logged and sent to our Admin team.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow transition-all"
              >
                Submit Another Hiring Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
              {error && (
                <div className="p-4 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
                  {error}
                </div>
              )}

              {/* 1. Hiring Scope & Model Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Select Hiring Scope & Model *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setHiringType('Single Proctor Hiring')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      hiringType === 'Single Proctor Hiring'
                        ? 'bg-purple-50/70 border-purple-600 text-purple-950 shadow-md ring-2 ring-purple-100'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 font-extrabold text-sm mb-1 text-purple-900">
                      <UserCheck size={20} className="text-purple-600" />
                      1. Single Proctor Hiring
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Hire an individual dedicated proctor or invigilator for specific exam oversight or certification monitoring.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHiringType('Team Hiring (Outsourcing & Kickstart)')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      hiringType === 'Team Hiring (Outsourcing & Kickstart)'
                        ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-100'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 font-extrabold text-sm mb-1 text-emerald-900">
                      <Users size={20} className="text-emerald-600" />
                      2. Team Hiring (Outsourcing & Kickstart)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Outsource an entire proctor squad with customizable roles, specifications, member counts, and team budgets.
                    </p>
                  </button>
                </div>
              </div>

              {/* 2. Common Section: Recruiter / Contact Info */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider">
                  <Building size={16} /> 1. Recruiter & Company Contact Info
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactInfo.proctorName}
                      onChange={(e) => setContactInfo({ ...contactInfo, proctorName: e.target.value })}
                      placeholder="e.g. Sarah Ahmed"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={contactInfo.proctorEmail}
                      onChange={(e) => setContactInfo({ ...contactInfo, proctorEmail: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={contactInfo.proctorPhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, proctorPhone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={contactInfo.companyName}
                      onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                      placeholder="e.g. Global Tech Certifications"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Form: Single Proctor Hiring Form */}
              {hiringType === 'Single Proctor Hiring' && (
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase tracking-wider">
                    <UserCheck size={16} /> 2. Single Proctor Details
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Job / Role Title *</label>
                      <input
                        type="text"
                        required
                        value={singleForm.jobTitle}
                        onChange={(e) => setSingleForm({ ...singleForm, jobTitle: e.target.value })}
                        placeholder="e.g. Senior Exam Proctor / QA Invigilator"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={singleForm.location}
                        onChange={(e) => setSingleForm({ ...singleForm, location: e.target.value })}
                        placeholder="e.g. Remote / Onsite - Islamabad"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Salary Expectations / Compensation *</label>
                    <input
                      type="text"
                      required
                      value={singleForm.salaryExpectation}
                      onChange={(e) => setSingleForm({ ...singleForm, salaryExpectation: e.target.value })}
                      placeholder="e.g. $25/hr OR PKR 80,000 / month"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description & Role Scope *</label>
                    <textarea
                      rows={4}
                      required
                      value={singleForm.jobDescription}
                      onChange={(e) => setSingleForm({ ...singleForm, jobDescription: e.target.value })}
                      placeholder="Outline role responsibilities, required certifications, invigilation rules, schedule..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic Form: Team Hiring Form */}
              {hiringType === 'Team Hiring (Outsourcing & Kickstart)' && (
                <div className="space-y-6">
                  {/* Section 2: Team Project Details */}
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider">
                      <Layers size={16} /> 2. Team Project Overview
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Project / Team Title *</label>
                        <input
                          type="text"
                          required
                          value={teamForm.projectTitle}
                          onChange={(e) => setTeamForm({ ...teamForm, projectTitle: e.target.value })}
                          placeholder="e.g. Enterprise Exam Proctor Squad"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Location / Deployment Scope *</label>
                        <input
                          type="text"
                          required
                          value={teamForm.location}
                          onChange={(e) => setTeamForm({ ...teamForm, location: e.target.value })}
                          placeholder="e.g. Remote / Onsite Multi-city"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Total Team Members Needed *</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={teamForm.totalTeamCount}
                          onChange={(e) => setTeamForm({ ...teamForm, totalTeamCount: e.target.value })}
                          placeholder="e.g. 10"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Project Duration / Schedule *</label>
                        <input
                          type="text"
                          required
                          value={teamForm.projectDuration}
                          onChange={(e) => setTeamForm({ ...teamForm, projectDuration: e.target.value })}
                          placeholder="e.g. 2 Weeks / 3 Months Contract"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Dynamic Team Roles & Specifications */}
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider">
                        <Users size={16} /> 3. Team Roles, Specifications & Salaries
                      </div>
                      <button
                        type="button"
                        onClick={addTeamRole}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold transition-all"
                      >
                        <Plus size={14} /> Add Role
                      </button>
                    </div>

                    <div className="space-y-4">
                      {teamRoles.map((role, idx) => (
                        <div key={role.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3 relative">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <span className="text-xs font-extrabold text-emerald-800">
                              Role Position #{idx + 1}
                            </span>
                            {teamRoles.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTeamRole(role.id)}
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                                title="Remove Role"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Role / Position Title *</label>
                              <input
                                type="text"
                                required
                                value={role.roleTitle}
                                onChange={(e) => updateTeamRole(role.id, 'roleTitle', e.target.value)}
                                placeholder="e.g. Chief Proctor / Invigilator"
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Quantity Needed *</label>
                              <input
                                type="number"
                                min="1"
                                required
                                value={role.count}
                                onChange={(e) => updateTeamRole(role.id, 'count', e.target.value)}
                                placeholder="e.g. 2"
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Specifications & Qualifications *</label>
                              <input
                                type="text"
                                required
                                value={role.specifications}
                                onChange={(e) => updateTeamRole(role.id, 'specifications', e.target.value)}
                                placeholder="e.g. CISSP certified, 3+ yrs experience"
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Salary / Budget per Member *</label>
                              <input
                                type="text"
                                required
                                value={role.salaryDetails}
                                onChange={(e) => updateTeamRole(role.id, 'salaryDetails', e.target.value)}
                                placeholder="e.g. $1,000 / mo per person"
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Total Budget & Scope */}
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider">
                      <DollarSign size={16} /> 4. Overall Team Budget & Outsourcing Scope
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Total Team Budget / Salary Details *</label>
                      <input
                        type="text"
                        required
                        value={teamForm.teamTotalBudget}
                        onChange={(e) => setTeamForm({ ...teamForm, teamTotalBudget: e.target.value })}
                        placeholder="e.g. $5,000 Total Project Budget or Negotiable"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Outsourcing Scope & Instructions *</label>
                      <textarea
                        rows={4}
                        required
                        value={teamForm.teamDescription}
                        onChange={(e) => setTeamForm({ ...teamForm, teamDescription: e.target.value })}
                        placeholder="Detail overall exam oversight goals, software/LMS integration, shift timing, and reporting requirements..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${
                  hiringType === 'Single Proctor Hiring'
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800'
                    : 'bg-gradient-to-r from-emerald-600 via-teal-700 to-blue-700 hover:from-emerald-700 hover:to-blue-800'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Submitting Request...
                  </>
                ) : (
                  `Submit ${hiringType === 'Single Proctor Hiring' ? 'Single Proctor' : 'Team Outsourcing'} Request`
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
