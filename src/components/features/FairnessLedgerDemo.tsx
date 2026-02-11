import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '../../utils/animations';

const FairnessLedgerDemo = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-medium">Feature 03</span>
            <h3 className="text-3xl font-light text-gray-900 tracking-tight">公平账本，<br /><span className="italic font-serif">让付出清晰可见。</span></h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              我们用极简的图表为您复盘每一月的家庭投入。不是为了计较得失，而是为了通过数据发现失衡，在理解中重建公平与尊重的底色。
            </p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative p-12 bg-gray-900 text-white space-y-8"
          >
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-[10px] tracking-widest text-gray-500 uppercase">My Share</p>
                <div className="text-4xl font-extralight">52%</div>
              </div>
              <div className="space-y-2 text-right">
                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Partner</p>
                <div className="text-4xl font-extralight opacity-40">48%</div>
              </div>
            </div>
            <div className="h-px bg-gray-800 w-full flex overflow-hidden">
              <div className="h-full bg-white w-[52%]" />
              <div className="h-full bg-primary w-[48%]" />
            </div>
            <p className="text-center text-[10px] tracking-[0.5em] text-gray-500 uppercase">Balanced Life</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FairnessLedgerDemo;