import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Briefcase, Save, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';

export function LandingPage() {
  const features = [
    {
      icon: Save,
      title: 'Save jobs easily',
      description: 'One-click save for any job or internship you find interesting'
    },
    {
      icon: BarChart3,
      title: 'Track application status',
      description: 'Monitor your progress from application to offer'
    },
    {
      icon: CheckCircle,
      title: 'Clean dashboard & analytics',
      description: 'Visualize your job search journey at a glance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#1F2933] to-[#0F172A]">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Briefcase className="w-6 h-6" />
            <span className="text-xl font-bold">HireHunt</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="secondary">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[48px] font-bold text-white mb-6 leading-tight">
              HireHunt
            </h1>
            <p className="text-[32px] text-white/90 mb-4 font-semibold">
              Track your job and internship applications in one simple dashboard.
            </p>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Save jobs, track progress, and stay organized during placement season.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="shadow-xl">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[16px] p-8 hover:bg-white/15 transition-all">
                  <feature.icon className="w-10 h-10 text-[#6366F1] mb-4" />
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
