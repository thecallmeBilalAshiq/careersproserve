'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Simply click on "Sign Up" in the navigation bar and fill in your details. You can also sign up using Google or GitHub for convenience.',
      },
      {
        q: 'Is CareerHub Pro free?',
        a: 'Creating an account and browsing jobs is completely free. Some premium features and courses may have associated costs.',
      },
      {
        q: 'Do I need to verify my email?',
        a: 'Yes, email verification helps us keep your account secure and ensures you receive important notifications.',
      },
    ],
  },
  {
    category: 'Jobs & Applications',
    questions: [
      {
        q: 'How do I apply for a job?',
        a: 'Navigate to a job listing, review the details, and click "Apply". You can add a cover letter and upload your resume during the application process.',
      },
      {
        q: 'Can I save jobs for later?',
        a: 'Yes! Click the bookmark icon on any job card to save it. You can find your saved jobs in the "Saved Jobs" section of your dashboard.',
      },
      {
        q: 'How often are new jobs posted?',
        a: 'New jobs are posted daily from our partner companies. Check back regularly or enable job alerts to stay updated.',
      },
    ],
  },
  {
    category: 'Training & Courses',
    questions: [
      {
        q: 'What training courses are available?',
        a: 'We offer courses across various categories including Engineering, Design, Marketing, and more. Courses range from beginner to expert levels.',
      },
      {
        q: 'Can I get a certificate upon completion?',
        a: 'Yes! Upon completing a course, you\'ll receive a certificate that you can share on your LinkedIn profile and resume.',
      },
      {
        q: 'Are there any prerequisites for courses?',
        a: 'Each course page clearly lists prerequisites. Beginner courses typically have no prerequisites, while advanced courses may require prior knowledge.',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    questions: [
      {
        q: 'How do I update my profile?',
        a: 'Go to your dashboard and click on "Profile". You can update your personal information, skills, experience, and upload a profile picture.',
      },
      {
        q: 'Is my data secure?',
        a: 'We take data security very seriously. All information is encrypted and stored securely. Read our Privacy Policy for more details.',
      },
      {
        q: 'Can I delete my account?',
        a: 'Yes. Go to Settings and select "Delete Account". Please note that this action cannot be undone.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 md:py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about CareerHub Pro.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-bold text-foreground mb-6">{section.category}</h2>
              <div className="space-y-3">
                {section.questions.map((item, itemIndex) => {
                  const itemId = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <button
                      key={itemId}
                      onClick={() => toggleItem(itemId)}
                      className="w-full text-left bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-semibold text-foreground text-lg">{item.q}</h3>
                        <ChevronDown
                          size={24}
                          className={`flex-shrink-0 text-muted-foreground transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      {isOpen && (
                        <p className="text-muted-foreground mt-4">{item.a}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Didn&apos;t find your answer?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help. Contact us anytime.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Support
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
