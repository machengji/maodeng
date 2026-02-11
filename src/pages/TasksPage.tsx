import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Clock, Plus, Check } from 'lucide-react';
import Card, { MotionCard } from '../components/ui/Card';
import Button, { MotionButton } from '../components/ui/Button';
import PageContainer from '../components/layout/PageContainer';
import { staggerContainer, fadeIn } from '../utils/animations';

interface Task {
  id: number;
  title: string;
  time: string;
  coins: number;
  urgent: boolean;
  claimed: boolean;
  claimedBy?: string;
  completed: boolean;
  createdBy: string;
}

const TasksPage = () => {
  const [currentUser] = useState('我');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '清晨的厨房整理',
      time: '30 分钟',
      coins: 50,
      urgent: false,
      claimed: false,
      completed: false,
      createdBy: '对方',
    },
    {
      id: 2,
      title: '洗涤昨日的记忆',
      time: '45 分钟',
      coins: 60,
      urgent: false,
      claimed: true,
      claimedBy: '我',
      completed: false,
      createdBy: '对方',
    },
    {
      id: 3,
      title: '重塑客厅的秩序',
      time: '20 分钟',
      coins: 100,
      urgent: true,
      claimed: false,
      completed: false,
      createdBy: '我',
    },
  ]);

  const activeTasks = tasks.filter(t => !t.completed);
  
  return (
    <PageContainer 
      title="日常生活" 
      description="在琐碎中发现秩序，在付出中见证爱"
      action={
        <MotionButton
          variant="outline"
          size="sm"
          className="rounded-full px-6"
          whileHover={{ scale: 1.02 }}
        >
          <Plus className="w-3 h-3 mr-2" />
          记录新任务
        </MotionButton>
      }
    >
      {/* Abstract Coin Summary */}
      <motion.div 
        variants={fadeIn}
        className="flex items-center justify-between py-12 border-y border-gray-50 mb-12"
      >
        <div className="text-center flex-1">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-2">我的积存</p>
          <h3 className="text-4xl font-extralight text-gray-900">150</h3>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="text-center flex-1">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-2">对方贡献</p>
          <h3 className="text-4xl font-extralight text-gray-900">120</h3>
        </div>
      </motion.div>

      {/* Task List */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-16"
      >
        <AnimatePresence mode="popLayout">
          {activeTasks.map((task) => (
            <MotionCard
              key={task.id}
              layout
              variant="default"
              padding="none"
              className="border-none shadow-none bg-transparent group"
            >
              <div className="flex items-start justify-between group-hover:bg-gray-50/50 transition-colors duration-700 p-4 -mx-4">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] text-gray-300 font-mono tracking-tighter">
                      #{task.id.toString().padStart(3, '0')}
                    </span>
                    <h4 className="text-xl font-light text-gray-800 tracking-tight">
                      {task.title}
                    </h4>
                    {task.urgent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-8 text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-2 stroke-[1px]" />
                      {task.time}
                    </div>
                    <div className="flex items-center">
                      <Coins className="w-3 h-3 mr-2 stroke-[1px]" />
                      {task.coins} CP
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-4">
                  {task.claimed ? (
                    <div className="text-[10px] tracking-widest text-primary italic">
                      进行中
                    </div>
                  ) : (
                    <button className="text-[10px] tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase py-2">
                      认领此项
                    </button>
                  )}
                </div>
              </div>
            </MotionCard>
          ))}
        </AnimatePresence>
      </motion.div>
    </PageContainer>
  );
};

export default TasksPage;
