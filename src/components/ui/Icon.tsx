import type { LucideIcon, LucideProps } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface IconProps extends LucideProps {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted' | 'success' | 'warning' | 'danger';
}

const Icon = ({ icon: LucideIcon, variant, className, size = 20, strokeWidth = 2, ...props }: IconProps) => {
  const variants = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-muted-foreground',
    success: 'text-emotion-positive',
    warning: 'text-emotion-neutral',
    danger: 'text-emotion-negative',
  };

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={twMerge(clsx(variant && variants[variant], className))}
      {...props}
    />
  );
};

export default Icon;
