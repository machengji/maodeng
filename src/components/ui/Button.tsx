import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center transition-all duration-300 font-light tracking-widest uppercase focus:outline-none';
    
    const variants = {
      primary: 'bg-gray-900 text-white hover:bg-primary shadow-subtle',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      outline: 'border border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-transparent',
      ghost: 'text-gray-500 hover:text-gray-900',
    };

    const sizes = {
      sm: 'h-10 px-4 text-[10px]',
      md: 'h-12 px-8 text-xs',
      lg: 'h-14 px-12 text-sm',
    };

    return (
      <button
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export const MotionButton = motion.create(Button);
export default Button;
