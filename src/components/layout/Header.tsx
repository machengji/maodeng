import { Heart } from 'lucide-react';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">家务合伙人</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-500 transition-colors">
              功能特色
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-500 transition-colors">
              如何使用
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary-500 transition-colors">
              用户评价
            </a>
          </nav>

          {/* CTA Button */}
          <Button variant="primary" size="md">
            免费开始
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
