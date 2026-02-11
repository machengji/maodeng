import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animations';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

const PageContainer = ({ children, title, description, action }: PageContainerProps) => {
  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-slate-50/50 pb-24 px-4 pt-6"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {(title || description || action) && (
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-1">
              {title && (
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
              )}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default PageContainer;
