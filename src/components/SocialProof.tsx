import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, TrendingDown, TrendingUp, Quote } from 'lucide-react';
import Card from './ui/Card';

const SocialProof = () => {
  const [counts, setCounts] = useState({
    users: 0,
    reduction: 0,
    satisfaction: 0,
  });

  const finalCounts = {
    users: 1000,
    reduction: 73,
    satisfaction: 85,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        users: Math.floor(finalCounts.users * progress),
        reduction: Math.floor(finalCounts.reduction * progress),
        satisfaction: Math.floor(finalCounts.satisfaction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(finalCounts);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: '张女士',
      role: '使用3个月',
      content: '以前每次分配家务都要吵架，现在我们会抢着认领任务赚家务币。没想到一个小程序能让我们的关系变得这么好。',
      avatar: '👩',
    },
    {
      name: '李先生',
      role: '使用6个月',
      content: '情绪温度计真的很有用！以前我做完家务她总说不满意，现在有了具体的评分维度，我知道该怎么改进了。',
      avatar: '👨',
    },
    {
      name: '王女士',
      role: '使用1年',
      content: '公平账本让我们看到了真实的付出。原来我老公做的比我想象的多，现在我会更主动地感谢他。',
      avatar: '👩‍🦰',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            真实用户，真实改变
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            数据说话，效果看得见
          </motion.p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {counts.users.toLocaleString()}+
              </div>
              <div className="text-gray-600">家庭正在使用</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {counts.reduction}%
              </div>
              <div className="text-gray-600">争吵减少</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary-500" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {counts.satisfaction}%
              </div>
              <div className="text-gray-600">满意度提升</div>
            </Card>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="lg" className="h-full">
                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
