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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-purple-800 text-xs font-bold">
            <Sparkles size={14} /> Professional Training Directory
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Individual & Team Corporate Training</h1>
          <p className="text-xs md:text-sm text-emerald-700 font-bold italic">
            &quot;Driven by Passion, Powered by People, Focused on Customer&quot;
          </p>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 max-w-xl">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search training topic, course title, instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
            />
          </div>
        </div>
      </section>

      <div className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 bg-white rounded-2xl p-6 border border-slate-200 h-fit sticky top-24 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
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
                <h4 className="font-bold text-slate-700 text-xs mb-3">Level</h4>
                <div className="space-y-2">
                  {TRAINING_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedLevel === level
                          ? 'bg-purple-700 text-white font-bold'
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
                <h4 className="font-bold text-slate-700 text-xs mb-3">Category</h4>
                <div className="space-y-2">
                  {JOB_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-700 text-white font-bold'
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
              <p className="text-xs text-slate-500 font-mono">
                Showing {filteredTraining.length} active training modules
              </p>
            </div>

            {filteredTraining.length === 0 ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
                <p className="text-slate-500 text-sm mb-4">No training modules found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-purple-700 hover:underline text-xs font-bold"
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
                    className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition-all hover:border-purple-500/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-purple-100 border border-purple-200 text-purple-800 text-[10px] font-bold rounded-full">
                            {course.level}
                          </span>
                          <span className="px-2.5 py-1 bg-blue-100 border border-blue-200 text-blue-800 text-[10px] font-bold rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 hover:text-purple-700 transition-colors mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">Lead Trainer: {course.instructor}</p>

                      <ul className="text-xs text-slate-600 space-y-1 mb-6">
                        {course.curriculum.slice(0, 3).map((item, index) => (
                          <li key={index} className="line-clamp-1 flex items-center gap-1.5">
                            <BookOpen size={12} className="text-purple-600" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div>
                        <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg">
                          Individual & Team Options
                        </span>
                        <div className="flex gap-3 text-[10px] text-slate-500 mt-2 font-mono">
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
                        <span className="font-bold text-slate-900 text-xs">{course.rating}</span>
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
