import { motion } from 'framer-motion';
import { Heart, Sparkles, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-primary-500 opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-secondary-500 opacity-20"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkles className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 text-amber-500 opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Coins className="w-14 h-14" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-secondary-500" />
            <span className="text-sm font-medium text-gray-700">智能家务协作系统</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            让家务成为
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              爱的游戏
            </span>
            <br />
            而非争吵的导火索
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            用游戏化和情绪智能重建家庭和谐，让每一次家务协作都成为增进感情的机会
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => navigate('/app/tasks')}>
              开始我们的家务合伙之旅
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              观看演示视频
            </Button>
          </div>

          {/* Trust Signals */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>无需信用卡</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>随时取消</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>1000+ 家庭正在使用</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image/Illustration Placeholder */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-20 h-20 text-primary-500 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">产品演示区域</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
