import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Save as SaveIcon, Bookmark } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { useApp, ApplicationStatus } from '@/app/context/AppContext';
import { useNavigate } from 'react-router-dom';

export function TrackerPage() {
  const { savedJobs, updateJobStatus, updateJobNotes } = useApp();
  const navigate = useNavigate();
  const [expandedJobs, setExpandedJobs] = useState<{ [key: string]: boolean }>({});
  const [localNotes, setLocalNotes] = useState<{ [key: string]: string }>({});
  const [saveStates, setSaveStates] = useState<{ [key: string]: boolean }>({});

  const toggleJobExpanded = (jobId: string) => {
    setExpandedJobs(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const handleStatusChange = (jobId: string, status: ApplicationStatus) => {
    updateJobStatus(jobId, status);
  };

  const handleNotesChange = (jobId: string, notes: string) => {
    setLocalNotes(prev => ({ ...prev, [jobId]: notes }));
  };

  const handleSaveNotes = (jobId: string) => {
    const notes = localNotes[jobId] || '';
    updateJobNotes(jobId, notes);
    setSaveStates(prev => ({ ...prev, [jobId]: true }));
    
    setTimeout(() => {
      setSaveStates(prev => ({ ...prev, [jobId]: false }));
    }, 2000);
  };

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

  const statuses: ApplicationStatus[] = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

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
            Application Tracker
          </h1>
          <p className="text-[#6B7280]">
            Update status and add notes for your applications
          </p>
        </motion.div>

        {/* Tracker Cards */}
        {savedJobs.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {savedJobs.map((job, index) => {
                const isExpanded = expandedJobs[job.id] || false;
                const currentNotes = localNotes[job.id] !== undefined ? localNotes[job.id] : job.notes;
                const isSaved = saveStates[job.id];

                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden">
                      {/* Header */}
                      <div
                        className="p-6 cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                        onClick={() => toggleJobExpanded(job.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                              <Bookmark className="w-5 h-5 text-[#6366F1] fill-current" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[20px] font-semibold text-[#0F172A] mb-1">
                                {job.title}
                              </h3>
                              <p className="text-[#6B7280]">{job.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: getStatusBgColor(job.status),
                                color: getStatusColor(job.status)
                              }}
                            >
                              {job.status}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-[#E5E7EB]"
                          >
                            <div className="p-6 space-y-6">
                              {/* Status Dropdown */}
                              <div>
                                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                                  Application Status
                                </label>
                                <div className="relative">
                                  <select
                                    value={job.status}
                                    onChange={(e) => handleStatusChange(job.id, e.target.value as ApplicationStatus)}
                                    className="w-full md:w-auto px-4 py-3 bg-white border border-[#E5E7EB] rounded-[10px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent appearance-none pr-10 cursor-pointer"
                                    style={{
                                      backgroundColor: getStatusBgColor(job.status),
                                      color: getStatusColor(job.status)
                                    }}
                                  >
                                    {statuses.map(status => (
                                      <option key={status} value={status}>
                                        {status}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: getStatusColor(job.status) }} />
                                </div>
                              </div>

                              {/* Notes */}
                              <div>
                                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                                  Notes
                                </label>
                                <textarea
                                  value={currentNotes}
                                  onChange={(e) => handleNotesChange(job.id, e.target.value)}
                                  placeholder="Add personal notes (interview date, contact, feedback...)"
                                  rows={4}
                                  className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-[10px] text-[#0F172A] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-none"
                                />
                              </div>

                              {/* Save Button */}
                              <Button
                                variant="secondary"
                                onClick={() => handleSaveNotes(job.id)}
                                className="w-full md:w-auto"
                              >
                                <SaveIcon className="w-4 h-4" />
                                {isSaved ? 'Saved!' : 'Save Notes'}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
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
                No applications to track
              </h3>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Save some jobs first to start tracking your application progress.
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
