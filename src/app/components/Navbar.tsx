import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './Button';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/saved', label: 'Saved' },
    { path: '/tracker', label: 'Tracker' }
  ];

  return (
    <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 text-[#111827] hover:opacity-80 transition-opacity">
            <Briefcase className="w-6 h-6" />
            <span className="text-xl font-bold">HireHunt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-[15px] font-medium transition-colors"
              >
                <span className={location.pathname === item.path ? 'text-[#111827]' : 'text-[#6B7280] hover:text-[#0F172A]'}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366F1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors"
            >
              <span className={`text-xs font-medium ${location.pathname === item.path ? 'text-[#6366F1]' : 'text-[#6B7280]'}`}>
                {item.label}
              </span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeMobileNav"
                  className="w-1 h-1 rounded-full bg-[#6366F1]"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
