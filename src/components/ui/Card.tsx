import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-300 overflow-hidden';
    
    const variants = {
      default: 'bg-white',
      elevated: 'bg-white shadow-soft hover:shadow-soft-lg',
      outlined: 'bg-white border border-border',
      glass: 'glass-card',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hover ? 'hover:-translate-y-1 hover:shadow-soft-xl' : '';

    return (
      <div
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], paddings[padding], hoverStyles, className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Motion version of the card
export const MotionCard = motion.create(Card);

export default Card;