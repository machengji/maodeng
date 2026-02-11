const Footer = () => {
  return (
    <footer className="bg-white py-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8 max-w-sm">
            <div className="flex items-center space-x-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" stroke="#2563eb" strokeWidth="1"/>
                <circle cx="12" cy="12" r="4" stroke="#2563eb" strokeWidth="1"/>
              </svg>
              <span className="text-sm tracking-[0.4em] font-light uppercase text-gray-900">MaoDeng</span>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed tracking-wider">
              我们在生活的细微之处发现美，在琐碎的日常中构建秩序。猫灯不仅是一个工具，更是对“共同生活”这一古老课题的现代诠释。
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gray-900 font-medium">导航</h4>
              <ul className="space-y-4 text-[10px] tracking-widest text-gray-400 font-light uppercase">
                <li className="hover:text-primary transition-colors cursor-pointer">关于哲学</li>
                <li className="hover:text-primary transition-colors cursor-pointer">核心功能</li>
                <li className="hover:text-primary transition-colors cursor-pointer">隐私公约</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gray-900 font-medium">连接</h4>
              <ul className="space-y-4 text-[10px] tracking-widest text-gray-400 font-light uppercase">
                <li className="hover:text-primary transition-colors cursor-pointer">社交媒体</li>
                <li className="hover:text-primary transition-colors cursor-pointer">订阅更新</li>
                <li className="hover:text-primary transition-colors cursor-pointer">社区论坛</li>
              </ul>
            </div>
            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gray-900 font-medium">反馈</h4>
              <p className="text-[10px] tracking-widest text-gray-400 font-light uppercase">hello@maodeng.art</p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] tracking-[0.3em] text-gray-300 uppercase">
            &copy; 2026 MAODENG. ART OF CO-LIVING.
          </p>
          <div className="flex space-x-8">
            <span className="text-[8px] tracking-[0.3em] text-gray-300 uppercase cursor-pointer hover:text-gray-900 transition-colors">条款</span>
            <span className="text-[8px] tracking-[0.3em] text-gray-300 uppercase cursor-pointer hover:text-gray-900 transition-colors">隐私</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;