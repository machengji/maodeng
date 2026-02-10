import { useLocation, useNavigate } from 'react-router-dom';
import { ListTodo, Thermometer, Scale, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/app/tasks', icon: ListTodo, label: '任务' },
    { path: '/app/emotion', icon: Thermometer, label: '情绪' },
    { path: '/app/ledger', icon: Scale, label: '账本' },
    { path: '/app/reconciliation', icon: Heart, label: '和解' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-border shadow-glass z-50 px-4 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'relative flex-1 flex flex-col items-center justify-center h-full transition-all duration-300',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/5 rounded-2xl -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative">
                <Icon
                  className={clsx(
                    'w-6 h-6 transition-transform duration-300',
                    isActive ? 'scale-110' : 'scale-100'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                    transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={clsx(
                'text-[10px] mt-1.5 font-medium transition-all duration-300',
                isActive ? 'opacity-100 transform-none' : 'opacity-70'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
