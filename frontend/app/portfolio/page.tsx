import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Download, Globe, Mail, ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero/Introduction */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-black">Careers Pro Serve</h1>
              <p className="text-xl text-muted-foreground mb-2">Executive Consulting & Recruitment</p>
              <p className="text-muted-foreground mb-6 text-balance">
                Visionary leader with 15+ years of experience in business strategy, digital transformation, and organizational excellence at Careers Pro Serve.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Get in Touch <Mail size={20} />
                </Link>
                <button className="px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                  Download Executive Resume <Download size={20} />
                </button>
              </div>
            </div>
            <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="text-6xl">👔</div>
                <p className="text-sm text-muted-foreground mt-2">Executive Profile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">About Careers Pro Serve</h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-4 text-muted-foreground">
            <p>
              With a passion for excellence and a track record of delivering transformative solutions, we help candidates and organizations navigate complex recruitment challenges and achieve sustainable growth.
            </p>
            <p>
              Our expertise spans business strategy, digital innovation, executive leadership, mystery shopper auditing, and proctored job placements.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Professional Services</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Executive Consulting & Auditing',
                company: 'Careers Pro Serve',
                period: '2018 - Present',
                description: 'Lead strategic hiring initiatives, mystery shopping audit operations, and executive advisory.',
              },
              {
                title: 'Senior Talent Acquisition',
                company: 'Global Corporate Group',
                period: '2015 - 2018',
                description: 'Developed and implemented enterprise-wide recruitment strategies.',
              },
            ].map((exp, index) => (
              <div key={index} className="border-l-2 border-primary pl-6 pb-6 last:pb-0">
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <p className="text-primary font-medium mb-1">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Interested in executive consulting or mystery shopper teams? Contact Careers Pro Serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careersproserve@gmail.com"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} /> careersproserve@gmail.com
            </a>
            <a
              href="https://wa.me/923216714725"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <Globe size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
