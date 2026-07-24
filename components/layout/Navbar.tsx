'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { NAV_ITEMS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-800 via-indigo-800 to-slate-900 rounded-xl flex items-center justify-center text-amber-300 font-serif font-black text-xs shadow-md border border-purple-400/30">
              SPS
            </div>
            <span className="font-serif font-black text-slate-900 tracking-tight text-xl">
              Sapphire <span className="text-purple-700">Pro Serve</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600 py-1'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth / Admin Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-1.5"
            >
              Showcase
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition-all"
            >
              Admin Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-blue-600"
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
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 font-bold bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-200 mt-2 pt-3 px-4 space-y-2">
              <Link
                href="/admin/login"
                className="block px-4 py-2 text-sm font-bold text-center bg-blue-600 text-white rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
