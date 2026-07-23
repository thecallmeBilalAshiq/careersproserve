'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Briefcase, Award, Users, BarChart3, Target } from 'lucide-react';

export default function SapphirePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const experience = [
    {
      role: 'Training & Standards Specialist',
      company: 'COLABS',
      period: '2023 - Present',
      description: 'Leading training initiatives and service quality standards in hospitality',
    },
    {
      role: 'Sr Training Executive',
      company: 'Papa Johns Pakistan',
      period: '2022 - 2023',
      description: 'Designed and implemented high-impact learning programs',
    },
    {
      role: 'Training Manager',
      company: 'Burger King Pakistan',
      period: '2021 - 2022',
      description: 'Comprehensive training programs and team leadership',
    },
    {
      role: 'Assistant Restaurant Manager',
      company: 'KFC Pakistan',
      period: '2020 - 2021',
      description: 'Team management and operational excellence',
    },
  ];

  const achievements = [
    { stat: '3000+', label: 'Candidates Recruited' },
    { stat: '5000+', label: 'Employees Trained' },
    { stat: '100+', label: 'Compliance Audits' },
    { stat: '10+', label: 'Years Experience' },
  ];

  const skills = [
    'Train the Trainer',
    'Performance Management',
    'QSR Operations',
    'Training Gap Analysis',
    'Team Leadership',
    'Recruitment Strategy',
    'Food Safety Compliance',
    'Career Coaching',
  ];

  const services = [
    {
      title: 'Tailored Recruitment',
      description: 'Skilled, semi-skilled & unskilled staff for QSR brands',
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: 'Training Programs',
      description: 'Practical, engaging training for service, safety, and leadership',
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: 'Operational Audits',
      description: 'Compliance checks, mystery shops & performance analysis',
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: 'Team Development',
      description: 'Engagement activities and performance optimization',
      icon: <Target className="w-8 h-8" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full overflow-hidden bg-background">
      {/* Custom Cursor */}
      {isHovering && (
        <motion.div
          className="fixed w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full pointer-events-none z-50 border-2 border-primary"
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div
          className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-background/80 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sapphire
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            Back to Hub
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4"
                variants={itemVariants}
              >
                Sapphire Loyal
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground font-light"
                variants={itemVariants}
              >
                CHRP | People & Culture Lead | ProServe Founder
              </motion.p>
            </div>

            <motion.p
              className="text-lg leading-relaxed text-muted-foreground max-w-xl"
              variants={itemVariants}
            >
              Building service-driven, high-performing teams across QSR brands. Over a decade of expertise in training, operations, and people development.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <a
                href="mailto:sapphireloyal@gmail.com"
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
              >
                Get in Touch
              </a>
              <a
                href="https://linkedin.com/in/sapphire-loyal-chrp-7b0522186"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
              >
                LinkedIn Profile
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6 pt-8 border-t border-border/20"
              variants={itemVariants}
            >
              {achievements.map((item, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold text-primary">{item.stat}</p>
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10" />
              <Image
                src="/sapphire-profile.png"
                alt="Sapphire Loyal"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-accent rounded-full p-6 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-white font-bold text-center text-sm">CHRP<br />Certified</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">About Me</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A CHRP-certified trainer and operations coach dedicated to transforming QSR brands through people-first cultures and operational excellence.
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto text-center"
            >
              I'm the founder of ProServe Consultancy, where I help QSR brands build service-driven, high-performing teams. With hands-on experience at KFC, Burger King, Papa Johns, and COLABS, I've led training initiatives, operational audits, and team transformations that deliver measurable results. Beyond systems and processes, my passion lies in people—guiding individuals towards clarity, confidence, and career growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-foreground text-center"
          >
            ProServe Services
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-xl border border-border/20 bg-muted/50 hover:bg-muted/80 hover:border-primary/50 transition-all group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-foreground text-center"
            >
              Professional Journey
            </motion.h2>

            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-primary/20 hover:border-primary transition-colors"
                >
                  <div className="absolute -left-4 top-0 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="mt-2 text-muted-foreground">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-foreground text-center"
          >
            Core Competencies
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={containerVariants}
          >
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-foreground font-semibold hover:border-primary/50 transition-all cursor-pointer"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-foreground"
            >
              Ready to Transform Your Team?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mt-4"
            >
              Connect with me for training solutions, operational audits, or career coaching.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              variants={itemVariants}
            >
              <a
                href="mailto:sapphireloyal@gmail.com"
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail size={20} /> Email Me
              </a>
              <a
                href="https://linkedin.com/in/sapphire-loyal-chrp-7b0522186"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <Briefcase size={20} /> LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/20">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>Sapphire Career Hub © 2024 | People • Process • Performance</p>
        </div>
      </footer>
    </div>
  );
}
