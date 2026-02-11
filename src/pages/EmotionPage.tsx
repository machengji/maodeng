import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Gift, Clock, Calendar } from 'lucide-react';
import Card, { MotionCard } from '../components/ui/Card';
import Button, { MotionButton } from '../components/ui/Button';
import PageContainer from '../components/layout/PageContainer';
import { staggerContainer, fadeIn, scaleIn } from '../utils/animations';

interface Rating {
  id: number;
  taskTitle: string;
  date: string;
  speed: number;
  quality: number;
  attitude: number;
  ratedBy: string;
}

const EmotionPage = () => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [consecutiveDays] = useState(2);
  const [vouchers] = useState(1);

  const [ratingHistory] = useState<Rating[]>([
    {
      id: 1,
      taskTitle: '清晨的厨房整理',
      date: '2026-02-09',
      speed: 5,
      quality: 5,
      attitude: 5,
      ratedBy: '对方',
    },
    {
      id: 2,
      taskTitle: '洗涤昨日的记忆',
      date: '2026-02-08',
      speed: 4,
      quality: 5,
      attitude: 4,
      ratedBy: '对方',
    },
    {
      id: 3,
      taskTitle: '重塑客厅的秩序',
      date: '2026-02-07',
      speed: 5,
      quality: 4,
      attitude: 5,
      ratedBy: '我',
    },
  ]);

  const overallAverage = ratingHistory.length > 0
    ? ratingHistory.reduce((sum, r) => sum + (r.speed + r.quality + r.attitude) / 3, 0) / ratingHistory.length
    : 0;

  return (
    <PageContainer 
      title="情绪晴雨" 
      description="记录协作中的温情，倾听彼此的心声"
      action={
        <MotionButton
          variant="outline"
          size="sm"
          className="rounded-full px-6"
          onClick={() => setShowRatingModal(true)}
        >
          <Star className="w-3 h-3 mr-2" />
          给予评价
        </MotionButton>
      }
    >
      {/* Abstract Score Header */}
      <motion.div 
        variants={scaleIn}
        className="flex flex-col items-center py-16 border-b border-gray-50 mb-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full border border-current animate-pulse" />
        </div>
        <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-4">平均协作温度</p>
        <h3 className="text-7xl font-extralight text-gray-900 tracking-tighter">
          {overallAverage.toFixed(1)}
        </h3>
      </motion.div>

      {/* Rewards Section */}
      <motion.div variants={fadeIn} className="mb-16">
        <Card variant="flat" padding="lg" className="border-none bg-gray-50/50 relative group">
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-2">
              <h4 className="text-sm tracking-widest uppercase text-gray-900 font-light flex items-center">
                <Gift className="w-4 h-4 mr-2 stroke-[1px]" />
                免家务特权
              </h4>
              <p className="text-xs text-gray-400 font-light">连续 3 天高分协作即可解锁</p>
            </div>
            <div className="text-4xl font-extralight text-primary">
              {vouchers}
            </div>
          </div>
          
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-[8px] tracking-[0.2em] text-gray-400 uppercase">
              <span>成长进度</span>
              <span>{consecutiveDays} / 3 天</span>
            </div>
            <div className="h-px bg-gray-100 w-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: `${(consecutiveDays / 3) * 100 - 100}%` }}
                transition={{ duration: 1, ease: "circOut" }}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* History List */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-12"
      >
        <h4 className="text-[10px] tracking-[0.3em] text-gray-300 uppercase font-light border-b border-gray-50 pb-4">
          近期回响
        </h4>
        <AnimatePresence>
          {ratingHistory.map((rating) => {
            const avg = (rating.speed + rating.quality + rating.attitude) / 3;
            return (
              <MotionCard
                key={rating.id}
                layout
                variant="default"
                padding="none"
                className="border-none shadow-none bg-transparent"
              >
                <div className="flex items-center justify-between p-4 -mx-4 hover:bg-gray-50/50 transition-colors duration-500">
                  <div className="space-y-3">
                    <h5 className="text-lg font-light text-gray-800">{rating.taskTitle}</h5>
                    <div className="flex items-center space-x-6 text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-2 stroke-[1px]" />
                        {rating.date}
                      </div>
                      <div className="flex items-center italic">
                        By {rating.ratedBy}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-extralight text-gray-900 border-l border-gray-100 pl-8 ml-4">
                    {avg.toFixed(1)}
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </PageContainer>
  );
};

export default EmotionPage;