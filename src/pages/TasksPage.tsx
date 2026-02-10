import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Clock, Zap, Plus, Check, X } from 'lucide-react';
import Card, { MotionCard } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button, { MotionButton } from '../components/ui/Button';
import PageContainer from '../components/layout/PageContainer';
import Icon from '../components/ui/Icon';
import { staggerContainer, scaleIn } from '../utils/animations';

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
    <PageContainer 
      title="家务任务" 
      description="认领并完成任务，赚取家务币"
      action={
        <MotionButton
          size="sm"
          onClick={() => setShowAddTask(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4 mr-1" />
          发布
        </MotionButton>
      }
    >
      {/* Coins Summary */}
      <motion.div 
        variants={scaleIn}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-5 text-white shadow-soft-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Coins size={64} />
          </div>
          <div className="relative z-10">
            <p className="text-primary-100 text-sm font-medium">我的家务币</p>
            <h3 className="text-3xl font-bold mt-1">{myCoins}</h3>
          </div>
        </div>
        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl p-5 text-white shadow-soft-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Coins size={64} />
          </div>
          <div className="relative z-10">
            <p className="text-secondary-100 text-sm font-medium">对方的币</p>
            <h3 className="text-3xl font-bold mt-1">{partnerCoins}</h3>
          </div>
        </div>
      </motion.div>

      {/* My Tasks */}
      <AnimatePresence mode="popLayout">
        {myTasks.length > 0 && (
          <motion.div
            key="my-tasks"
            variants={staggerContainer}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-primary rounded-full mr-2" />
              正在进行 ({myTasks.length})
            </h2>
            {myTasks.map((task) => (
              <MotionCard
                key={task.id}
                layout
                variant="elevated"
                padding="md"
                className="relative overflow-visible"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {task.urgent && (
                  <Badge variant="danger" size="sm" pulse className="absolute -top-2 -right-2 shadow-sm">
                    <Zap className="w-3 h-3 mr-1" />
                    紧急
                  </Badge>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{task.title}</h4>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-primary font-bold text-xl">
                      <Coins className="w-5 h-5 mr-1" />
                      {task.coins}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4">
                  <Button
                    variant="ghost"
                    size="md"
                    className="flex-1"
                    onClick={() => handleCancelClaim(task.id)}
                  >
                    取消认领
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    <Check className="w-5 h-5 mr-1" />
                    完成
                  </Button>
                </div>
              </MotionCard>
            ))}
          </motion.div>
        )}

        {/* Available Tasks */}
        <motion.div
          key="available-tasks"
          variants={staggerContainer}
          className="space-y-4 pt-4"
        >
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <div className="w-1 h-6 bg-secondary rounded-full mr-2" />
            可认领 ({activeTasks.filter(t => !t.claimed).length})
          </h2>
          <div className="grid gap-4">
            {activeTasks.filter(t => !t.claimed).map((task) => (
              <MotionCard
                key={task.id}
                layout
                variant="glass"
                padding="md"
                className="border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-bold text-gray-900">{task.title}</h4>
                      {task.urgent && <Badge variant="danger" size="sm">紧急</Badge>}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {task.time}
                      </div>
                      <div className="flex items-center">
                        <span className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                        发布者: {task.createdBy}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-primary font-bold text-lg">
                      <Coins className="w-4 h-4 mr-1" />
                      {task.coins}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 rounded-full border-primary/20 hover:bg-primary/10"
                      onClick={() => handleClaimTask(task.id)}
                    >
                      认领
                    </Button>
                  </div>
                </div>
              </MotionCard>
            ))}
          </div>
        </motion.div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <motion.div
            key="completed-tasks"
            className="space-y-4 pt-4"
          >
            <h2 className="text-lg font-bold text-gray-400 flex items-center">
              <div className="w-1 h-6 bg-gray-300 rounded-full mr-2" />
              已完成 ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <Card key={task.id} variant="outlined" padding="sm" className="opacity-60 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 line-through">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">完成者: {task.claimedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400 font-medium">
                      <Coins className="w-4 h-4 mr-1" />
                      {task.coins}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowAddTask(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-[2.5rem] sm:rounded-3xl w-full max-w-md p-8 shadow-soft-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8 sm:hidden" />
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6">发布新任务</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">任务名称</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                    placeholder="例如：清洁厨房"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">预计时间</label>
                    <input
                      type="text"
                      value={newTask.time}
                      onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="30分钟"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">家务币奖励</label>
                    <input
                      type="number"
                      value={newTask.coins}
                      onChange={(e) => setNewTask({ ...newTask, coins: parseInt(e.target.value) || 0 })}
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary"
                    />
                  </div>
                </div>

                <label className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={newTask.urgent}
                    onChange={(e) => setNewTask({ ...newTask, urgent: e.target.checked })}
                    className="w-5 h-5 text-primary border-none rounded-lg focus:ring-0 focus:ring-offset-0 bg-white"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-gray-900">标记为紧急</span>
                    <span className="block text-xs text-muted-foreground italic">紧急任务将被优先显示</span>
                  </div>
                </label>

                <div className="flex space-x-3 pt-2">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 rounded-2xl"
                  >
                    取消
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddTask}
                    className="flex-1 rounded-2xl shadow-primary/20 shadow-lg"
                  >
                    确认发布
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default TasksPage;
