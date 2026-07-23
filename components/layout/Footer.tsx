import Link from 'next/link';
import { Mail, Briefcase, Code2, Share2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Resources: [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Training', href: '/training' },
      { label: 'Categories', href: '/categories' },
      { label: 'FAQ', href: '/faq' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4 text-primary">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span>CareerHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your platform for career growth, job hunting, and professional development.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-foreground mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="border-t border-border my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CareerHub Pro. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Mail size={20} className="text-muted-foreground" />
            </a>
            <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Briefcase size={20} className="text-muted-foreground" />
            </a>
            <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Code2 size={20} className="text-muted-foreground" />
            </a>
            <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Share2 size={20} className="text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
