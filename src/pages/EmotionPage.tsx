import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Star, Gift, Clock, TrendingUp, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

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
  const [showCooldown, setShowCooldown] = useState(false);
  const [currentRating, setCurrentRating] = useState({
    speed: 3,
    quality: 3,
    attitude: 3,
  });

  const [consecutiveDays, setConsecutiveDays] = useState(2);
  const [vouchers, setVouchers] = useState(1);

  const [ratingHistory, setRatingHistory] = useState<Rating[]>([
    {
      id: 1,
      taskTitle: '清洁厨房',
      date: '2026-02-09',
      speed: 5,
      quality: 5,
      attitude: 5,
      ratedBy: '对方',
    },
    {
      id: 2,
      taskTitle: '洗衣服',
      date: '2026-02-08',
      speed: 4,
      quality: 5,
      attitude: 4,
      ratedBy: '对方',
    },
    {
      id: 3,
      taskTitle: '整理客厅',
      date: '2026-02-07',
      speed: 5,
      quality: 4,
      attitude: 5,
      ratedBy: '我',
    },
  ]);

  const averageRating = (currentRating.speed + currentRating.quality + currentRating.attitude) / 3;

  const getThermometerColor = (rating: number) => {
    if (rating >= 4) return 'from-green-400 to-green-600';
    if (rating >= 3) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  const getThermometerBg = (rating: number) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const handleSubmitRating = () => {
    if (averageRating < 3) {
      setShowCooldown(true);
      setShowRatingModal(false);
   return;
    }

    const newRating: Rating = {
      id: Date.now(),
      taskTitle: '待评价任务',
      date: new Date().toISOString().split('T')[0],
      speed: currentRating.speed,
      quality: currentRating.quality,
      attitude: currentRating.attitude,
      ratedBy: '我',
    };

    setRatingHistory([newRating, ...ratingHistory]);
    setShowRatingModal(false);

    // Check for consecutive high ratings
    if (averageRating >= 4) {
      setConsecutiveDays(consecutiveDays + 1);
      if (consecutiveDays + 1 >= 3) {
        setVouchers(vouchers + 1);
        setConsecutiveDays(0);
      }
    }
  };

  const overallAverage = ratingHistory.length > 0
    ? ratingHistory.reduce((sum, r) => sum + (r.speed + r.quality + r.attitude) / 3, 0) / ratingHistory.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-purple-600 text-white p-6 sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">情绪温度计</h1>
        <div className="tems-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold">{overallAverage.toFixed(1)}</div>
                <div className="text-sm opacity-90">总体评分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vouchers Section */}
      <div className="p-4">
        <Card variant="elevated" padding="lg" className="bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Gift className="w-8 h-8 text-amber-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">我的免家务券</h3>
                <p className="text-sm text-gray-600">连续3天高分协作可获得</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-amber-600">{vouchers}</div>
          </div>

          {/* Progress to next voucher */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">连续高分协作进度</span>
              <Badge variant="success" size="sm">
                {consecutiveDays}/3 天
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(consecutiveDays / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {consecutiveDays > 0 && (
              <p className="text-xs text-gray-600 mt-2">
                再坚持 {3 - consecutiveDays} 天即可解锁新的免家务券！
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Rate Button */}
      <div className="px-4 mb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowRatingModal(true)}
          className="w-full"
        >
          <Star className="w-5 h-5 mr-2" />
          评价最近完成的任务
        </Button>
      </div>

      {/* Rating History */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">评价历史</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>共 {ratingHistory.length} 条</span>
          </div>
        </div>

        <div className="space-y-3">
          {ratingHistory.map((rating) => {
            const avg = (rating.speed + rating.quality + rating.attitude) / 3;
            return (
              <motion.div
                key={rating.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card variant="elevated" padding="md">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{rating.taskTitle}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-x500">{rating.date}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">评价者: {rating.ratedBy}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${getThermometerBg(avg)} flex items-center justify-center text-white font-bold`}>
                      {avg.toFixed(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">速度</div>
                      <div className="flex items-center justify-center space-x-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= rating.speed
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">质量</div>
                      <div className="flex items-center justify-center space-x-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= rating.quality
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">态度</div>
                      <div className="flex items-center justify-center space-x-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= rating.attitude
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setShowRatingModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">任务完成评价</h3>

              {/* Thermometer Visualization */}
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-t ${getThermometerColor(averageRating)} opacity-20`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Thermometer className="w-12 h-12 mx-auto mb-1 text-gray-400" />
                      <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                    </div>
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
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            star <= currentRating.sed
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                          onClick={() => setCurrentRating({ ...currentRating, speed: star })}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={currentRating.speed}
                    onChange={(e) => setCurrentRating({ ...currentRating, speed: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
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
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            star <= currentRating.quality
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                          onClick={() => setCurrentRating({ ...currentRating, quality: star })}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={currentRating.quality}
             onChange={(e) => setCurrentRating({ ...currentRating, quality: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Attitude */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">态度</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            star <= currentRating.attitude
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                          onClick={() => setCurrentRating({ ...currentRating, attitude: star })}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={currentRating.attitude}
                    onChange={(e) => setCurrentRating({ ...currentRating, attitude: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              {averageRating < 3 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    ⚠️ 评分较低时，系统将触发24小时冷静期
                  </p>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmitRating}
                  className="flex-1"
                >
                  提交评价
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cooldown Modal */}
      <AnimatePresence>
        {showCooldown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCooldown(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">冷静一下</h3>
                <p className="text-gray-600 mb-6">
                  评分低于3星时，系统建议24小时后再评价，给彼此一些冷静的时间
                </p>
                <div className="text-4xl font-bold text-blue-6002">23:45:12</div>
                <p className="text-sm text-gray-500 mb-6">距离可以重新评价还有</p>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setShowCooldown(false)}
                >
                  我知道了
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmotionPage;
