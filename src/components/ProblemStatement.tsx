import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '../utils/animations';

const ProblemStatement = () => {
  const thoughts = [
    {
      label: "付出的隐身",
      content: "为什么家中的琐碎，总是落在一人的肩头，而另一人却浑然不觉？",
    },
    {
      label: "指责的刺痛",
      content: "当家务变成了考核，每一句纠正都像是一场无声的审判。",
    },
    {
      label: "秩序的缺失",
      content: "缺乏客观的衡量，让爱的港湾变成了计较得失的谈判桌。",
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Abstract Decorative Line */}
        <div className="absolute left-0 top-1/2 w-32 h-px bg-gray-100 hidden lg:block" />
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={fadeIn} className="inline-flex items-center space-x-4">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-medium">Reflection</span>
            </motion.div>
            
            <motion.h2 
              variants={slideUp}
              className="text-4xl md:text-5xl font-extralight text-gray-900 leading-tight tracking-tight"
            >
              在生活的琐碎中<br />
              <span className="italic font-serif">审视那些被忽视的裂痕</span>
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-lg text-gray-400 font-light leading-relaxed max-w-md">
              家务不应是感情的磨损石。我们为您捕捉那些微小的失衡，重新定义“家”的意义。
            </motion.p>
          </div>

          <div className="space-y-16">
            {thoughts.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="group space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-mono text-gray-300">0{index + 1}</span>
                  <h4 className="text-sm uppercase tracking-[0.3em] text-gray-900 font-medium group-hover:text-primary transition-colors">
                    {item.label}
                  </h4>
                </div>
                <p className="text-xl font-extralight text-gray-500 leading-relaxed pl-10 border-l border-transparent group-hover:border-gray-100 transition-all duration-700">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;