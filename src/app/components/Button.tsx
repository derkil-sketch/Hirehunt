import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#111827] text-white hover:bg-[#1F2933] hover:shadow-lg',
    secondary: 'bg-[#6366F1] text-white hover:bg-[#5558E3] hover:shadow-lg',
    outline: 'border-2 border-[#E5E7EB] text-[#0F172A] hover:border-[#6366F1] hover:bg-[#F3F4F6]',
    ghost: 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#0F172A]'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-[10px]',
    md: 'px-6 py-3 text-[15px] rounded-[12px]',
    lg: 'px-8 py-4 text-base rounded-[12px]'
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
