import { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Heart, Calendar } from 'lucide-react';
import Card, { MotionCard } from '../components/ui/Card';
import Button, { MotionButton } from '../components/ui/Button';
import PageContainer from '../components/layout/PageContainer';
import { staggerContainer, fadeIn, scaleIn } from '../utils/animations';

interface ChoreRecord {
  id: number;
  person: string;
  task: string;
  duration: number;
  date: string;
  category: string;
}

const LedgerPage = () => {
  const [selectedMonth] = useState('2026年2月');

  const [choreRecords] = useState<ChoreRecord[]>([
    { id: 1, person: '我', task: '清洁厨房', duration: 30, date: '2026-02-09', category: '清洁' },
    { id: 2, person: '对方', task: '洗衣服', duration: 45, date: '2026-02-09', category: '洗衣' },
    { id: 3, person: '我', task: '做晚饭', duration: 60, date: '2026-02-08', category: '做饭' },
    { id: 4, person: '对方', task: '整理客厅', duration: 25, date: '2026-02-08', category: '清洁' },
  ]);

  const myTotal = choreRecords.filter(r => r.person === '我').reduce((sum, r) => sum + r.duration, 0);
  const partnerTotal = choreRecords.filter(r => r.person === '对方').reduce((sum, r) => sum + r.duration, 0);
  const total = myTotal + partnerTotal;

  const myPercentage = Math.round((myTotal / total) * 100);
  const partnerPercentage = Math.round((partnerTotal / total) * 100);

  const categories = ['做饭', '清洁', '洗衣', '采购'];
  const choreTypes = categories.map(cat => {
    const myTime = choreRecords.filter(r => r.person === '我' && r.category === cat).reduce((sum, r) => sum + r.duration, 0);
    const partnerTime = choreRecords.filter(r => r.person === '对方' && r.category === cat).reduce((sum, r) => sum + r.duration, 0);
    return {
      name: cat,
      我: myTime,
      对方: partnerTime,
    };
  });

  return (
    <PageContainer 
      title="公平账本" 
      description="记录每一份投入，平衡家庭的温度"
      action={
        <div className="flex items-center space-x-2 text-[10px] tracking-widest text-gray-400 uppercase">
          <Calendar size={12} strokeWidth={1} />
          <span>{selectedMonth}</span>
        </div>
      }
    >
      {/* Abstract Balance Visualization */}
      <motion.div 
        variants={scaleIn}
        className="py-12 border-b border-gray-50 mb-12"
      >
        <div className="flex items-end justify-between mb-8 px-4">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">我的贡献</p>
            <h3 className="text-5xl font-extralight text-gray-900">{myPercentage}%</h3>
          </div>
          <div className="flex flex-col items-center pb-2">
            <div className="w-px h-16 bg-gray-100" />
            <Heart size={12} className="text-primary mt-2 fill-primary/10" />
          </div>
          <div className="text-right space-y-2">
            <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">对方贡献</p>
            <h3 className="text-5xl font-extralight text-gray-900">{partnerPercentage}%</h3>
          </div>
        </div>
        
        {/* Simple Balance Bar */}
        <div className="h-1 bg-gray-50 w-full overflow-hidden flex">
          <motion.div 
            className="h-full bg-gray-900" 
            initial={{ width: 0 }}
            animate={{ width: `${myPercentage}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
          />
          <motion.div 
            className="h-full bg-primary opacity-30" 
            initial={{ width: 0 }}
            animate={{ width: `${partnerPercentage}%` }}
            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Distribution Chart */}
      <motion.div variants={fadeIn} className="mb-16">
        <h4 className="text-[10px] tracking-[0.4em] text-gray-300 uppercase mb-8 text-center font-light">
          投入领域分布
        </h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={choreTypes}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9ca3af', letterSpacing: 2 }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '0px', border: '1px solid #f3f4f6', boxShadow: 'none', fontSize: '10px' }}
              />
              <Bar dataKey="我" fill="#111827" radius={[2, 2, 0, 0]} barSize={12} />
              <Bar dataKey="对方" fill="#2563eb" opacity={0.2} radius={[2, 2, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-12"
      >
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <h4 className="text-[10px] tracking-[0.3em] text-gray-300 uppercase font-light">
            最近投入
          </h4>
          <MotionButton variant="ghost" size="sm" className="text-[10px]">
            查看全部回溯
          </MotionButton>
        </div>
        
        <div className="space-y-4">
          {choreRecords.map((record) => (
            <MotionCard
              key={record.id}
              layout
              variant="default"
              padding="none"
              className="border-none shadow-none bg-transparent"
            >
              <div className="flex items-center justify-between p-4 -mx-4 group hover:bg-gray-50/50 transition-colors duration-500">
                <div className="flex items-center space-x-6">
                  <span className={`text-[8px] tracking-widest uppercase py-1 px-2 border ${record.person === '我' ? 'border-gray-900 text-gray-900' : 'border-primary/20 text-primary'}`}>
                    {record.person}
                  </span>
                  <span className="text-lg font-light text-gray-800 tracking-tight">
                    {record.task}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] tracking-widest text-gray-400 uppercase">
                    {record.duration} MIN
                  </div>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default LedgerPage;