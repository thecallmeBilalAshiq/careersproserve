'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { NAV_ITEMS } from '@/lib/constants';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 rounded-xl flex items-center justify-center text-amber-300 font-serif font-black text-sm shadow-md border border-purple-400/30 group-hover:scale-105 transition-transform">
              SPS
            </div>
            <span className="font-serif font-black text-slate-900 tracking-tight text-2xl">
              Sapphire <span className="text-purple-800 font-bold">ProServe</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-serif font-bold transition-all duration-200 ${
                    active
                      ? 'bg-purple-900 text-white shadow-md'
                      : 'text-slate-700 hover:bg-purple-100/80 hover:text-purple-950 hover:shadow-sm'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 hover:from-purple-950 hover:to-black text-white rounded-xl text-sm font-serif font-bold shadow-md hover:shadow-lg transition-all border border-purple-700/30 hover:scale-[1.02]"
            >
              <Sparkles size={15} className="text-amber-300 animate-pulse" /> CEO Portfolio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-slate-800 hover:bg-purple-100 rounded-xl transition-colors"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 bg-white space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-serif font-bold transition-all ${
                    active
                      ? 'bg-purple-900 text-white font-black'
                      : 'text-slate-800 hover:bg-purple-100 hover:text-purple-950'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 px-2">
              <Link
                href="/portfolio"
                className="block px-4 py-3 text-sm font-serif font-bold text-center bg-purple-900 text-white rounded-xl shadow-md"
                onClick={() => setIsOpen(false)}
              >
                CEO Portfolio (Sapphire Loyal)
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
