import { useLocation, useNavigate } from 'react-router-dom';
import { ListTodo, Thermometer, Scale, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/app/tasks', icon: ListTodo, label: '日常任务' },
    { path: '/app/emotion', icon: Thermometer, label: '情绪晴雨' },
    { path: '/app/ledger', icon: Scale, label: '公平账本' },
    { path: '/app/reconciliation', icon: Heart, label: '温情和解' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-50 z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'relative flex-1 flex flex-col items-center justify-center h-full transition-all duration-500',
                isActive ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
              )}
            >
              <div className="relative flex flex-col items-center">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 1.5 : 1}
                  className="transition-all duration-500"
                />
                <span className={clsx(
                  'text-[8px] mt-2 tracking-[0.2em] font-light transition-all duration-500',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;