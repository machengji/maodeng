import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Heart, HandHeart, Brain, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface Need {
  id: string;
  label: string;
  icon: typeof Trophy;
  color: string;
  bgColor: string;
}

interface Solution {
  title: string;
  description: string;
  steps: string[];
  duration: string;
}

const ReconciliationPage = () => {
  const needs: Need[] = [
    { id: 'praised', label: '被夸奖', icon: Trophy, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    { id: 'accompanied', label: '被陪伴', icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { id: 'shared', label: '被分担', icon: HandHeart, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 'understood', label: '被理解', icon: Brain, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  ];

  const [mySelections, setMySelections] = useState<string[]>([]);
  const [partnerSelections] = useState<string[]>(['shared', 'understood']);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionGenerated, setSolutionGenerated] = useState(false);

  const commonNeeds = mySelections.filter(need => partnerSelections.includes(need));

  const toggleMySelection = (needId: string) => {
    setMySelections(prev =>
      prev.includes(needId) ? prev.filter(id => id !== needId) : [...prev, needId]
    );
    setShowSolution(false);
    setSolutionGenerated(false);
  };

  const generateSolution = () => {
    setShowSolution(true);
    setSolutionGenerated(true);
  };

  const getSolution = (): Solution => {
    if (commonNeeds.includes('shared')) {
      return {
        title: '今日协作任务',
        description: '你们都希望被分担。让我们一起完成一项任务，分担彼此的负担。',
        steps: [
          '选择一项需要完成的家务任务',
          '明确分工：一人负责主要工作，一人负责辅助',
          '在过程中保持沟通和鼓励',
          '完成后互相感谢对方的付出',
        ],
        duration: '30-60分钟',
      };
    }
    if (commonNeeds.includes('understood')) {
      return {
        title: '倾听时光',
        description: '你们都希望被理解。找个安静的时间，真诚地倾听彼此。',
        steps: [
          '找一个安静舒适的环境，关闭手机通知',
          '轮流分享最近的感受和想法（每人10分钟）',
          '倾听时不打断、不评判、不急于给建议',
          '用自己的话复述对方的感受，确认理解',
        ],
        duration: '20-30分钟',
      };
    }
    if (commonNeeds.includes('accompanied')) {
      return {
        title: '陪伴时刻',
        description: '你们都希望被陪伴。放下手机，享受彼此的陪伴。',
        steps: [
          '选择一个你们都喜欢的活动（散步、看电影、做饭等）',
          '全程放下手机，专注于彼此',
          '分享活动中的感受和想法',
          '用肢体语言表达关爱（牵手、拥抱等）',
        ],
        duration: '1-2小时',
      };
    }
    if (commonNeeds.includes('praised')) {
      return {
        title: '互相欣赏',
        description: '你们都希望被夸奖。让我们互相表达欣赏和认可。',
        steps: [
          '各自写下对方最近做得好的3件事',
          '面对面真诚地表达欣赏',
          '具体说明为什么这些事情让你感动',
          '给对方一个温暖的拥抱',
        ],
        duration: '15-20分钟',
      };
    }
    return {
      title: '温馨提示',
      description: '虽然需求不同，但可以轮流满足对方的需求。',
      steps: [
        '今天先满足一方的需求',
        '明天满足另一方的需求',
        '在过程中保持耐心和理解',
        '记录下彼此的需求模式，下次更好地应对',
      ],
      duration: '灵活安排',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">和解加速器</h1>
        <p className="text-sm opacity-90">找到共同需求，快速和解</p>
      </div>

      {/* Instructions */}
      <div className="p-4">
        <Card variant="elevated" padding="md" className="bg-white/80 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">此刻你真正需要什么？</h3>
              <p className="text-sm text-gray-600">
                选择你当前的真实需求，系统会帮你找到与对方的共同点，并生成针对性的解决方案。
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* My Selections */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">我的需求</h2>
        <div className="grid grid-cols-2 gap-3">
          {needs.map((need) => {
            const isSelected = mySelections.includes(need.id);
            const isCommon = commonNeeds.includes(need.id);
            const Icon = need.icon;
            return (
              <motion.button
                key={need.id}
                onClick={() => toggleMySelection(need.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? isCommon
                      ? 'border-green-500 bg-green-50'
                      : 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 ${need.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${need.color}`} />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{need.label}</span>
                  {isSelected && (
                    <CheckCircle2 className={`w-5 h-5 ${isCommon ? 'text-green-500' : 'text-purple-500'}`} />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Partner's Selections */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">对方的需求</h2>
        <div className="grid grid-cols-2 gap-3">
          {needs.map((need) => {
            const isSelected = partnerSelections.includes(need.id);
            const isCommon = commonNeeds.includes(need.id);
            const Icon = need.icon;
            return (
              <div
                key={need.id}
                className={`p-4 rounded-xl border-2 ${
                  isSelected
                    ? isCommon
                      ? 'border-green-500 bg-green-50'
                      : 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 ${need.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${need.color}`} />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{need.label}</span>
                  {isSelected && (
                    <CheckCircle2 className={`w-5 h-5 ${isCommon ? 'text-green-500' : 'text-pink-500'}`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Common Needs */}
      {commonNeeds.length > 0 && (
        <div className="px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card variant="elevated" padding="md" className="bg-green-50 border-2 border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">找到 {commonNeeds.length} 个共同需求！</span>
              </div>
              <p className="text-sm text-green-700">
                你们都选择了：
                {commonNeeds.map((needId, index) => {
                  const need = needs.find(n => n.id === needId);
                  return (
                    <span key={needId}>
                      {index > 0 && '、'}
                      <strong>{need?.label}</strong>
                    </span>
                  );
                })}
              </p>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Generate Solution Button */}
      <div className="px-4 mb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={generateSolution}
          disabled={mySelections.length === 0}
          className="w-full"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          生成解决方案
        </Button>
      </div>

      {/* Solution */}
      <AnimatePresence>
        {showSolution && (
          <motion.div
            className="px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{getSolution().title}</h3>
                  <Badge variant="secondary" size="sm" className="mt-1">
                    预计时长: {getSolution().duration}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{getSolution().description}</p>

              <div className="space-y-3 mb-6">
                {getSolution().steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>

              <Button variant="primary" size="md" className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                开始执行
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      {solutionGenerated && (
        <div className="px-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">最近的和解记录</h2>
          <div className="space-y-3">
            <Card variant="flat" padding="md" className="opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">倾听时光</h4>
                  <p className="text-sm text-gray-600 mt-1">2026-02-08 • 已完成</p>
                </div>
                <Badge variant="success" size="sm">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  成功
                </Badge>
              </div>
            </Card>
            <Card variant="flat" padding="md" className="opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">今日协作任务</h4>
                  <p className="text-sm text-gray-600 mt-1">2026-02-05 • 已完成</p>
                </div>
                <Badge variant="success" size="sm">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  成功
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReconciliationPage;
