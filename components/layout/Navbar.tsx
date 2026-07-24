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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-xl flex items-center justify-center text-amber-300 font-serif font-black text-xs shadow-md border border-purple-400/30">
              SPS
            </div>
            <span className="font-serif font-black text-slate-900 tracking-tight text-xl">
              Sapphire <span className="text-purple-800">Pro Serve</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-serif font-bold tracking-wide transition-colors ${
                  isActive(item.href)
                    ? 'text-purple-900 font-black border-b-2 border-purple-800 py-1'
                    : 'text-slate-600 hover:text-purple-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 hover:from-purple-950 hover:to-black text-white rounded-xl text-xs font-serif font-bold shadow-md transition-all border border-purple-700/30"
            >
              <Sparkles size={13} className="text-amber-300" /> Showcase (CEO Profile)
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-purple-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 bg-white">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 text-xs font-serif font-bold transition-colors ${
                  isActive(item.href)
                    ? 'text-purple-900 font-black bg-purple-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-200 mt-2 pt-3 px-4">
              <Link
                href="/portfolio"
                className="block px-4 py-2 text-xs font-serif font-bold text-center bg-purple-900 text-white rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Showcase (CEO Profile)
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
