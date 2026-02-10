import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const FairnessLedgerDemo = () => {
  // 家务时间分配数据
  const timeDistribution = [
    { name: '伴侣A', value: 45, color: '#f43f5e' },
    { name: '伴侣B', value: 55, color: '#8b5cf6' },
  ];

  // 家务类型分布数据
  const choreTypes = [
    { name: '做饭', partnerA: 30, partnerB: 20 },
    { name: '清洁', partnerA: 25, partnerB: 35 },
    { name: '洗衣', partnerA: 15, partnerB: 25 },
    { name: '采购', partnerA: 20, partnerB: 15 },
  ];

  // 情绪价值比
  const emotionRatio = {
    complaints: 3,
    thanks: 15,
    ratio: 0.2, // complaints / thanks
    threshold: 0.3,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="success" size="md" className="mb-4">
              功能三：可视化公平
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              公平账本
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              用数据说话，让家务分配一目了然。不再是"我觉得"，而是"数据显示"。
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">月度可视化报告</h4>
                  <p className="text-gray-600">饼图和柱状图展示家务时长和类型分布</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">情绪价值追踪</h4>
                  <p className="text-gray-600">记录抱怨和感谢次数，计算情绪健康度</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">智能提醒</h4>
                  <p className="text-gray-600">比例失衡时自动触发"感恩任务"</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-900">
                <strong>💡 设计理念：</strong>
                透明的数据让争论变得客观。当双方都能看到真实的付出时，理解和感恩会自然产生。
              </p>
            </div>
          </motion.div>

          {/* Right: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {/* Time Distribution Pie Chart */}
              <Card variant="elevated" padding="lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">本月家务时间分配</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {timeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary-500 rounded"></div>
                    <span className="text-sm text-gray-600">伴侣A: 18小时</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary-500 rounded"></div>
                    <span className="text-sm text-gray-600">伴侣B: 22小时</span>
                  </div>
                </div>
              </Card>

              {/* Chore Types Bar Chart */}
              <Card variant="elevated" padding="lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">家务类型分布</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={choreTypes}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="partnerA" fill="#f43f5e" name="伴侣A" />
                      <Bar dataKey="partnerB" fill="#8b5cf6" name="伴侣B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Emotion Ratio */}
              <Card variant="elevated" padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">情绪价值比</h3>
                  {emotionRatio.ratio < emotionRatio.threshold ? (
                    <Badge variant="success" size="sm">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      健康
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      需关注
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">{emotionRatio.complaints}</div>
                    <div className="text-sm text-gray-600 mt-1">抱怨次数</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{emotionRatio.thanks}</div>
                    <div className="text-sm text-gray-600 mt-1">感谢次数</div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">当前比例</span>
                    <span className="font-semibold text-gray-900">
                      {(emotionRatio.ratio * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 relative">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${emotionRatio.ratio * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                    <div
                      className="absolute top-0 h-3 w-1 bg-amber-500"
                      style={{ left: `${emotionRatio.threshold * 100}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-600 whitespace-nowrap">
                        阈值 {(emotionRatio.threshold * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  💚 当前情绪健康度良好！继续保持相互感恩的态度。
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FairnessLedgerDemo;
