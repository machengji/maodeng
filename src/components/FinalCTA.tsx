import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Button from './ui/Button';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            准备好改变你们的
            <br />
            家务关系了吗？
          </h2>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            加入1000+幸福家庭，让家务成为增进感情的机会
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-50 shadow-2xl text-xl px-12 py-5"
            >
              免费开始
            </Button>
          </motion.div>

          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>无需信用卡</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>随时取消</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>30天满意保证</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
