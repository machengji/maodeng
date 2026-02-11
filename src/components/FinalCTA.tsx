import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MotionButton } from './ui/Button';
import { fadeIn, slideUp } from '../utils/animations';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-40 bg-gray-900 relative overflow-hidden text-center">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="500" r="400" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="500" cy="500" r="300" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-[10px] tracking-[0.5em] text-gray-500 uppercase">A New Beginning</span>
          <h2 className="text-4xl md:text-6xl font-extralight text-white tracking-tight leading-tight">
            重启你们的<br />
            <span className="italic font-serif text-primary">居家协作哲学</span>
          </h2>
        </motion.div>

        <motion.p 
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
        >
          不仅是工具，更是一种生活的仪式。让每一分付出都归于平衡，让爱在纯粹中恒久。
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="pt-8"
        >
          <MotionButton
            size="lg"
            className="rounded-none px-16 py-8 bg-white text-gray-900 hover:bg-primary hover:text-white transition-all duration-500 shadow-none border-none"
            onClick={() => navigate('/app/tasks')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            开启我们的篇章
          </MotionButton>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="pt-12 flex justify-center space-x-12"
        >
          {['无需繁琐配置', '完全私密', '永久免费'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;