import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { fadeIn, scaleIn } from '../../utils/animations';

const ReconciliationDemo = () => {
  return (
    <section className="py-24 bg-gray-50/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={scaleIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="order-2 md:order-1 p-12 bg-white border border-gray-100 flex flex-col items-center space-y-8"
          >
            <div className="flex items-center space-x-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-xs font-light text-gray-400">我</div>
                <div className="text-[8px] tracking-widest text-primary uppercase">理解</div>
              </div>
              <Heart size={20} className="text-primary stroke-[1px] animate-pulse" />
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-xs font-light text-gray-400">对方</div>
                <div className="text-[8px] tracking-widest text-primary uppercase">理解</div>
              </div>
            </div>
            <div className="text-xs font-light text-gray-500 tracking-widest pt-4 border-t border-gray-50 w-full text-center">
              找到共同需求：深度共情
            </div>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-8"
          >
            <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-medium">Feature 04</span>
            <h3 className="text-3xl font-light text-gray-900 tracking-tight">温情和解，<br /><span className="italic font-serif">跨越沉默的墙。</span></h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              当争吵发生，我们为您提供理性的缓冲带。通过匹配双方的核心心理需求，生成极具执行力的和解指南，让每一次矛盾都成为更深层联结的契机。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReconciliationDemo;