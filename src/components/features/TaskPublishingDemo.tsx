import { motion } from 'framer-motion';
import { Coins, Check } from 'lucide-react';
import { fadeIn, slideUp } from '../../utils/animations';

const TaskPublishingDemo = () => {
  const tasks = [
    { title: '清晨的厨房整理', coins: 50, user: '对方' },
    { title: '洗涤昨日的记忆', coins: 60, user: '我' },
  ];

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
            <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-medium">Feature 01</span>
            <h3 className="text-3xl font-light text-gray-900 tracking-tight">日常生活，<br /><span className="italic font-serif">在秩序中重塑。</span></h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              将琐碎的家务转化为清晰的任务流。每一项付出都配有“家务币”奖励，让家庭劳动不再是一份隐身的重担，而是一份共同经营的资产。
            </p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="p-8 border border-gray-50 bg-gray-50/30 space-y-4"
          >
            {tasks.map((task, i) => (
              <div key={i} className="bg-white p-6 flex items-center justify-between border border-gray-100 shadow-sm">
                <div className="space-y-1">
                  <h4 className="text-sm font-light text-gray-800">{task.title}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Assignee: {task.user}</p>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <Coins size={14} strokeWidth={1} />
                  <span className="text-sm font-medium">{task.coins}</span>
                </div>
              </div>
            ))}
            <div className="pt-4 flex justify-center">
              <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary animate-bounce">
                <Check size={14} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TaskPublishingDemo;