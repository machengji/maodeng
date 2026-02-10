import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', pulse = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200';
    
    const variants = {
      primary: 'bg-primary/10 text-primary border border-primary/20',
      secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
      success: 'bg-emotion-positive/10 text-emotion-positive border border-emotion-positive/20',
      warning: 'bg-emotion-neutral/10 text-emotion-neutral border border-emotion-neutral/20',
      danger: 'bg-emotion-negative/10 text-emotion-negative border border-emotion-negative/20',
      outline: 'bg-transparent border border-border text-muted-foreground',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px] uppercase tracking-wider',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={twMerge(clsx(
          baseStyles, 
          variants[variant], 
          sizes[size], 
          pulse && 'animate-pulse-slow',
          className
        ))}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export const MotionBadge = motion.create(Badge);

export default Badge;