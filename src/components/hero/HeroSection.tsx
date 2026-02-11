import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button, { MotionButton } from '../ui/Button';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Abstract Artistic Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.path
            d="M 0 500 Q 250 200 500 500 T 1000 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="200" cy="300" r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 800 200 L 900 400 L 700 400 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {/* Minimalism Title */}
          <div className="space-y-4">
            <motion.p 
              variants={fadeIn}
              className="text-xs uppercase tracking-[0.3em] text-gray-400 font-light"
            >
              Art of Living Together
            </motion.p>
            <motion.h1 
              variants={slideUp}
              className="text-5xl md:text-7xl font-light text-gray-900 leading-tight tracking-tight"
            >
              让爱在秩序中
              <span className="block italic font-serif text-primary mt-2">
                自由呼吸
              </span>
            </motion.h1>
          </div>

          <motion.p 
            variants={slideUp}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            去繁就简。用最纯粹的方式，管理家庭的每一份付出与感动。
          </motion.p>

          {/* Minimalist CTA */}
          <motion.div 
            variants={slideUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
          >
            <MotionButton 
              variant="primary"
              size="lg" 
              className="rounded-none px-12 py-6 bg-gray-900 hover:bg-primary transition-colors duration-500"
              onClick={() => navigate('/app/tasks')}
            >
              开始探索
            </MotionButton>
            <button 
              className="group flex items-center space-x-2 text-sm tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
            >
              <span>了解哲学</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div 
            variants={fadeIn}
            className="pt-24"
          >
            <div className="w-px h-24 bg-gradient-to-b from-gray-200 to-transparent mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;