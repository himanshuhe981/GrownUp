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
import { MoneyFitnessSheet } from './screens/MoneyFitnessSheet';
import { CircleSheet } from './screens/CircleSheet';
import { SignalCheckSheet } from './screens/SignalCheckSheet';
import { ContextualExplanationSheet } from './screens/ContextualExplanationSheet';
import { LearningSheet } from './screens/LearningSheet';
import { InvestmentDetailSheet } from './screens/InvestmentDetailSheet';
import { MoneyWrappedSheet } from './screens/MoneyWrappedSheet';

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
    moneyFitnessOpen,
    circleOpen,
    signalCheckOpen,
    explanationOpen,
    learningOpen,
    investmentDetailOpen,
    moneyWrappedOpen,
  } = useAppStore();

  if (!onboardingComplete) {
    return (
      <div className={`flex flex-col overflow-hidden bg-[#F7F7F2] ${isInFrame ? 'h-full' : 'fixed inset-0'}`}>
        <Onboarding />
      </div>
    );
  }

  return (
    <div className={`flex flex-col overflow-hidden bg-[#F7F7F2] ${isInFrame ? 'h-full' : 'fixed inset-0'}`}>
      {/* Main content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden phone-scroll">
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
      {moneyFitnessOpen && <MoneyFitnessSheet />}
      {circleOpen && <CircleSheet />}
      {signalCheckOpen && <SignalCheckSheet />}
      {explanationOpen && <ContextualExplanationSheet />}
      {learningOpen && <LearningSheet />}
      {investmentDetailOpen && <InvestmentDetailSheet />}
      {moneyWrappedOpen && <MoneyWrappedSheet />}
    </div>
  );
}
