'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Search, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Training {
  id: string;
  title: string;
  description: string;
  level: string;
  instructor: string;
  duration_hours: number;
  price: number;
  created_at: string;
}

export default function AdminTraining() {
  const [training, setTraining] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClient();

  useEffect(() => {
    fetchTraining();
  }, []);

  const fetchTraining = async () => {
    try {
      const { data, error } = await supabase
        .from('training')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTraining((data as Training[]) || []);
    } catch (error) {
      console.error('Error fetching training:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTraining = training.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Training</h1>
            <p className="text-gray-600">Create and manage training programs</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <Plus size={20} />
            Add Training
          </button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search training programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
      </motion.div>

      {/* Training Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          <div className="p-8 text-center col-span-3">
            <p className="text-gray-600">Loading training programs...</p>
          </div>
        ) : filteredTraining.length === 0 ? (
          <div className="p-8 text-center col-span-3">
            <p className="text-gray-600">No training programs found</p>
          </div>
        ) : (
          filteredTraining.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(t.level)}`}>
                  {t.level.charAt(0).toUpperCase() + t.level.slice(1)}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{t.description}</p>

              <div className="space-y-2 py-4 border-y border-gray-200 my-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Instructor:</span> {t.instructor}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Duration:</span> {t.duration_hours} hours
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Price:</span> ${t.price.toFixed(2)}
                </p>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Manage
              </button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
