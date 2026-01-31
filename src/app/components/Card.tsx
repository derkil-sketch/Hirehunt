import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseStyles = 'bg-white rounded-[16px] shadow-sm border border-[#E5E7EB]/50';
  const hoverStyles = hover ? 'cursor-pointer transition-all duration-200' : '';

  if (hover) {
    return (
      <motion.div
        className={`${baseStyles} ${hoverStyles} ${className}`}
        whileHover={{ y: -6, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
