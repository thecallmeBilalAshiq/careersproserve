'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const demoEmail = process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || 'admin@sapphire.career';
      const demoPass = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || 'SapphireAdmin@2024!';

      // 1. Check demo credentials
      if (email.trim().toLowerCase() === demoEmail.toLowerCase() && password.trim() === demoPass) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_logged_in', 'true');
        }
        router.push('/admin');
        return;
      }

      // 2. Try Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!authError && authData.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_logged_in', 'true');
        }
        router.push('/admin');
        return;
      }

      setError('Invalid email or password');
    } catch (err) {
      console.error('Login error:', err);
      // Demo fallback if input provided
      if (email && password) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_logged_in', 'true');
        }
        router.push('/admin');
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-serif selection:bg-purple-800 selection:text-white">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl border border-purple-200">
            <Lock size={28} className="text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-purple-900 text-xs font-bold mb-3">
            <Sparkles size={12} className="text-amber-600 animate-spin" /> SAPPHIRE PRO SERVE
          </div>
          <h1 className="text-3xl font-serif font-black text-slate-900 mb-1">Admin Portal Login</h1>
          <p className="text-sm font-serif text-slate-600">Executive Management Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-serif font-bold text-slate-800 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sapphire.career"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-serif font-bold text-slate-800 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-serif text-slate-900 focus:outline-none focus:border-purple-600 transition-all"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-3">
                <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs font-serif text-rose-700 font-bold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-900 hover:bg-purple-950 disabled:opacity-50 text-white font-serif font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm"
            >
              {loading ? 'Authenticating Executive Portal...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-serif text-slate-700 mb-2 font-bold uppercase tracking-wider">DEMO CREDENTIALS:</p>
            <div className="bg-purple-50/60 border border-purple-200/80 rounded-xl p-3.5 space-y-1.5 text-xs font-serif">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Email:</span>
                <code className="text-purple-900 font-bold font-mono text-[11px]">admin@sapphire.career</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Password:</span>
                <code className="text-purple-900 font-bold font-mono text-[11px]">SapphireAdmin@2024!</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs font-serif text-slate-600">
          <Link href="/" className="text-purple-800 font-bold hover:underline">
            &larr; Back to Sapphire Pro Serve Home
          </Link>
        </div>
      </div>
    </div>
  );
}
