import { Heart, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">家务合伙人</span>
            </div>
            <p className="text-gray-400 max-w-md">
              让家务成为爱的游戏，而非争吵的导火索。用游戏化和情绪智能重建家庭和谐。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">产品</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-primary-500 transition-colors">
                  功能特色
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary-500 transition-colors">
                  如何使用
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary-500 transition-colors">
                  价格方案
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@example.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <a href="#" className="hover:text-primary-500 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 家务合伙人. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
