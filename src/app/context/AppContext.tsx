import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ApplicationStatus = 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  description?: string;
}

export interface SavedJob extends Job {
  status: ApplicationStatus;
  notes: string;
  savedAt: string;
}

interface AppContextType {
  savedJobs: SavedJob[];
  addJob: (job: Job) => void;
  removeJob: (id: string) => void;
  updateJobStatus: (id: string, status: ApplicationStatus) => void;
  updateJobNotes: (id: string, notes: string) => void;
  isJobSaved: (id: string) => boolean;
  getStatusCounts: () => { [key in ApplicationStatus]: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'hirehunt_saved_jobs';

// Sample jobs data
export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    stipend: '$8,000/month',
    description: 'Work on cutting-edge technology with talented engineers.'
  },
  {
    id: '2',
    title: 'Frontend Developer Intern',
    company: 'Meta',
    location: 'Menlo Park, CA',
    stipend: '$7,500/month',
    description: 'Build user interfaces for billions of users worldwide.'
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Microsoft',
    location: 'Redmond, WA',
    stipend: '$7,000/month',
    description: 'Analyze data and build machine learning models.'
  },
  {
    id: '4',
    title: 'Full Stack Developer Intern',
    company: 'Amazon',
    location: 'Seattle, WA',
    stipend: '$6,800/month',
    description: 'Develop scalable web applications for AWS services.'
  },
  {
    id: '5',
    title: 'Product Management Intern',
    company: 'Apple',
    location: 'Cupertino, CA',
    stipend: '$7,200/month',
    description: 'Drive product strategy and work with design teams.'
  },
  {
    id: '6',
    title: 'Machine Learning Intern',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    stipend: '$9,000/month',
    description: 'Research and develop AI models for large language systems.'
  },
  {
    id: '7',
    title: 'Backend Engineering Intern',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    stipend: '$7,800/month',
    description: 'Build scalable backend systems for streaming services.'
  },
  {
    id: '8',
    title: 'Mobile Developer Intern',
    company: 'Uber',
    location: 'San Francisco, CA',
    stipend: '$6,500/month',
    description: 'Develop mobile applications for iOS and Android.'
  },
  {
    id: '9',
    title: 'DevOps Intern',
    company: 'Stripe',
    location: 'Remote',
    stipend: '$7,000/month',
    description: 'Manage infrastructure and deployment pipelines.'
  },
  {
    id: '10',
    title: 'UI/UX Design Intern',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    stipend: '$6,200/month',
    description: 'Design beautiful and intuitive user experiences.'
  },
  {
    id: '11',
    title: 'Cybersecurity Intern',
    company: 'Cloudflare',
    location: 'Austin, TX',
    stipend: '$6,800/month',
    description: 'Protect internet infrastructure from security threats.'
  },
  {
    id: '12',
    title: 'Cloud Engineer Intern',
    company: 'Salesforce',
    location: 'San Francisco, CA',
    stipend: '$7,200/month',
    description: 'Build cloud-based CRM solutions.'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
  }, [savedJobs]);

  const addJob = (job: Job) => {
    const savedJob: SavedJob = {
      ...job,
      status: 'Saved',
      notes: '',
      savedAt: new Date().toISOString()
    };
    setSavedJobs(prev => [...prev, savedJob]);
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const updateJobStatus = (id: string, status: ApplicationStatus) => {
    setSavedJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status } : job
    ));
  };

  const updateJobNotes = (id: string, notes: string) => {
    setSavedJobs(prev => prev.map(job => 
      job.id === id ? { ...job, notes } : job
    ));
  };

  const isJobSaved = (id: string) => {
    return savedJobs.some(job => job.id === id);
  };

  const getStatusCounts = () => {
    const counts: { [key in ApplicationStatus]: number } = {
      Saved: 0,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };
    
    savedJobs.forEach(job => {
      counts[job.status]++;
    });
    
    return counts;
  };

  return (
    <AppContext.Provider value={{
      savedJobs,
      addJob,
      removeJob,
      updateJobStatus,
      updateJobNotes,
      isJobSaved,
      getStatusCounts
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
