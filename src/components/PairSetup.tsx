import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Key, ArrowRight } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { createPair, joinPair } from '../services/pairService';

interface PairSetupProps {
  onComplete: () => void;
}

const PairSetup = ({ onComplete }: PairSetupProps) => {
  const [mode, setMode] = useState<'select' | 'create' | 'join'>('select');
  const [userName, setUserName] = useState('');
  const [pairCode, setPairCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!userName.trim()) {
      setError('请输入你的昵称');
      return;
    }

    setLoading(true);
    setError('');

    const result = await createPair(userName);
    if (result) {
      setGeneratedCode(result.pairCode);
    } else {
      setError('创建失败，请重试');
    }

    setLoading(false);
  };

  const handleJoin = async () => {
    if (!userName.trim()) {
      setError('请输入你的昵称');
      return;
    }

    if (!pairCode.trim()) {
      setError('请输入配对码');
      return;
    }

    setLoading(true);
    setError('');

    const userId = await joinPair(pairCode.toUpperCase(), userName);
    if (userId) {
      onComplete();
    } else {
      setError('配对码不存在或已失效');
    }

    setLoading(false);
  };

  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎使用猫蹬</h1>
            <p className="text-gray-600">让家务成为爱的游戏</p>
          </div>

          <div className="space-y-4">
            <Card variant="elevated" padding="lg" className="cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setMode('create')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">创建配对</h3>
                  <p className="text-sm text-gray-600">生成配对码，邀请伴侣加入</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>

            <Card variant="elevated" padding="lg" className="cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setMode('join')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Key className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">加入配对</h3>
                  <p className="text-sm text-gray-600">输入伴侣的配对码</p>
             </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === 'create') {
    if (generatedCode) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">配对码已生成</h2>
                <p className="text-gray-600 mb-6">请将配对码分享给你的伴侣</p>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="text-4xl font-bold text-primary-600 tracking-wider">{generatedCode}</div>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>
                  开始使用
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card variant="elevated" padding="lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">创建配对</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium y-700 mb-2">你的昵称</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="例如：小明"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 text-center">{error}</div>
              )}

              <div className="flex space-x-3">
                <Button variant="outline" size="md" onClick={() => setMode('select')} className="flex-1">
               返回
                </Button>
                <Button variant="primary" size="md" onClick={handleCreate} disabled={loading} className="flex-1">
                  {loading ? '创建中...' : '生成配对码'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Join mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card variant="elevated" padding="lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">加入配对</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">你的昵称</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="例如：小红"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">配对码</label>
              <input
                type="text"
                value={pairCode}
                onChange={(e) => setPairCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl tracking-wider font-bold"
                placeholder="输入6位配对码"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}

            <div className="flex space-x-3">
              <Button variant="outline" size="md" onClick={() => setMode('select')} className="flex-1">
                返回
              </Button>
              <Button variant="primary" size="md" onClick={handleJoin} disabled={loading} className="flex-1">
                {loading ? '加入中...' : '加入配对'}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PairSetup;
