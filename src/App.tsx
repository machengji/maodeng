import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import ProblemStatement from './components/ProblemStatement';
import TaskPublishingDemo from './components/features/TaskPublishingDemo';
import EmotionThermometerDemo from './components/features/EmotionThermometerDemo';
import FairnessLedgerDemo from './components/features/FairnessLedgerDemo';
import ReconciliationDemo from './components/features/ReconciliationDemo';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import TasksPage from './pages/TasksPage';
import EmotionPage from './pages/EmotionPage';
import LedgerPage from './pages/LedgerPage';
import ReconciliationPage from './pages/ReconciliationPage';
import BottomNav from './components/layout/BottomNav';
import PairSetup from './components/PairSetup';
import './services/storage'; // 初始化 LeanCloud

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProblemStatement />
        <section id="features">
          <TaskPublishingDemo />
          <EmotionThermometerDemo />
          <FairnessLedgerDemo />
          <ReconciliationDemo />
        </section>
        <HowItWorks />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isPaired, setIsPaired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查是否已配对
    const pairCode = localStorage.getItem('pairCode');
    const userId = localStorage.getItem('userId');

    if (pairCode && userId) {
      setIsPaired(true);
    }

    setIsLoading(false);
  }, []);

  const handlePairComplete = () => {
    setIsPaired(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isPaired) {
    return <PairSetup onComplete={handlePairComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Navigate to="/app/tasks" replace />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/emotion" element={<EmotionPage />} />
              <Route path="/ledger" element={<LedgerPage />} />
              <Route path="/reconciliation" element={<ReconciliationPage />} />
            </Routes>
            <BottomNav />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
