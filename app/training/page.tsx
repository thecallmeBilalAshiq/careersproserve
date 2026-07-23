'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTraining } from '@/lib/mockData';
import { TRAINING_LEVELS, JOB_CATEGORIES } from '@/lib/constants';
import { Search, Star, Users, Clock, X } from 'lucide-react';

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price'>('popular');

  const filteredTraining = useMemo(() => {
    let result = mockTraining.filter(course => {
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedLevel && course.level !== selectedLevel) return false;
      if (selectedCategory && course.category !== selectedCategory) return false;
      return true;
    });

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.students - a.students);
    }

    return result;
  }, [searchQuery, selectedLevel, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(null);
    setSelectedCategory(null);
    setSortBy('popular');
  };

  const hasActiveFilters = selectedLevel || selectedCategory;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-secondary/50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Professional Training Courses</h1>
          
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3">
            <Search size={20} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by course name, instructor..."
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

              {/* Level Filter */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Level</h4>
                <div className="space-y-2">
                  {TRAINING_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedLevel === level
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
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

              {/* Sort */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Training List */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTraining.length} {filteredTraining.length === 1 ? 'course' : 'courses'}
              </p>
            </div>

            {filteredTraining.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No courses found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline font-medium"
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
                    className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all hover:border-primary/50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded font-semibold">
                            {course.level}
                          </span>
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                            {course.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">By {course.instructor}</p>

                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      {course.curriculum.slice(0, 3).map((item, index) => (
                        <li key={index} className="line-clamp-1">• {item}</li>
                      ))}
                    </ul>

                    <div className="flex justify-between items-end pt-4 border-t border-border">
                      <div>
                        <p className="text-2xl font-bold text-primary">${course.price}</p>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Users size={16} /> {course.students}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} /> {course.duration}h
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-foreground">{course.rating}</span>
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
