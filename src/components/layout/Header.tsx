import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center space-x-3"
        >
          {/* Abstract Minimalist Logo */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1"/>
          </svg>
          <span className="text-sm tracking-[0.4em] font-light uppercase text-gray-900">MaoDeng</span>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-12">
          {['Philosophy', 'App', 'Journal'].map((item) => (
            <button 
              key={item}
              className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-900 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;