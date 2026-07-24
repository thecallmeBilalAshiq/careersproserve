'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, AlertCircle } from 'lucide-react';

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
      // Sign in with email and password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Login failed');
        setLoading(false);
        return;
      }

      // Check if user is admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (adminError || !adminUser) {
        await supabase.auth.signOut();
        setError('You do not have admin access');
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border border-purple-200">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-serif font-black text-slate-900 mb-1">Sapphire Pro Serve Admin</h1>
          <p className="text-sm font-serif text-slate-600">Executive Portal Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sapphire.career"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-foreground font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3 font-semibold">DEMO CREDENTIALS:</p>
            <div className="bg-background/50 rounded p-3 space-y-2 text-xs">
              <div>
                <p className="text-muted-foreground">Email:</p>
                <code className="text-primary font-mono">admin@sapphire.career</code>
              </div>
              <div>
                <p className="text-muted-foreground">Password:</p>
                <code className="text-primary font-mono">SapphireAdmin@2024!</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
