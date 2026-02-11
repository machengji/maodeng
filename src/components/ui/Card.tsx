import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', ...props }, ref) => {
    const baseStyles = 'transition-all duration-500 bg-white';
    
    const variants = {
      default: 'border border-gray-100 shadow-subtle hover:shadow-art',
      flat: 'bg-gray-50/50',
      outlined: 'border border-gray-100',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-8',
      lg: 'p-12',
    };

    return (
      <div
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], paddings[padding], className))}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
export const MotionCard = motion.create(Card);
export default Card;
