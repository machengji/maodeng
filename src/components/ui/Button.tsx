import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // Variants
            'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl':
              variant === 'primary',
            'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-lg hover:shadow-xl':
              variant === 'secondary',
            'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500':
              variant === 'outline',
            'text-gray-700 hover:bg-gray-100 focus:ring-gray-500':
              variant === 'ghost',
            // Sizes
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
