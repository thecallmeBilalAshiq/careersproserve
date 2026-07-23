'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JobCard } from '@/components/common/JobCard';
import { mockJobs } from '@/lib/mockData';
import { JOB_CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, SALARY_RANGES } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Search, X } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Search Header */}
      <section className="bg-secondary/50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Find Your Next Job</h1>
          
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3">
            <Search size={20} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>
      </section>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 bg-card rounded-lg p-6 border border-border h-fit sticky top-24">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      Clear <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Category</h4>
                <div className="space-y-2">
                  {JOB_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Experience</h4>
                <div className="space-y-2">
                  {EXPERIENCE_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedExperience(selectedExperience === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedExperience === level
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Type</h4>
                <div className="space-y-2">
                  {JOB_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Filter */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Salary Range</h4>
                <div className="space-y-2">
                  {SALARY_RANGES.map(range => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedSalary(selectedSalary === range.label ? null : range.label)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSalary === range.label
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Jobs List */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
              </p>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline font-medium"
                >
                  Clear filters
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
