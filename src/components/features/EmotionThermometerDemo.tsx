import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeIn, scaleIn } from '../../utils/animations';

const EmotionThermometerDemo = () => {
  return (
    <section className="py-24 bg-gray-50/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={scaleIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="order-2 md:order-1 flex flex-col items-center justify-center p-12 bg-white border border-gray-100"
          >
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
                <span className="text-5xl font-extralight text-gray-900">4.8</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] tracking-widest px-2 py-1 uppercase">
                Stable
              </div>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className={s <= 4 ? "fill-primary text-primary" : "text-gray-200"} strokeWidth={1} />
              ))}
            </div>
            <p className="mt-4 text-[10px] tracking-[0.3em] text-gray-400 uppercase font-light">今日协作温度</p>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-8"
          >
            <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-medium">Feature 02</span>
            <h3 className="text-3xl font-light text-gray-900 tracking-tight">情绪晴雨，<br /><span className="italic font-serif">倾听彼此的回响。</span></h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              家务不仅是体力的输出，更是情感的流动。通过极简的评分体系，捕捉协作中的每一次默契与温存。当温度下降时，我们会提醒您，给爱一点缓冲的时间。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmotionThermometerDemo;