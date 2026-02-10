import { motion } from 'framer-motion';
import { Trophy, Heart, HandHeart, Brain, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ReconciliationDemo = () => {
  const needs = [
    { id: 'praised', label: '被夸奖', icon: Trophy, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    { id: 'accompanied', label: '被陪伴', icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { id: 'shared', label: '被分担', icon: HandHeart, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 'understood', label: '被理解', icon: Brain, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  ];

  const [partnerASelections, setPartnerASelections] = useState<string[]>(['understood', 'shared']);
  const [partnerBSelections, setPartnerBSelections] = useState<string[]>(['shared', 'accompanied']);
  const [showSolution, setShowSolution] = useState(false);

  const commonNeeds = partnerASelections.filter(need => partnerBSelections.includes(need));

  const toggleSelection = (partner: 'A' | 'B', needId: string) => {
    if (partner === 'A') {
      setPartnerASelections(prev =>
        prev.includes(needId) ? prev.filter(id => id !== needId) : [...prev, needId]
      );
    } else {
      setPartnerBSelections(prev =>
        prev.includes(needId) ? prev.filter(id => id !== needId) : [...prev, needId]
      );
    }
    setShowSolution(false);
  };

  const generateSolution = () => {
    setShowSolution(true);
  };

  const getSolutionText = () => {
    if (commonNeeds.includes('shared')) {
      return {
        title: '今日协作任务',
        description: '你们都希望被分担。建议：一起完成今天的晚餐准备，一人负责做饭，一人负责收拾。',
        action: '开始协作任务',
      };
    }
    if (commonNeeds.includes('understood')) {
      return {
        title: '倾听时光',
        description: '你们都希望被理解。建议：找个安静的时间，各自分享最近的感受，不打断、不评判。',
        action: '预约倾听时光',
      };
    }
    return {
      title: '温馨提示',
      description: '虽然需求不同，但可以轮流满足对方的需求。今天先满足一方，明天满足另一方。',
      action: '查看详细建议',
    };
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="elevated" padding="lg" className="bg-white/80 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">此刻你们真正需要什么？</h3>
                <p className="text-gray-600">选择你们各自的真实需求</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Partner A */}
                <div>
                  <div className="text-center mb-4">
                    <Badge variant="primary" size="md">伴侣 A</Badge>
                  </div>
                  <div className="space-y-3">
                    {needs.map((need) => {
                      const isSelected = partnerASelections.includes(need.id);
                      const isCommon = commonNeeds.includes(need.id);
                      return (
                        <motion.button
                          key={need.id}
                          onClick={() => toggleSelection('A', need.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? isCommon
                                ? 'border-green-500 bg-green-50'
                                : 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${need.bgColor} rounded-lg flex items-center justify-center`}>
                              <need.icon className={`w-5 h-5 ${need.color}`} />
                            </div>
                            <span className="font-medium text-gray-900">{need.label}</span>
                            {isSelected && (
                              <CheckCircle2 className={`w-5 h-5 ml-auto ${isCommon ? 'text-green-500' : 'text-primary-500'}`} />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Partner B */}
                <div>
                  <div className="text-center mb-4">
                    <Badge variant="secondary" size="md">伴侣 B</Badge>
                  </div>
                  <div className="space-y-3">
                    {needs.map((need) => {
                      const isSelected = partnerBSelections.includes(need.id);
                      const isCommon = commonNeeds.includes(need.id);
                      return (
                        <motion.button
                          key={need.id}
                          onClick={() => toggleSelection('B', need.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? isCommon
                                ? 'border-green-500 bg-green-50'
                                : 'border-secondary-500 bg-secondary-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${need.bgColor} rounded-lg flex items-center justify-center`}>
                              <need.icon className={`w-5 h-5 ${need.color}`} />
                            </div>
                            <span className="font-medium text-gray-900">{need.label}</span>
                            {isSelected && (
                              <CheckCircle2 className={`w-5 h-5 ml-auto ${isCommon ? 'text-green-500' : 'text-secondary-500'}`} />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Common Needs Indicator */}
              {commonNeeds.length > 0 && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
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
                </motion.div>
              )}

              {/* Generate Solution Button */}
              <Button
                variant="primary"
                className="w-full"
                onClick={generateSolution}
                disabled={partnerASelections.length === 0 || partnerBSelections.length === 0}
              >
                生成解决方案
              </Button>

              {/* Solution Card */}
              {showSolution && (
                <motion.div
                  className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{getSolutionText().title}</h4>
                  <p className="text-gray-700 mb-4">{getSolutionText().description}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    {getSolutionText().action}
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" size="md" className="mb-4">
              功能四：和解加速器
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              情绪需求匹配
            </h2>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              争吵后，双方各自选择"此刻真实需求"，系统智能匹配共同选项并生成针对性解决方案。
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div>
                <h4 className="font-semibold text-gray-900">四种核心需求</h4>
                  <p className="text-gray-600">被夸奖、被陪伴、被分担、被理解 - 覆盖最常见的情感需求</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">智能匹配</h4>
                  <p className="text-gray-600">自动识别共同需求，优先解决双方都关心的问题</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">可执行方案</h4>
                  <p className="text-gray-600">不只是建议，而是具体的行动步骤</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 设计理念：</strong>
                争吵往往源于需求未被满足。当双方都能清晰表达真实需求时，和解就变得简单了。这个工具帮助你们跳过指责，直达问题核心。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReconciliationDemo;
