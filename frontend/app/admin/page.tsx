'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.push('/admin/login');
        return;
      }

      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', authUser.id)
        .single();

      if (error || !adminUser) {
        router.push('/admin/login');
        return;
      }

      setUser(authUser);
      setIsAdmin(adminUser.role === 'admin');
      setLoading(false);
    } catch (error) {
      console.error('Admin check error:', error);
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">Access Denied</p>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
    { icon: Briefcase, label: 'Jobs', href: '/admin/jobs' },
    { icon: BookOpen, label: 'Training', href: '/admin/training' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'Applications', href: '/admin/applications' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const managementCards = [
    {
      icon: Briefcase,
      title: 'Jobs',
      description: 'Manage job postings & listings',
      href: '/admin/jobs',
      color: 'from-blue-500 to-blue-600',
      count: 87,
    },
    {
      icon: BookOpen,
      title: 'Training',
      description: 'Manage courses & training programs',
      href: '/admin/training',
      color: 'from-purple-500 to-purple-600',
      count: 45,
    },
    {
      icon: Users,
      title: 'Users',
      description: 'Manage user accounts & profiles',
      href: '/admin/users',
      color: 'from-green-500 to-green-600',
      count: 1243,
    },
    {
      icon: FileText,
      title: 'Applications',
      description: 'Review & manage job applications',
      href: '/admin/applications',
      color: 'from-orange-500 to-orange-600',
      count: 892,
    },
    {
      icon: MessageSquare,
      title: 'Messages',
      description: 'Contact form submissions & inquiries',
      href: '/admin/messages',
      color: 'from-pink-500 to-pink-600',
      count: 24,
    },
    {
      icon: Settings,
      title: 'Categories',
      description: 'Manage job & training categories',
      href: '/admin/categories',
      color: 'from-cyan-500 to-cyan-600',
      count: 12,
    },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 fixed left-0 top-0 h-screen flex flex-col z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-lg">
              SA
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Sapphire</span>}
          </Link>
          <motion.div
            initial={false}
            animate={{ scale: 1 }}
            className={`${
              sidebarOpen ? 'mt-2' : 'hidden'
            } inline-block px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full`}
          >
            Admin
          </motion.div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} whileHover={{ x: 5 }}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.div whileHover={{ x: 5 }} className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </motion.div>

        {/* Toggle Sidebar */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Logged in as:{' '}
                <span className="font-semibold text-gray-900">{user?.email}</span>
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all"
            >
              View Storefront
            </Link>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email?.split('@')[0]}</p>
          </motion.div>

          {/* Management Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {managementCards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={card.href}>
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-gray-300 transition-all cursor-pointer h-full">
                      {/* Icon with gradient background */}
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <CardIcon size={24} className="text-white" />
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{card.description}</p>

                      {/* Count and Arrow */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-2xl font-bold text-gray-900">{card.count}</span>
                        <ChevronRight
                          size={20}
                          className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Total Users', value: '1,243', change: '+12%' },
              { label: 'Active Jobs', value: '87', change: '+5%' },
              { label: 'Total Applications', value: '892', change: '+24%' },
              { label: 'Training Courses', value: '45', change: '+3%' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 font-semibold mt-2">{stat.change} this month</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
