import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';

const HowItWorks = () => {
  const steps = [
    {
      title: '同心共创',
      description: '邀请您的伴侣，建立一个独属于你们两人的、基于信任与尊重的数字化空间。',
      label: "Establish",
    },
    {
      title: '心之向往',
      description: '将琐碎的任务转化为愿望，赋予家务新的情感价值。在这里，付出被看见。',
      label: "Inspire",
    },
    {
      title: '和谐共振',
      description: '在协作中赚取代表爱的积存，让每一次家务劳动都成为增进感情的灵感。',
      label: "Harmonize",
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 tracking-tight leading-tight">
              极简，<br />
              <span className="italic font-serif">是秩序的开端</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] text-gray-400 uppercase pb-2"
          >
            A New Way of Living
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-100 border border-gray-100"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-12 space-y-8 group hover:bg-gray-50/50 transition-all duration-700"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-300 block">
                  CHAPTER 0{index + 1}
                </span>
                <h3 className="text-2xl font-light text-gray-900 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm font-light text-gray-500 leading-relaxed min-h-[4.5rem]">
                {step.description}
              </p>
              <div className="pt-8">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gray-300 font-medium">
                  {step.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;