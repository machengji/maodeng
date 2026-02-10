import { motion } from 'framer-motion';
import { Thermometer, Star, Gift, Clock } from 'lucide-react';
import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const EmotionThermometerDemo = () => {
  const [ratings, setRatings] = useState({
    speed: 4,
    quality: 5,
    attitude: 5,
  });

  const [showCooldown, setShowCooldown] = useState(false);
  const [consecutiveDays, setConsecutiveDays] = useState(2);

  const averageRating = (ratings.speed + ratings.quality + ratings.attitude) / 3;

  const getThermometerColor = (rating: number) => {
    if (rating >= 4) return 'from-green-400 to-green-600';
    if (rating >= 3) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="elevated" padding="lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">任务完成评价</h3>
                <p className="text-gray-600">对刚完成的"清洁厨房"任务进行评价</p>
              </div>

              {/* Thermometer Visualization */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <Thermometer className="w-24 h-24 text-gray-300" />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-t ${getThermometerColor(averageRating)} opacity-70 rounded-full`}
                    initial={{ scale: 0 }}
                    animate={{ scale: averageRating / 5 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Rating Sliders */}
              <div className="space-y-6">
                {/* Speed */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">速度</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= ratings.speed
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.speed}
                    onChange={(e) => setRatings({ ...ratings, speed: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Quality */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">质量</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= ratings.quality
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.quality}
                    onChange={(e) => setRatings({ ...ratings, quality: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Att */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">态度</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= ratings.attitude
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.attitude}
                    onChange={(e) => setRatings({ ...ratings, attitude: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button variant="primary" className="w-full mt-6">
                提交评价
              </Button>

              {/* Consecutive Days Progress */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">连续高分协作</span>
                  <Badge variant="success" size="sm">
                    {consecutiveDays}/3 天
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(consecutiveDays / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  再坚持 1 天即可解锁"免家务券"！
                </p>
              </div>

              {/* Voucher Preview */}
              <motion.div
                className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-dashed border-amber-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <Gift className="w-8 h-8 text-amber-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">免家务券</h4>
                    <p className="text-xs text-gray-600">可兑换一次对方全包服务</p>
                  </div>
                  <Badge variant="warning" size="sm" className="ml-auto">
                    即将解锁
                  </Badge>
                </div>
              </motion.div>
            </Card>

            {/* Cooldown Modal Demo */}
            {showCooldown && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowCooldown(false)}
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 max-w-md"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">冷静一下</h3>
                    <p className="text-gray-600 mb-6">
                      评分低于3星时，系统建议24小时后再评价，给彼此一些冷静的时间
                    </p>
                    <div className="text-4xl font-bold text-blue-600 mb-2">23:45:12</div>
                    <p className="text-sm text-gray-500 mb-6">距离可以重新评价还有</p>
                    <Button variant="secondary" className="w-full" onClick={() => setShowCooldown(false)}>
                      我知道了
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" size="md" className="mb-4">
              功能二：冲突降级
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              情绪温度计
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              用三维评价系统（速度/质量/态度）替代简单的"好"或"不好"，让反馈更客观、更具体。
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">冷静对话机制</h4>
                  <p className="text-gray-600">评分低于3星时触发24小时冷静期，避免情绪化争吵</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">正向激励</h4>
                  <p className="text-gray-600">连续3天高分协作解锁"免家务券"，鼓励良好互动</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">情绪可视化</h4>
                  <p className="text-gray-600">温度计直观展示协作质量，让改进方向更清晰</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 设计理念：</strong>
                在情绪激动时，系统会温柔地介入，给双方一个缓冲期。这不是逃避问题，而是选择更好的时机去解决问题。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmotionThermometerDemo;
