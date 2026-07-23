'use client';

import { useState } from 'react';
import { X, CheckCircle2, Loader2, MessageSquare, Users, User, BookOpen } from 'lucide-react';
import { sendNotificationEmail } from '@/lib/email';
import { COMPANY_DETAILS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';

interface EnrollTrainingModalProps {
  trainingId: string;
  trainingTitle: string;
  basePrice?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollTrainingModal({ trainingId, trainingTitle, isOpen, onClose }: EnrollTrainingModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    city: '',
    trainingCategory: 'Individual', // 'Individual' | 'Team'
    selectedTopics: [trainingTitle],
    customTopic: '',
    teamSize: '1-5',
    notes: '',
  });

  const availableTopics = [
    'Executive Leadership & Agile Management',
    'Customer Service Excellence & Hospitality',
    'Cybersecurity Awareness & Data Protection',
    'Sales Pitch & Corporate Negotiations',
    'Retail Operations & Inventory Audits',
    'Cloud Architecture & DevOps Essentials',
  ];

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTopicToggle = (topic: string) => {
    setFormData((prev) => {
      const exists = prev.selectedTopics.includes(topic);
      if (exists) {
        return { ...prev, selectedTopics: prev.selectedTopics.filter((t) => t !== topic) };
      } else {
        return { ...prev, selectedTopics: [...prev.selectedTopics, topic] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedTopics.length === 0 && !formData.customTopic) {
      setError('Please select or specify at least 1 training topic');
      return;
    }

    setLoading(true);
    setError(null);

    const finalTopics = [...formData.selectedTopics];
    if (formData.customTopic.trim()) {
      finalTopics.push(formData.customTopic.trim());
    }

    try {
      // 1. Save Registration into Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from('training_enrollments').insert([
        {
          training_id: trainingId,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          city: formData.city,
          training_type: formData.trainingCategory,
          topics: finalTopics.join(', '),
          team_size: formData.trainingCategory === 'Team' ? formData.teamSize : '1',
          notes: formData.notes,
          status: 'pending_confirmation',
        },
      ]);

      if (dbError) {
        console.warn('Supabase DB Notice:', dbError.message);
      }

      // 2. Dispatch Email Notification
      await sendNotificationEmail({
        to: formData.clientEmail,
        subject: `Training Registration Received: ${trainingTitle} - Careers Pro Serve`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #7c3aed; background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center;">Careers Pro Serve Training</h2>
            <p style="text-align: center; color: #047857; font-style: italic; background: #ecfdf5; padding: 8px; border-radius: 4px; font-weight: bold;">
              "Driven by Passion, Powered by People, Focused on Customer"
            </p>
            <h3 style="color: #0f172a;">Hello ${formData.clientName},</h3>
            <p style="color: #334155;">Your registration for <strong>${formData.trainingCategory} Training</strong> has been successfully submitted.</p>
            <p style="color: #334155;"><strong>Selected Topics:</strong> ${finalTopics.join(', ')}</p>
            ${formData.trainingCategory === 'Team' ? `<p style="color: #334155;"><strong>Team Size:</strong> ${formData.teamSize} Candidates</p>` : ''}
            <p style="color: #334155;">Our training consultant will contact you via phone or email to schedule your orientation.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Careers Pro Serve &bull; careersproserve@gmail.com &bull; +923216714725</p>
          </div>
        `,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setError(err?.message || 'Failed to submit registration');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Careers Pro Serve, I registered for ${formData.trainingCategory} Training (${formData.selectedTopics.join(', ')}). Name: ${formData.clientName}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-purple-700">Professional Training Registration</h2>
            <p className="text-xs text-emerald-700 font-bold italic mt-0.5">
              &quot;Driven by Passion, Powered by People, Focused on Customer&quot;
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 size={56} className="text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900">Registration Confirmed!</h3>
            <p className="text-sm text-slate-600">
              Thank you, <span className="font-semibold text-purple-700">{formData.clientName}</span>! Your <span className="text-blue-600 font-bold">{formData.trainingCategory} Training</span> request has been submitted.
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} /> Connect on WhatsApp (+923216714725)
              </a>
              <button
                onClick={onClose}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg font-medium">
                {error}
              </div>
            )}

            {/* Tagline Ad Banner */}
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 border border-purple-200 p-3 rounded-xl text-center shadow-sm">
              <p className="text-xs font-black text-purple-900 tracking-wide uppercase">
                &quot;Driven by Passion, Powered by People, Focused on Customer&quot;
              </p>
            </div>

            {/* 1. Training Category Options: Individual vs Team */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Training Target *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, trainingCategory: 'Individual' })}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    formData.trainingCategory === 'Individual'
                      ? 'bg-purple-50 border-purple-600 text-purple-700 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User size={16} /> 1. Training for Individual
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, trainingCategory: 'Team' })}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    formData.trainingCategory === 'Team'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Users size={16} /> 2. Training for Team
                </button>
              </div>
            </div>

            {formData.trainingCategory === 'Team' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Team Size (Number of Trainees)</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  <option value="2-5">2 - 5 Members</option>
                  <option value="5-15">5 - 15 Members</option>
                  <option value="15-50">15 - 50 Corporate Batch</option>
                  <option value="50+">50+ Enterprise Scale</option>
                </select>
              </div>
            )}

            {/* 2. Topic Selection (1 or more topics) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Which Topic Training? (Select 1 or more) *</label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {availableTopics.map((topic) => {
                  const isChecked = formData.selectedTopics.includes(topic);
                  return (
                    <div
                      key={topic}
                      onClick={() => handleTopicToggle(topic)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen size={14} className={isChecked ? 'text-purple-600' : 'text-slate-400'} />
                        {topic}
                      </span>
                      {isChecked && <CheckCircle2 size={16} className="text-purple-600" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Other / Custom Topic (Optional)</label>
              <input
                type="text"
                value={formData.customTopic}
                onChange={(e) => setFormData({ ...formData, customTopic: e.target.value })}
                placeholder="e.g. Specialized Data Engineering"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. Ali Ahmed"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="ali@gmail.com"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="+92 321 6714725"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Islamabad / Lahore"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Registering...
                </>
              ) : (
                'Submit Training Registration'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
