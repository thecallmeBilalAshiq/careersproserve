'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnrollTrainingModal } from '@/components/common/EnrollTrainingModal';
import { mockTraining } from '@/lib/mockData';
import { Users, Clock, CheckCircle, Star, Share2, ArrowRight } from 'lucide-react';

export default function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const training = mockTraining.find(t => t.id === id);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  if (!training) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Course Not Found</h1>
            <Link href="/training" className="text-purple-700 hover:underline">
              Back to Training
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-purple-100 border border-purple-200 text-purple-800 rounded-full text-xs font-bold">
                    {training.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 border border-blue-200 text-blue-800 rounded-full text-xs font-bold">
                    {training.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{training.title}</h1>
                <p className="text-sm text-slate-600">Lead Trainer: {training.instructor}</p>
                <p className="text-xs text-emerald-700 font-bold italic mt-2">
                  &quot;Driven by Passion, Powered by People, Focused on Customer&quot;
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                </button>
                <button className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 mb-1">Duration</p>
                <p className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Clock size={16} className="text-purple-600" /> {training.duration} hours
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Enrolled Trainees</p>
                <p className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Users size={16} className="text-blue-600" /> {training.students}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Rating</p>
                <p className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Star size={16} className="text-amber-500 fill-amber-500" /> {training.rating}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Options</p>
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg inline-block">
                  Individual & Team
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Program Overview</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{training.description}</p>
              </div>

              {/* Curriculum */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">What You & Team Will Learn</h2>
                <ul className="space-y-3">
                  {training.curriculum.map((item, index) => (
                    <li key={index} className="flex gap-3 text-slate-700 text-sm">
                      <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Target Audience & Prerequisites</h2>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Available for both Individual Professionals and Corporate Teams</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Customized curriculum adapted to your organization&apos;s exact requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Issued with Sapphire ProServe Verification & Certificate</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24 space-y-4 shadow-xl">
                <div>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg inline-block mb-2">
                    Open Registration
                  </span>
                  <p className="text-xs text-slate-500">Select Individual or Team option in application form.</p>
                </div>
                
                <button 
                  onClick={() => setIsEnrollOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Register for Training <ArrowRight size={18} />
                </button>

                {/* Course Info */}
                <div className="pt-6 border-t border-slate-100 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Level</span>
                    <span className="font-bold text-slate-900">{training.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Category</span>
                    <span className="font-bold text-slate-900">{training.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-bold text-slate-900">{training.duration} hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnrollTrainingModal
        trainingId={training.id}
        trainingTitle={training.title}
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />

      <Footer />
    </div>
  );
}
