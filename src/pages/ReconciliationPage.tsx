import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button, { MotionButton } from '../components/ui/Button';
import PageContainer from '../components/layout/PageContainer';
import { staggerContainer, fadeIn, slideUp } from '../utils/animations';

interface Need {
  id: string;
  label: string;
}

const ReconciliationPage = () => {
  const needs: Need[] = [
    { id: 'praised', label: '渴望赞赏' },
    { id: 'accompanied', label: '需要陪伴' },
    { id: 'shared', label: '期待分担' },
    { id: 'understood', label: '寻求理解' },
  ];

  const [mySelections, setMySelections] = useState<string[]>([]);
  const [partnerSelections] = useState<string[]>(['shared', 'understood']);
  const [showSolution, setShowSolution] = useState(false);

  const commonNeeds = mySelections.filter(need => partnerSelections.includes(need));

  const toggleMySelection = (needId: string) => {
    setMySelections(prev =>
      prev.includes(needId) ? prev.filter(id => id !== needId) : [...prev, needId]
    );
    setShowSolution(false);
  };

  return (
    <PageContainer 
      title="温情和解" 
      description="跨越沉默的墙，在真诚中重拾温存"
    >
      {/* Abstract Intro */}
      <motion.div variants={fadeIn} className="py-12 border-b border-gray-50 mb-12 text-center">
        <div className="inline-flex items-center space-x-4 mb-6">
          <div className="w-12 h-px bg-gray-100" />
          <Heart size={20} className="text-primary stroke-[1px]" />
          <div className="w-12 h-px bg-gray-100" />
        </div>
        <p className="text-sm font-light text-gray-400 tracking-[0.2em]">此刻，倾听内心的声音</p>
      </motion.div>

      {/* Needs Selection */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-12"
      >
        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[0.4em] text-gray-300 uppercase font-light border-b border-gray-50 pb-4 text-center">
            我的真实需求
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {needs.map((need) => {
              const isSelected = mySelections.includes(need.id);
              return (
                <button
                  key={need.id}
                  onClick={() => toggleMySelection(need.id)}
                  className={`py-8 px-4 border transition-all duration-500 text-sm tracking-widest font-light ${
                    isSelected 
                      ? 'border-gray-900 bg-gray-900 text-white' 
                      : 'border-gray-50 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {need.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center py-8">
          <MotionButton
            variant="primary"
            size="lg"
            disabled={mySelections.length === 0}
            onClick={() => setShowSolution(true)}
            className="rounded-none w-full max-w-xs"
          >
            开启和解之径
          </MotionButton>
        </div>

        {/* Results / Solution */}
        <AnimatePresence>
          {showSolution && (
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-12 pt-12"
            >
              <div className="text-center space-y-4">
                <Sparkles size={24} className="mx-auto text-primary stroke-[1px] mb-4" />
                <h3 className="text-2xl font-light text-gray-900">和解方案已就绪</h3>
                <p className="text-sm text-gray-400 font-light">
                  {commonNeeds.length > 0 
                    ? `你们在「${needs.find(n => n.id === commonNeeds[0])?.label}」上达成了共鸣。`
                    : '虽然需求各异，但相互包容是最好的解药。'}
                </p>
              </div>

              <Card variant="flat" padding="lg" className="border-none bg-gray-50/50">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h5 className="text-xs tracking-[0.3em] uppercase text-gray-900 font-medium">执行指南</h5>
                    <div className="h-px bg-gray-200 w-8" />
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      '放下手中一切电子设备，面对面落座',
                      '用 10 分钟时间，只听不辩，感受对方的重量',
                      '交换一个持续 20 秒的拥抱，感受心跳同步'
                    ].map((step, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <span className="text-[10px] font-mono text-gray-300 pt-1">0{i+1}</span>
                        <p className="text-sm font-light text-gray-600 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="primary" className="w-full mt-8 rounded-none">
                    我们已达成共识
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PageContainer>
  );
};

export default ReconciliationPage;