import { motion } from 'framer-motion';
import { AlertCircle, ThumbsDown, Scale } from 'lucide-react';
import Card from './ui/Card';

const ProblemStatement = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: '为什么总是我做？',
      description: '家务分配不均，总觉得自己付出更多，对方却视而不见',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: ThumbsDown,
      title: '你做得不够好！',
      description: '对家务质量不满意，但直接指责又会引发争吵',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Scale,
      title: '我们需要更公平的分配',
      description: '缺乏客观的衡量标准，难以达成真正公平的家务分工',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            这些场景是否似曾相识？
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            家务问题正在悄悄侵蚀你们的感情
          </motion.p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="lg" className="h-full hover:scale-105 transition-transform">
                <div className={`w-16 h-16 ${problem.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <problem.icon className={`w-8 h-8 ${problem.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
