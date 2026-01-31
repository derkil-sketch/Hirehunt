import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, DollarSign, Check, Bookmark } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { useApp, sampleJobs } from '@/app/context/AppContext';

export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addJob, isJobSaved } = useApp();
  const [savedStates, setSavedStates] = useState<{ [key: string]: boolean }>({});

  const filteredJobs = sampleJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveJob = (job: typeof sampleJobs[0]) => {
    if (!isJobSaved(job.id)) {
      addJob(job);
      setSavedStates(prev => ({ ...prev, [job.id]: true }));
      
      // Reset animation after delay
      setTimeout(() => {
        setSavedStates(prev => ({ ...prev, [job.id]: false }));
      }, 2000);
    }
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
            Browse Jobs
          </h1>
          <p className="text-[#6B7280]">
            Discover internships and full-time opportunities
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <Input
              type="text"
              placeholder="Search by role or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => {
              const isSaved = isJobSaved(job.id);
              const showSavedAnimation = savedStates[job.id];

              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card hover className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-[20px] font-semibold text-[#0F172A] mb-1">
                          {job.title}
                        </h3>
                        <p className="text-[#111827] font-medium">
                          {job.company}
                        </p>
                      </div>
                      <Button
                        variant={isSaved ? 'ghost' : 'outline'}
                        size="sm"
                        onClick={() => handleSaveJob(job)}
                        disabled={isSaved}
                        className={`${isSaved ? 'text-[#22C55E]' : ''} min-w-[100px]`}
                      >
                        <AnimatePresence mode="wait">
                          {showSavedAnimation ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              <span>Saved</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="bookmark"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                              <span>{isSaved ? 'Saved' : 'Save'}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <DollarSign className="w-4 h-4" />
                        {job.stipend}
                      </div>
                    </div>

                    {job.description && (
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {job.description}
                      </p>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[#6B7280] text-lg">
              No jobs found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
