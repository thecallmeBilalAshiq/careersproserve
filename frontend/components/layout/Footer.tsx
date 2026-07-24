import Link from 'next/link';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: 'Job Opportunities', href: '/jobs' },
      { label: 'Professional Trainings', href: '/training' },
      { label: 'Hire Proctors', href: '/proctors/submit-job' },
      { label: 'Mystery Shopper', href: '/mystery-shopper' },
    ],
    Candidates: [
      { label: 'Submit CV / Talent Pool', href: '/talent-pool' },
      { label: 'Company Portfolio', href: '/portfolio' },
      { label: 'About Us', href: '/about' },
    ],
    Contact: [
      { label: COMPANY_DETAILS.email, href: `mailto:${COMPANY_DETAILS.email}` },
      { label: `WhatsApp: ${COMPANY_DETAILS.phone}`, href: `https://wa.me/${COMPANY_DETAILS.whatsapp}` },
      { label: 'Location: Worldwide / Remote', href: '#' },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-700 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-xl flex items-center justify-center text-amber-300 font-serif font-black text-xs shadow-md border border-purple-400/30">
                SPS
              </div>
              <span className="font-serif font-black text-slate-900 tracking-tight text-xl">
                Sapphire <span className="text-purple-800 font-bold">ProServe</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 font-serif">
              Premium corporate platform connecting executive candidates with high-impact jobs, professional training, certified proctors, and mystery shopper audits.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-serif font-bold text-slate-900 text-sm mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-600 hover:text-purple-900 transition-colors font-medium font-serif"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-serif font-medium">
            &copy; {currentYear} {COMPANY_DETAILS.name}. All rights reserved.
          </p>
          
          {/* Direct Actions */}
          <div className="flex items-center gap-3">
            <a 
              href={`mailto:${COMPANY_DETAILS.email}`} 
              className="p-2 bg-white border border-slate-200 hover:border-purple-600 rounded-xl text-slate-600 hover:text-purple-900 transition-colors shadow-sm"
              title="Email Us"
            >
              <Mail size={16} />
            </a>
            <a 
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white border border-slate-200 hover:border-emerald-600 rounded-xl text-slate-600 hover:text-emerald-700 transition-colors shadow-sm"
              title="WhatsApp Us"
            >
              <MessageSquare size={16} />
            </a>
            <a 
              href={`tel:${COMPANY_DETAILS.phone}`} 
              className="p-2 bg-white border border-slate-200 hover:border-purple-600 rounded-xl text-slate-600 hover:text-purple-900 transition-colors shadow-sm"
              title="Call Us"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
