'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTraining } from '@/lib/mockData';
import { TRAINING_LEVELS, JOB_CATEGORIES } from '@/lib/constants';
import { Search, Star, Users, Clock, X, Sparkles, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTraining = useMemo(() => {
    return mockTraining.filter(course => {
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedLevel && course.level !== selectedLevel) return false;
      if (selectedCategory && course.category !== selectedCategory) return false;
      return true;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(null);
    setSelectedCategory(null);
  };

  const hasActiveFilters = selectedLevel || selectedCategory;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-serif selection:bg-purple-800 selection:text-white">
      <Navbar />

      {/* EXECUTIVE TRAINING HERO */}
      <section className="bg-gradient-to-b from-purple-100/40 via-white to-slate-50 py-16 lg:py-24 px-4 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-purple-900 text-xs font-serif font-bold shadow-sm"
          >
            <Sparkles size={14} className="text-amber-600 animate-spin" />
            SAPPHIRE PRO SERVE &bull; PROFESSIONAL CERTIFICATIONS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight"
          >
            Individual & Team <span className="bg-gradient-to-r from-purple-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent italic font-serif">Corporate Training</span>
          </motion.h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-serif">
            &quot;Driven by Passion, Powered by People, Focused on Customer&quot; — Specialized operational, hospitality, and management certifications designed by Sapphire Loyal.
          </p>
          
          <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white border border-purple-200 rounded-2xl px-5 py-3.5 shadow-xl shadow-purple-900/5 hover:border-purple-400 transition-all">
            <Search size={22} className="text-purple-700 shrink-0" />
            <input
              type="text"
              placeholder="Search training topics, certification courses, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-slate-900 font-serif placeholder-slate-400 text-sm sm:text-base"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-lg sticky top-24">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-purple-700 hover:underline flex items-center gap-1 font-bold"
                  >
                    Clear <X size={14} />
                  </button>
                )}
              </div>

              {/* Level Filter */}
              <div>
                <h4 className="font-serif font-bold text-slate-800 text-sm mb-3">Level</h4>
                <div className="space-y-1.5">
                  {TRAINING_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-serif transition-colors ${
                        selectedLevel === level
                          ? 'bg-purple-900 text-white font-bold shadow-md'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-serif font-bold text-slate-800 text-sm mb-3">Category</h4>
                <div className="space-y-1.5">
                  {JOB_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-serif transition-colors ${
                        selectedCategory === category
                          ? 'bg-indigo-900 text-white font-bold shadow-md'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Training List */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm font-serif text-slate-600 font-bold">
                Showing {filteredTraining.length} active training modules
              </p>
            </div>

            {filteredTraining.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <p className="text-slate-500 mb-4 font-serif text-base">No training modules found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-purple-900 text-white rounded-xl text-xs font-serif font-bold hover:bg-purple-950 transition-all shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTraining.map(course => (
                  <Link
                    key={course.id}
                    href={`/training/${course.id}`}
                    className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition-all hover:border-purple-400 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-purple-100 border border-purple-200 text-purple-800 text-[10px] font-bold rounded-full font-serif">
                            {course.level}
                          </span>
                          <span className="px-2.5 py-1 bg-indigo-100 border border-indigo-200 text-indigo-800 text-[10px] font-bold rounded-full font-serif">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-slate-900 hover:text-purple-700 transition-colors mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-4 font-serif">Lead Trainer: {course.instructor}</p>

                      <ul className="text-xs text-slate-600 space-y-1 mb-6 font-serif">
                        {course.curriculum.slice(0, 3).map((item, index) => (
                          <li key={index} className="line-clamp-1 flex items-center gap-1.5">
                            <BookOpen size={12} className="text-purple-700 shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div>
                        <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-serif font-bold rounded-lg">
                          Individual & Team Options
                        </span>
                        <div className="flex gap-3 text-[11px] text-slate-500 mt-2 font-serif">
                          <span className="flex items-center gap-1">
                            <Users size={14} /> {course.students} Trainees
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {course.duration}h
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="font-bold text-slate-900 text-xs font-serif">{course.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
