import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', pulse = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-full font-medium',
          {
            // Variants
            'bg-primary-100 text-primary-700': variant === 'primary',
            'bg-secondary-100 text-secondary-700': variant === 'secondary',
            'bg-green-100 text-green-700': variant === 'success',
            'bg-amber-100 text-amber-700': variant === 'warning',
            'bg-red-100 text-red-700': variant === 'danger',
            // Sizes
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-3 py-1 text-sm': size === 'md',
            'px-4 py-1.5 text-base': size === 'lg',
            // Pulse animation
            'animate-pulse-slow': pulse,
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
