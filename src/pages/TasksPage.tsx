import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Clock, Zap, Plus, Check, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface Task {
  id: number;
  title: string;
  time: string;
  coins: number;
  urgent: boolean;
  claimed: boolean;
  claimedBy?: string;
  completed: boolean;
  createdBy: string;
}

const TasksPage = () => {
  const [currentUser] = useState('我');
  const [myCoins, setMyCoins] = useState(150);
  const [partnerCoins, setPartnerCoins] = useState(120);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', time: '', coins: 50, urgent: false });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '清洁厨房',
      time: '30分钟',
      coins: 50,
      urgent: false,
      claimed: false,
      completed: false,
      createdBy: '对方',
    },
    {
      id: 2,
      title: '洗衣服',
      time: '45分钟',
      coins: 60,
      urgent: false,
      claimed: true,
      claimedBy: '我',
      completed: false,
      createdBy: '对方',
    },
    {
      id: 3,
      title: '整理客厅',
      time: '20分钟',
      coins: 100,
      urgent: true,
      claimed: false,
      completed: false,
      createdBy: '我',
    },
  ]);

  const handleClaimTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, claimed: true, claimedBy: currentUser } : task
    ));
  };

  const handleCompleteTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.claimedBy === currentUser) {
      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, completed: true } : t
      ));
      setMyCoins(myCoins + task.coins);
    }
  };

  const handleCancelClaim = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, claimed: false, claimedBy: undefined } : task
    ));
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.time) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        time: newTask.time,
        coins: newTask.coins,
        urgent: newTask.urgent,
        claimed: false,
        completed: false,
        createdBy: currentUser,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', time: '', coins: 50, urgent: false });
      setShowAddTask(false);
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const myTasks = tasks.filter(t => t.claimedBy === currentUser && !t.completed);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">家务任务</h1>
        <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center flex-1">
            <div className="text-3xl font-bold">{myCoins}</div>
            <div className="text-sm opacity-90">我的家务币</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center flex-1">
            <div className="text-3xl font-bold">{partnerCoins}</div>
            <div className="text-sm opacity-90">对方的币</div>
          </div>
        </div>
      </div>

      {/* My Tasks */}
      {myTasks.length > 0 && (
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">我的任务 ({myTasks.length})</h2>
          <div className="space-y-3">
            {myTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <Card variant="elevated" padding="md" className="relative">
                  {task.urgent && (
                    <Badge variant="danger" size="sm" pulse className="absolute -top-2 -right-2">
                      <Zap className="w-3 h-3 mr-1" />
                      紧急
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                    <div className="flex items-center space-x-1 text-amber-600 font-semibold">
                      <Coins className="w-4 h-4" />
                      <span>{task.coins}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{task.time}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelClaim(task.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        取消
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        完成
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Available Tasks */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            可认领任务 ({activeTasks.filter(t => !t.claimed).length})
          </h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddTask(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            发布任务
          </Button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {activeTasks.filter(t => !t.claimed).map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card variant="elevated" padding="md" className="relative">
                  {task.urgent && (
                    <Badge variant="danger" size="sm" pulse className="absolute -top-2 -right-2">
                      <Zap className="w-3 h-3 mr-1" />
                      紧急悬赏
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h4>
                      <div className="text-xs text-gray-500">发布者: {task.createdBy}</div>
                    </div>
                    <div className="flex items-center space-x-1 text-amber-600 font-semibold text-lg">
                      <Coins className="w-5 h-5" />
                      <span>{task.coins}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{task.time}</span>
                    </div>
                    <Button
                      variant={task.urgent ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleClaimTask(task.id)}
                    >
                      认领任务
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">已完成 ({completedTasks.length})</h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} variant="flat" padding="md" className="opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-700 line-through">{task.title}</h4>
                    <div className="text-xs text-gray-500 mt-1">完成者: {task.claimedBy}</div>
                  </div>
                  <Badge variant="success" size="sm">
                    <Check className="w-3 h-3 mr-1" />
                    已完成
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">发布新任务</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">任务名称</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="例如：清洁厨房"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预计时间</label>
                  <input
                    type="text"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="例如：30分钟"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">奖励家务币</label>
                  <input
                    type="number"
                    value={newTask.coins}
                    onChange={(e) => setNewTask({ ...newTask, coins: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="10"
                    step="10"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={newTask.urgent}
                    onChange={(e) => setNewTask({ ...newTask, urgent: e.target.checked })}
                    className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                    标记为紧急任务（额外奖励）
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setShowAddTask(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAddTask}
                    className="flex-1"
                  >
                    发布
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
