import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ListTodo, Thermometer, Scale, Heart } from 'lucide-react';

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
