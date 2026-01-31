import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, DollarSign, Trash2, FileText, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { useApp } from '@/app/context/AppContext';

export function SavedJobsPage() {
  const { savedJobs, removeJob } = useApp();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    const colors = {
      Saved: '#6B7280',
      Applied: '#6366F1',
      Interview: '#F59E0B',
      Offer: '#22C55E',
      Rejected: '#EF4444'
    };
    return colors[status as keyof typeof colors] || '#6B7280';
  };

  const getStatusBgColor = (status: string) => {
    const colors = {
      Saved: '#F3F4F6',
      Applied: '#EEF2FF',
      Interview: '#FEF3C7',
      Offer: '#DCFCE7',
      Rejected: '#FEE2E2'
    };
    return colors[status as keyof typeof colors] || '#F3F4F6';
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-0">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-[42px] font-bold text-[#0F172A] mb-2">
            Saved Jobs
          </h1>
          <p className="text-[#6B7280]">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </motion.div>

        {/* Job List */}
        {savedJobs.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {savedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card hover className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                            <Bookmark className="w-5 h-5 text-[#6366F1] fill-current" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[20px] font-semibold text-[#0F172A] mb-1">
                              {job.title}
                            </h3>
                            <p className="text-[#111827] font-medium mb-3">
                              {job.company}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <DollarSign className="w-4 h-4" />
                            {job.stipend}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: getStatusBgColor(job.status),
                              color: getStatusColor(job.status)
                            }}
                          >
                            {job.status}
                          </span>
                          {job.notes && (
                            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                              <FileText className="w-3.5 h-3.5" />
                              <span className="line-clamp-1">{job.notes.substring(0, 50)}{job.notes.length > 50 ? '...' : ''}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate('/tracker')}
                          className="flex-1 md:flex-none"
                        >
                          Open Tracker
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeJob(job.id)}
                          className="text-[#EF4444] hover:bg-[#FEE2E2] flex-1 md:flex-none"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="md:hidden">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-[#6B7280]" />
              </div>
              <h3 className="text-[22px] font-semibold text-[#0F172A] mb-2">
                No saved jobs yet
              </h3>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Start saving jobs from the Jobs page to keep track of opportunities you're interested in.
              </p>
              <Button variant="secondary" onClick={() => navigate('/jobs')}>
                Browse Jobs
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
