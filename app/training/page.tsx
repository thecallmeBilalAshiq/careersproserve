'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTraining } from '@/lib/mockData';
import { TRAINING_LEVELS, JOB_CATEGORIES } from '@/lib/constants';
import { Search, Star, Users, Clock, X, Sparkles, BookOpen } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header */}
      <section className="bg-slate-900 border-b border-slate-800 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
            <Sparkles size={14} /> Professional Training Directory
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white">Individual & Team Corporate Training</h1>
          <p className="text-xs md:text-sm text-emerald-400 font-bold italic">
            &quot;Driven by Passion, Powered by People, Focused on Customer&quot;
          </p>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 max-w-xl">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search training topic, course title, instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 text-sm"
            />
          </div>
        </div>
      </section>

      <div className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 bg-slate-900 rounded-2xl p-6 border border-slate-800 h-fit sticky top-24 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h3 className="font-bold text-white text-sm">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                  >
                    Clear <X size={14} />
                  </button>
                )}
              </div>

              {/* Level Filter */}
              <div>
                <h4 className="font-semibold text-slate-300 text-xs mb-3">Level</h4>
                <div className="space-y-2">
                  {TRAINING_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedLevel === level
                          ? 'bg-purple-600 text-white font-bold'
                          : 'hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-slate-300 text-xs mb-3">Category</h4>
                <div className="space-y-2">
                  {JOB_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'hover:bg-slate-800 text-slate-400'
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
              <p className="text-xs text-slate-400 font-mono">
                Showing {filteredTraining.length} active training modules
              </p>
            </div>

            {filteredTraining.length === 0 ? (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 text-sm mb-4">No training modules found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-purple-400 hover:underline text-xs font-bold"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTraining.map(course => (
                  <Link
                    key={course.id}
                    href={`/training/${course.id}`}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:shadow-2xl transition-all hover:border-purple-500/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-bold rounded-full">
                            {course.level}
                          </span>
                          <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white hover:text-purple-400 transition-colors mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-4">Lead Trainer: {course.instructor}</p>

                      <ul className="text-xs text-slate-400 space-y-1 mb-6">
                        {course.curriculum.slice(0, 3).map((item, index) => (
                          <li key={index} className="line-clamp-1 flex items-center gap-1.5">
                            <BookOpen size={12} className="text-purple-400" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-800/80">
                      <div>
                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-lg">
                          Individual & Team Options
                        </span>
                        <div className="flex gap-3 text-[10px] text-slate-400 mt-2 font-mono">
                          <span className="flex items-center gap-1">
                            <Users size={14} /> {course.students} Trainees
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {course.duration}h
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="font-bold text-white text-xs">{course.rating}</span>
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
