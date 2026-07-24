'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import {
  BookOpen,
  ShieldCheck,
  Eye,
  FileText,
  Check,
  ExternalLink,
  Download,
  MessageSquare,
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'applications' | 'enrollments' | 'proctors' | 'mystery' | 'talent'>('applications');
  const [loading, setLoading] = useState(false);

  // Module Data States
  const [applications, setApplications] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [proctorRequests, setProctorRequests] = useState<any[]>([]);
  const [mysteryRequests, setMysteryRequests] = useState<any[]>([]);
  const [talentPool, setTalentPool] = useState<any[]>([]);

  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'applications') {
        const { data } = await supabase.from('job_applications').select('*').order('created_at', { ascending: false });
        setApplications(data || mockApplications);
      } else if (activeTab === 'enrollments') {
        const { data } = await supabase.from('training_enrollments').select('*').order('created_at', { ascending: false });
        setEnrollments(data || mockEnrollments);
      } else if (activeTab === 'proctors') {
        const { data } = await supabase.from('proctor_job_requests').select('*').order('created_at', { ascending: false });
        setProctorRequests(data || mockProctorRequests);
      } else if (activeTab === 'mystery') {
        const { data } = await supabase.from('mystery_shopper_requests').select('*').order('created_at', { ascending: false });
        setMysteryRequests(data || mockMysteryRequests);
      } else if (activeTab === 'talent') {
        const { data } = await supabase.from('talent_pool').select('*').order('created_at', { ascending: false });
        setTalentPool(data || mockTalentPool);
      }
    } catch (err) {
      console.warn('DB fetch notice, utilizing live state:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProctor = async (reqId: string) => {
    setProctorRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
    try {
      await supabase.from('proctor_job_requests').update({ status: 'approved' }).eq('id', reqId);
    } catch (e) {}
  };

  const handleVerifyEnrollment = async (enrollId: string) => {
    setEnrollments(prev => prev.map(e => e.id === enrollId ? { ...e, status: 'verified' } : e));
    try {
      await supabase.from('training_enrollments').update({ status: 'verified' }).eq('id', enrollId);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-bold mb-2">
              <Sparkles size={14} /> Master Admin Portal
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Careers Pro Serve Management Dashboard</h1>
            <p className="text-xs text-slate-600">Oversee Applications, Enrollments, Proctor Approvals, Mystery Shoppers & Talent Pool</p>
          </div>

          <Link href="/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300">
            View Live Site
          </Link>
        </div>
      </div>

      <main className="flex-1 py-8 px-4 max-w-7xl mx-auto w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'applications', label: 'Job Applications', icon: FileText, count: applications.length },
            { id: 'enrollments', label: 'Training Enrollments', icon: BookOpen, count: enrollments.length },
            { id: 'proctors', label: 'Proctor Job Requests', icon: ShieldCheck, count: proctorRequests.filter(r => r.status === 'pending').length },
            { id: 'mystery', label: 'Mystery Shopper Leads', icon: Eye, count: mysteryRequests.length },
            { id: 'talent', label: 'Talent Pool DB', icon: UserCheck, count: talentPool.length },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon size={16} /> {tab.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white text-blue-700 font-extrabold' : 'bg-slate-100 text-slate-700'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Job Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-blue-700">Guest Job Applications ({applications.length})</h2>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">Candidate Name</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Resume / CV</th>
                      <th className="p-4">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{app.full_name || app.fullName}</td>
                        <td className="p-4 space-y-1">
                          <p className="text-slate-700">{app.email}</p>
                          <p className="text-slate-500 font-mono text-[11px]">{app.phone}</p>
                        </td>
                        <td className="p-4 text-slate-700">{app.city}, {app.country}</td>
                        <td className="p-4">
                          <a
                            href={app.cv_url || app.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-semibold hover:bg-blue-100"
                          >
                            <Download size={14} /> Download CV
                          </a>
                        </td>
                        <td className="p-4 text-slate-500">{new Date(app.created_at || Date.now()).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Training Enrollments */}
        {activeTab === 'enrollments' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-purple-700">Training Enrollments ({enrollments.length})</h2>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">Student</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Fee Paid</th>
                      <th className="p-4">Screenshot Proof</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrollments.map((enr) => (
                      <tr key={enr.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{enr.client_name || enr.clientName}</td>
                        <td className="p-4 space-y-1">
                          <p className="text-slate-700">{enr.client_email || enr.clientEmail}</p>
                          <p className="text-slate-500 font-mono text-[11px]">{enr.client_phone || enr.clientPhone}</p>
                        </td>
                        <td className="p-4 font-bold text-purple-700">${enr.fee_amount || enr.feeAmount || 150}</td>
                        <td className="p-4">
                          <a
                            href={enr.payment_screenshot_url || enr.screenshotUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg font-semibold hover:bg-purple-100"
                          >
                            <ExternalLink size={14} /> View Receipt Image
                          </a>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            enr.status === 'verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {enr.status || 'pending_verification'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {enr.status !== 'verified' && (
                            <button
                              onClick={() => handleVerifyEnrollment(enr.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                            >
                              Approve Fee
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Proctor Job Requests */}
        {activeTab === 'proctors' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-blue-700">Proctor Job Approval Requests ({proctorRequests.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proctorRequests.map((req) => (
                <div key={req.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold mb-1.5 ${
                        req.hiring_type?.includes('Team') ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}>
                        {req.hiring_type || 'Single Proctor Hiring'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{req.job_title || req.jobTitle}</h3>
                      <p className="text-xs text-blue-700 font-bold">{req.company_name || req.companyName} &bull; {req.location}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs text-slate-700 border border-slate-200">
                    <p><span className="text-slate-500 font-semibold">Submitted By:</span> {req.proctor_name || req.proctorName} ({req.proctor_email || req.proctorEmail})</p>
                    <p><span className="text-slate-500 font-semibold">Phone:</span> {req.proctor_phone || req.proctorPhone}</p>
                    <p><span className="text-slate-500 font-semibold">Compensation / Budget:</span> {req.salary_expectation || req.salary_range || req.salaryRange}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">Details & Scope:</span>
                    <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">{req.job_description || req.jobDescription}</pre>
                  </div>

                  {req.status !== 'approved' && (
                    <button
                      onClick={() => handleApproveProctor(req.id)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow text-xs"
                    >
                      <Check size={16} /> Approve & Publish Request
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Mystery Shopper Leads */}
        {activeTab === 'mystery' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-emerald-700">Mystery Shopper Corporate Leads ({mysteryRequests.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mysteryRequests.map((lead) => (
                <div key={lead.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{lead.client_name || lead.clientName}</h3>
                      <p className="text-xs text-emerald-700 font-bold">{lead.role_title || lead.roleTitle} at {lead.company_name || lead.companyName}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                      Team: {lead.team_size || lead.teamSize} Audit Specialists
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs text-slate-700 border border-slate-200">
                    <p><span className="text-slate-500 font-semibold">Contact Email:</span> {lead.email}</p>
                    <p><span className="text-slate-500 font-semibold">Phone / WhatsApp:</span> {lead.phone}</p>
                    <p><span className="text-slate-500 font-semibold">Budget Range:</span> {lead.budget_range || lead.budgetRange}</p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 font-bold block mb-1">Project Requirements:</span>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">{lead.project_scope || lead.projectScope}</p>
                  </div>

                  <a
                    href={`https://wa.me/${lead.phone}?text=Hello%20${encodeURIComponent(lead.client_name || 'Client')},%20this%20is%20Careers%20Pro%20Serve%20regarding%20your%20Mystery%20Shopper%20Team%20request.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow"
                  >
                    <MessageSquare size={16} /> Direct WhatsApp Client
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Talent Pool Database */}
        {activeTab === 'talent' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-blue-700">Talent Pool Executive Profiles ({talentPool.length})</h2>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Expertise & Skills</th>
                      <th className="p-4">Experience & Edu</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">CV Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {talentPool.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{c.full_name || c.fullName}</td>
                        <td className="p-4 space-y-1">
                          <p className="text-blue-700 font-bold">{c.field_of_expertise || c.fieldOfExpertise}</p>
                          <p className="text-slate-600 text-[11px]">{c.skills}</p>
                        </td>
                        <td className="p-4 space-y-1 text-slate-700">
                          <p className="font-semibold">{c.years_of_experience || c.yearsOfExperience} Yrs Exp</p>
                          <p className="text-slate-500 text-[11px]">{c.highest_education || c.highestEducation}</p>
                        </td>
                        <td className="p-4 space-y-1">
                          <p className="text-slate-700">{c.email}</p>
                          <p className="text-slate-500 font-mono text-[11px]">{c.phone}</p>
                        </td>
                        <td className="p-4">
                          <a
                            href={c.cv_url || c.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-semibold hover:bg-blue-100"
                          >
                            <Download size={14} /> Download CV
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Fallback Mock Data for instant demonstration before Supabase rows are populated
const mockApplications = [
  {
    id: '1',
    full_name: 'Ayesha Malik',
    email: 'ayesha.malik@gmail.com',
    phone: '+92 300 8271625',
    city: 'Lahore',
    country: 'Pakistan',
    cv_url: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    full_name: 'Usman Farooq',
    email: 'usman.f@gmail.com',
    phone: '+92 321 9918273',
    city: 'Karachi',
    country: 'Pakistan',
    cv_url: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
    created_at: new Date().toISOString(),
  },
];

const mockEnrollments = [
  {
    id: '101',
    client_name: 'Bilal Khan',
    client_email: 'bilal.k@gmail.com',
    client_phone: '+92 333 1122334',
    fee_amount: 180,
    payment_screenshot_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    status: 'pending_verification',
  },
];

const mockProctorRequests = [
  {
    id: 'p1',
    proctor_name: 'Dr. Tariq Mahmood',
    proctor_email: 'tariq.proctor@gmail.com',
    proctor_phone: '+92 300 4455667',
    job_title: 'Senior Cybersecurity Auditor',
    company_name: 'Fortress Security Ltd',
    location: 'Remote',
    salary_range: '$75k - $110k / year',
    job_description: 'Looking for certified CISSP cybersecurity audit specialist for international proctored assignments.',
    status: 'pending',
  },
];

const mockMysteryRequests = [
  {
    id: 'm1',
    client_name: 'Kamran Shah',
    company_name: 'Luxe Retail Chain',
    role_title: 'CEO & Managing Director',
    email: 'kamran@luxeretail.com',
    phone: '+92 321 6714725',
    team_size: 10,
    budget_range: '$15,000 - $50,000',
    project_scope: 'Evaluate 14 flagship store branches across Lahore, Islamabad and Karachi for customer service quality and cashier compliance.',
    status: 'new',
  },
];

const mockTalentPool = [
  {
    id: 't1',
    full_name: 'Zainab Fatima',
    email: 'zainab.f@gmail.com',
    phone: '+92 312 8877665',
    field_of_expertise: 'Full Stack Web Development',
    skills: 'React, Next.js, Node.js, PostgreSQL, TailwindCSS',
    years_of_experience: 5,
    highest_education: "Master's Degree",
    cv_url: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
  },
];
