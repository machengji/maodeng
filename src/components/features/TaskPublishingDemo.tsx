import { motion } from 'framer-motion';
import { Coins, Clock, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const TaskPublishingDemo = () => {
  const tasks = [
    {
      id: 1,
      title: '清洁厨房',
      time: '30分钟',
      coins: 50,
      urgent: false,
      claimed: false,
    },
    {
      id: 2,
      title: '洗衣服',
      time: '45分钟',
      coins: 60,
      urgent: false,
      claimed: true,
    },
    {
      id: 3,
      title: '整理客厅',
      time: '20分钟',
      coins: 100,
      urgent: true,
      claimed: false,
    },
  ];

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
            <Badge variant="primary" size="md" className="mb-4">
              功能一：去命令化
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              任务发布系统
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              不再是"你去做这个"的命令式分配，而是双方各自发布"本周想完成的家务心愿单"。
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">认领制而非分配制</h4>
                  <p className="text-gray-600">谁先认领谁获得"家务币"，变被动为主动</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">紧急任务悬赏</h4>
                  <p className="text-gray-600">用积累的币兑换对方帮忙，公平又灵活</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">游戏化激励</h4>
                  <p className="text-gray-600">完成任务获得奖励，让家务变得有趣</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Right: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">本周家务心愿单</h3>
                <p className="text-gray-600">点击认领任务，赚取家务币</p>
              </div>

              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    variant="elevated"
                    padding="md"
                    className={`relative ${task.claimed ? 'opacity-60' : 'hover:shadow-xl'}`}
                  >
                    {task.urgent && (
                      <Badge
                        variant="danger"
                        size="sm"
                        pulse
                        className="absolute -top-2 -right-2"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        紧急悬赏
                      </Badge>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{task.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-amber-500" />
                            <span className="font-semibold text-amber-600">{task.coins} 币</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        {task.claimed ? (
                          <Badge variant="success" size="md">
                         已认领
                          </Badge>
                        ) : (
                          <Button
                            variant={task.urgent ? 'primary' : 'outline'}
                            size="sm"
                            className="whitespace-nowrap"
                          >
                            认领任务
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Stats */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">150</div>
                    <div className="text-sm text-gray-600">我的家务币</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-600">8</div>
                    <div className="text-sm text-gray-600">本周已完成</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TaskPublishingDemo;
