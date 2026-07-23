import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Download, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero/Introduction */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Sapphire Loyal</h1>
              <p className="text-xl text-muted-foreground mb-2">Executive Consultant</p>
              <p className="text-muted-foreground mb-6 text-balance">
                Visionary leader with 15+ years of experience in business strategy, digital transformation, and organizational excellence at ProServe Consultancy.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Get in Touch <Mail size={20} />
                </Link>
                <button className="px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                  Download Resume <Download size={20} />
                </button>
              </div>
            </div>
            <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="text-6xl">👔</div>
                <p className="text-sm text-muted-foreground mt-2">Professional Portrait</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">About</h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-4 text-muted-foreground">
            <p>
              With a passion for excellence and a track record of delivering transformative solutions, I help organizations navigate complex challenges and achieve sustainable growth.
            </p>
            <p>
              My expertise spans business strategy, digital innovation, executive leadership, and organizational development. I&apos;ve guided Fortune 500 companies and emerging startups to achieve their strategic objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Professional Experience</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Executive Consultant',
                company: 'ProServe Consultancy',
                period: '2018 - Present',
                description: 'Lead strategic initiatives and provide executive advisory to C-suite teams across diverse industries.',
              },
              {
                title: 'Senior Strategy Manager',
                company: 'Global Corporate Group',
                period: '2015 - 2018',
                description: 'Developed and implemented enterprise-wide strategies resulting in 40% revenue growth.',
              },
              {
                title: 'Business Analyst',
                company: 'Innovation Partners Inc',
                period: '2012 - 2015',
                description: 'Analyzed market trends and provided data-driven insights for business development.',
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

      {/* Services */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Services Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Business Strategy & Planning',
              'Digital Transformation',
              'Executive Coaching',
              'Organizational Development',
              'Market Analysis',
              'Change Management',
            ].map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{service}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Strategic Planning',
              'Business Development',
              'Executive Leadership',
              'Digital Innovation',
              'Market Analysis',
              'Team Building',
              'Project Management',
              'Risk Management',
              'Financial Acumen',
              'Stakeholder Management',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Client Testimonials</h2>
          <div className="space-y-6">
            {[
              {
                quote: 'Sapphire&apos;s strategic guidance transformed our organization and significantly improved our market position.',
                author: 'CEO, Fortune 500 Company',
              },
              {
                quote: 'An exceptional consultant who combines deep industry knowledge with practical business acumen.',
                author: 'CFO, Tech Startup',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
              >
                <p className="text-muted-foreground mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
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
            Interested in consulting services? Let&apos;s discuss how I can help your organization achieve its goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sapphire@example.com"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} /> Send Email
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
