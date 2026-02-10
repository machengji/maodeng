import { motion } from 'framer-motion';
import { UserPlus, ListTodo, Gamepad2 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: '创建家庭账户',
      description: '邀请伴侣加入，建立你们的专属家务协作空间',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      number: 2,
      icon: ListTodo,
      title: '发布愿望清单',
      description: '各自添加本周想完成的家务任务，设置奖励和优先级',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      number: 3,
      icon: Gamepad2,
      title: '开始游戏化协作',
      description: '认领任务、赚取家务币、解锁奖励，让家务变得有趣',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
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
            三步开启和谐家务生活
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            简单易用，立即上手
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-green-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100">
                  {/* Step Number */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center relative`}>
                      <step.icon className={`w-10 h-10 ${step.color}`} />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
