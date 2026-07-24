'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JobCard } from '@/components/common/JobCard';
import { mockJobs } from '@/lib/mockData';
import { JOB_CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, SALARY_RANGES } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Search, X, Sparkles, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSalary, setSelectedSalary] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>('saved_jobs', []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !job.company.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory && job.category !== selectedCategory) return false;
      if (selectedExperience && job.experience !== selectedExperience) return false;
      if (selectedType && job.type !== selectedType) return false;
      if (selectedSalary) {
        const range = SALARY_RANGES.find(r => r.label === selectedSalary);
        if (range && job.salary && (job.salary.min < range.min || job.salary.max > range.max)) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedExperience, selectedType, selectedSalary]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(savedJobs.includes(jobId) 
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedExperience(null);
    setSelectedType(null);
    setSelectedSalary(null);
  };

  const hasActiveFilters = selectedCategory || selectedExperience || selectedType || selectedSalary;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-serif selection:bg-purple-800 selection:text-white">
      <Navbar />

      {/* WORLD-CLASS EXECUTIVE JOBS HERO */}
      <section className="bg-gradient-to-b from-purple-100/40 via-white to-slate-50 py-16 lg:py-24 px-4 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-purple-900 text-xs font-serif font-bold shadow-sm"
          >
            <Sparkles size={14} className="text-amber-600 animate-spin" />
            SAPPHIRE PRO SERVE &bull; CAREER OPPORTUNITIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight"
          >
            Find Your Next <span className="bg-gradient-to-r from-purple-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent italic font-serif">Executive Opportunity</span>
          </motion.h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-serif">
            Browse verified openings across IT, Hospitality, Healthcare, Engineering & Executive Leadership. No registration or login required.
          </p>
          
          <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white border border-purple-200 rounded-2xl px-5 py-3.5 shadow-xl shadow-purple-900/5 hover:border-purple-400 transition-all">
            <Search size={22} className="text-purple-700 shrink-0" />
            <input
              type="text"
              placeholder="Search jobs by title, skill, company, or keyword..."
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
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-slate-900 text-lg">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-purple-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      Clear All <X size={14} />
                    </button>
                  )}
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
                          ? 'bg-purple-900 text-white font-bold shadow-md'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <h4 className="font-serif font-bold text-slate-800 text-sm mb-3">Experience</h4>
                <div className="space-y-1.5">
                  {EXPERIENCE_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedExperience(selectedExperience === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-serif transition-colors ${
                        selectedExperience === level
                          ? 'bg-purple-900 text-white font-bold shadow-md'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h4 className="font-serif font-bold text-slate-800 text-sm mb-3">Job Type</h4>
                <div className="space-y-1.5">
                  {JOB_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-serif transition-colors ${
                        selectedType === type
                          ? 'bg-purple-900 text-white font-bold shadow-md'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Jobs List */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm font-serif text-slate-600 font-bold">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'Opportunity' : 'Opportunities'}
              </p>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <p className="text-slate-500 mb-4 font-serif text-base">No jobs found matching your selected criteria.</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-purple-900 text-white rounded-xl text-xs font-serif font-bold hover:bg-purple-950 transition-all shadow-md"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSave={toggleSaveJob}
                    isSaved={savedJobs.includes(job.id)}
                  />
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
