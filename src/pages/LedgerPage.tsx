import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, AlertTriangle, Calendar, Heart, MessageSquare } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface ChoreRecord {
  id: number;
  person: string;
  task: string;
  duration: number;
  date: string;
  category: string;
}

const LedgerPage = () => {
  const [selectedMonth] = useState('2026-02');
  const [showGratitudeModal, setShowGratitudeModal] = useState(false);

  const [choreRecords] = useState<ChoreRecord[]>([
    { id: 1, person: '我', task: '清洁厨房', duration: 30, date: '2026-02-09', category: '清洁' },
    { id: 2, person: '对方', task: '洗衣服', duration: 45, date: '2026-02-09', category: '洗衣' },
    { id: 3, person: '我', task: '做晚饭', duration: 60, date: '2026-02-08', category: '做饭' },
    { id: 4, person: '对方', task: '整理客厅', duration: 25, date: '2026-02-08', category: '清洁' },
    { id: 5, person: '我', task: '采购食材', duration: 40, date: '2026-02-07', category: '采购' },
    { id: 6, person: '对方', task: '洗碗', duration: 20, date: '2026-02-07', category: '清洁' },
  ]);

  // Calculate statistics
  const myTotal = choreRecords.filter(r => r.person === '我').reduce((sum, r) => sum + r.duration, 0);
  const partnerTotal = choreRecords.filter(r => r.person === '对方').reduce((sum, r) => sum + r.duration, 0);
  const total = myTotal + partnerTotal;

  const myPercentage = Math.round((myTotal / total) * 100);
  const partnerPercentage = Math.round((partnerTotal / total) * 100);

  // Time distribution data
  const timeDistribution = [
    { name: '我', value: myPercentage, color: '#f43f5e', hours: Math.round(myTotal / 60 * 10) / 10 },
    { name: '对方', value: partnerPercentage, color: '#8b5cf6', hours: Math.round(partnerTotal / 60 * 10) / 10 },
  ];

  // Category distribution
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

  // Emotion ratio
  const emotionRatio = {
    complaints: 3,
    thanks: 15,
    ratio: 3 / 15,
    threshold: 0.3,
  };

  const isBalanced = Math.abs(myPercentage - partnerPercentage) <= 10;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">公平账本</h1>
        <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center flex-1">
            <div className="text-3xl font-bold">{myPercentage}%</div>
            <div className="text-sm opacity-90">我的占比</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center flex-1">
            <div className="text-3xl font-bold">{partnerPercentage}%</div>
            <div className="text-sm opacity-90">对方占比</div>
          </div>
        </div>
        {isBalanced && (
          <div className="mt-3 text-center text-sm opacity-90">
            ✨ 本月分配很均衡！
          </div>
        )}
      </div>

      {/* Month Selector */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{selectedMonth}</span>
          </div>
          {!isBalanced && (
            <Badge variant="warning" size="sm">
              <AlertTriangle className="w-3 h-3 mr-1" />
              分配不均
            </Badge>
          )}
        </div>
      </div>

      {/* Time Distribution Pie Chart */}
      <div className="px-4 mb-4">
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
              <span className="text-sm text-gray-600">我: {timeDistribution[0].hours}小时</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-secondary-500 rounded"></div>
              <span className="text-sm text-gray-600">对方: {timeDistribution[1].hours}小时</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Chore Types Bar Chart */}
      <div className="px-4 mb-4">
        <Card variant="elevated" padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">家务类型分布（分钟）</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={choreTypes}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="我" fill="#f43f5e" />
                <Bar dataKey="对方" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Emotion Ratio */}
      <div className="px-4 mb-4">
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

          <div className="mb-4">
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
                animate={{ width: `${emotionRatio.ratio * 100}%` }}
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

          <p className="text-xs text-gray-500 mb-4">
            💚 当前情绪健康度良好！继续保持相互感恩的态度。
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={() => setShowGratitudeModal(true)}
            className="w-full"
          >
            <Heart className="w-4 h-4 mr-2" />
            表达感谢
          </Button>
        </Card>
      </div>

      {/* Recent Records */}
      <div className="px-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">最近记录</h3>
        <div className="space-y-2">
          {choreRecords.slice(0, 5).map((record) => (
            <Card key={record.id} variant="flat" padding="sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${record.person === '我' ? 'text-primary-600' : 'text-secondary-600'}`}>
                      {record.person}
                    </span>
                    <span className="text-sm text-gray-600">{record.task}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{record.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{record.duration}分钟</div>
                  <Badge variant="secondary" size="sm" className="mt-1">
                    {record.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Gratitude Modal */}
      {showGratitudeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setShowGratitudeModal(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">表达感谢</h3>
              <p className="text-sm text-gray-600">让对方知道你的感激之情</p>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full p-4 text-left bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">谢谢你今天做的晚饭</div>
                <div className="text-sm text-gray-600 mt-1">很好吃！❤️</div>
              </button>
              <button className="w-full p-4 text-left bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">感谢你把家里收拾得这么整洁</div>
                <div className="text-sm text-gray-600 mt-1">回家看到很舒服 🏠</div>
              </button>
              <button className="w-full p-4 text-left bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">辛苦了，这周你做了很多</div>
                <div className="text-sm text-gray-600 mt-1">我看到了你的付出 💪</div>
              </button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  placeholder="或者写下你想说的话..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowGratitudeModal(false)}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setShowGratitudeModal(false)}
                  className="flex-1"
                >
                  发送
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LedgerPage;
