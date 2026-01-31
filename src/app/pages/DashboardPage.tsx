import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Save, Send, Video, Trophy, XCircle, TrendingUp } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import { Card } from '@/app/components/Card';
import { useApp } from '@/app/context/AppContext';

export function DashboardPage() {
  const { getStatusCounts } = useApp();
  const counts = getStatusCounts();

  // Animated counter
  function AnimatedCounter({ value }: { value: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = value;
      const duration = 1000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value]);

    return <span>{count}</span>;
  }

  const stats = [
    {
      label: 'Saved',
      value: counts.Saved,
      icon: Save,
      color: '#6B7280',
      bgColor: '#F3F4F6'
    },
    {
      label: 'Applied',
      value: counts.Applied,
      icon: Send,
      color: '#6366F1',
      bgColor: '#EEF2FF'
    },
    {
      label: 'Interview',
      value: counts.Interview,
      icon: Video,
      color: '#F59E0B',
      bgColor: '#FEF3C7'
    },
    {
      label: 'Offer',
      value: counts.Offer,
      icon: Trophy,
      color: '#22C55E',
      bgColor: '#DCFCE7'
    },
    {
      label: 'Rejected',
      value: counts.Rejected,
      icon: XCircle,
      color: '#EF4444',
      bgColor: '#FEE2E2'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-0">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-[42px] font-bold text-[#0F172A] mb-2">
            Welcome back
          </h1>
          <p className="text-[#6B7280]">
            Here's an overview of your job application journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-[32px] font-bold text-[#0F172A] mb-1">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-[#6B7280]">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="text-[22px] font-semibold text-[#0F172A] mb-2">
                    Track Your Progress
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    HireHunt helps you stay organized during placement season. Save jobs you're interested in, track where you've applied, and manage interview schedules all in one place.
                  </p>
                  <ul className="space-y-2 text-sm text-[#6B7280]">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                      Never lose track of an opportunity
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                      Update status as you progress
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                      Add notes and important dates
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-[#111827] to-[#1F2933] text-white border-0">
              <h3 className="text-[22px] font-semibold mb-3">
                Future Roadmap
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                We're constantly improving HireHunt. Here's what's coming next:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  Resume upload and management
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  Live job API integration
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  Email reminders & notifications
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  Advanced analytics dashboard
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
