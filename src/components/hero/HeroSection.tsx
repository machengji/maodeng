import { motion } from 'framer-motion';
import { Heart, Sparkles, Coins, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button, { MotionButton } from '../ui/Button';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';
import Icon from '../ui/Icon';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-50 via-white to-secondary-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[5%] text-primary/10"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={120} strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[10%] text-secondary/10"
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkles size={160} strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[15%] text-accent/10"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Coins size={100} strokeWidth={1} />
        </motion.div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-200/20 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-glass border border-white/50">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-primary-200 to-secondary-200" />
                ))}
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                1000+ 家庭的选择
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={slideUp}
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 leading-[1.1]"
          >
            让家务成为
            <span className="relative inline-block ml-4">
              <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                爱的游戏
              </span>
              <motion.svg
                viewBox="0 0 200 20"
                className="absolute -bottom-2 left-0 w-full h-4 text-primary/20 -z-0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <path d="M0,10 Q50,0 100,10 T200,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={slideUp}
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            用游戏化和情绪智能重建家庭和谐，让每一次家务协作都成为增进感情的机会。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={slideUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <MotionButton 
              size="lg" 
              className="w-full sm:w-auto group shadow-primary/20"
              onClick={() => navigate('/app/tasks')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立刻开始
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MotionButton>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto bg-white/50 backdrop-blur-sm group"
            >
              <Play className="mr-2 w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              观看演示
            </Button>
          </motion.div>

          {/* Featured In / Social Proof */}
          <motion.div
            variants={fadeIn}
            className="mt-20 pt-10 border-t border-gray-100"
          >
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">
              深受现代家庭喜爱
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Replace with actual logos if available */}
              <div className="text-2xl font-bold italic">HarmonyPlus</div>
              <div className="text-2xl font-bold italic">CoupleCare</div>
              <div className="text-2xl font-bold italic">FamilyFirst</div>
              <div className="text-2xl font-bold italic">LifeBalance</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
