'use client';

import { useAppStore } from '@/lib/store';
import { Onboarding } from './screens/Onboarding';
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { BottomNav } from './ui/BottomNav';
import { InvestFlow } from './screens/InvestFlow';
import { AIChat } from './screens/AIChat';
import { NotificationsPanel } from './ui/NotificationsPanel';
import { GoalCreation } from './screens/GoalCreation';

interface MobileAppProps {
  isInFrame?: boolean;
}

export function MobileApp({ isInFrame }: MobileAppProps) {
  const { 
    currentScreen, 
    onboardingComplete, 
    investFlowOpen, 
    aiOpen, 
    notificationsOpen,
    goalCreationOpen,
  } = useAppStore();

  if (!onboardingComplete) {
    return (
      <div className="h-full flex flex-col" style={{ background: '#F7F7F2' }}>
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative" style={{ background: '#F7F7F2', minHeight: isInFrame ? '100%' : '100dvh' }}>
      {/* Main content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 phone-scroll">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'explore' && <ExploreScreen />}
        {currentScreen === 'goals' && <GoalsScreen />}
        {currentScreen === 'portfolio' && <PortfolioScreen />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Overlays */}
      {investFlowOpen && <InvestFlow />}
      {aiOpen && <AIChat />}
      {notificationsOpen && <NotificationsPanel />}
      {goalCreationOpen && <GoalCreation />}
    </div>
  );
}
