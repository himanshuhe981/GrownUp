'use client';

import { create } from 'zustand';
import { OnboardingGoal, TimeHorizon, RiskComfort, RiskProfile, AppScreen, OnboardingStep, ViewMode, Goal, Holding, Transaction, AIMessage, MoneyFitness, CircleTrend, CircleActivity } from './types';
import { mockGoals, mockHoldings, mockTransactions, mockNotifications, aiResponses, mockMoneyFitness, mockCircleTrends, mockCircleActivity } from './data';
import type { Notification } from './types';

interface AppState {
  // View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Navigation
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  previousScreen: AppScreen | null;

  // Onboarding
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
  setOnboardingStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;

  // Onboarding selections
  selectedGoal: OnboardingGoal | null;
  setSelectedGoal: (goal: OnboardingGoal) => void;
  selectedHorizon: TimeHorizon | null;
  setSelectedHorizon: (horizon: TimeHorizon) => void;
  selectedRiskComfort: RiskComfort | null;
  setSelectedRiskComfort: (comfort: RiskComfort) => void;
  riskProfile: RiskProfile | null;

  // Portfolio
  portfolioValue: number;
  portfolioGain: number;
  holdings: Holding[];

  // Goals
  goals: Goal[];
  addGoal: (goal: Goal) => void;

  // Transactions
  transactions: Transaction[];

  // Fitness & Social
  moneyFitness: MoneyFitness;
  circleTrends: CircleTrend[];
  circleActivity: CircleActivity[];

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;

  // AI
  aiMessages: AIMessage[];
  aiOpen: boolean;
  setAiOpen: (open: boolean) => void;
  sendAiMessage: (message: string) => void;

  // Invest flow
  investFlowOpen: boolean;
  setInvestFlowOpen: (open: boolean) => void;
  completeSIP: (amount: number) => void;

  // Notifications panel
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;

  // Chart period
  chartPeriod: string;
  setChartPeriod: (period: string) => void;

  // Goal creation
  goalCreationOpen: boolean;
  setGoalCreationOpen: (open: boolean) => void;

  // Additional Panels
  moneyFitnessOpen: boolean;
  setMoneyFitnessOpen: (open: boolean) => void;
  signalCheckOpen: boolean;
  setSignalCheckOpen: (open: boolean) => void;
  circleOpen: boolean;
  setCircleOpen: (open: boolean) => void;
  explanationOpen: boolean;
  explanationData: any;
  openExplanation: (data: any) => void;
  closeExplanation: () => void;

  learningOpen: boolean;
  learningData: any;
  openLearning: (data: any) => void;
  closeLearning: () => void;
  markLearned: () => void;

  investmentDetailOpen: boolean;
  investmentData: any;

  moneyWrappedOpen: boolean;
  setMoneyWrappedOpen: (open: boolean) => void;
}

function getRiskProfile(comfort: RiskComfort): RiskProfile {
  switch (comfort) {
    case 'sell': return 'Conservative';
    case 'wait': return 'Balanced';
    case 'stay': return 'Growth';
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  // View
  viewMode: 'mobile',
  setViewMode: (mode) => set({ viewMode: mode }),

  // Navigation
  currentScreen: 'onboarding',
  previousScreen: null,
  setScreen: (screen) => set((state) => ({ 
    currentScreen: screen, 
    previousScreen: state.currentScreen 
  })),

  // Onboarding
  onboardingComplete: false,
  onboardingStep: 0,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  completeOnboarding: () => set({ onboardingComplete: true, currentScreen: 'home' }),

  // Onboarding selections
  selectedGoal: null,
  setSelectedGoal: (goal) => set({ selectedGoal: goal }),
  selectedHorizon: null,
  setSelectedHorizon: (horizon) => set({ selectedHorizon: horizon }),
  selectedRiskComfort: null,
  setSelectedRiskComfort: (comfort) => set({ 
    selectedRiskComfort: comfort, 
    riskProfile: getRiskProfile(comfort) 
  }),
  riskProfile: null,

  // Portfolio
  portfolioValue: 28450,
  portfolioGain: 1850,
  holdings: [...mockHoldings],

  // Goals
  goals: [...mockGoals],
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),

  // Transactions
  transactions: [...mockTransactions],

  // Fitness & Social
  moneyFitness: mockMoneyFitness,
  circleTrends: mockCircleTrends,
  circleActivity: mockCircleActivity,

  // Notifications
  notifications: [...mockNotifications],
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  // AI
  aiMessages: [],
  aiOpen: false,
  setAiOpen: (open) => set({ aiOpen: open }),
  sendAiMessage: (message) => {
    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
    };

    const response = aiResponses[message] || aiResponses['default'];
    const assistantMsg: AIMessage = {
      ...response,
      id: `ai-${Date.now()}`,
    };

    set((state) => ({
      aiMessages: [...state.aiMessages, userMsg, assistantMsg],
    }));
  },

  // Invest flow
  investFlowOpen: false,
  setInvestFlowOpen: (open) => set({ investFlowOpen: open }),
  completeSIP: (amount) => {
    const newTransaction: Transaction = {
      id: `t-${Date.now()}`,
      title: 'SIP Started',
      description: `₹${amount.toLocaleString('en-IN')}/month SIP`,
      amount,
      date: new Date().toISOString().split('T')[0],
      type: 'sip',
    };

    set((state) => ({
      portfolioValue: state.portfolioValue + amount,
      portfolioGain: state.portfolioGain + Math.round(amount * 0.05),
      transactions: [newTransaction, ...state.transactions],
      goals: state.goals.map((g, i) => 
        i === 0 ? { ...g, current: g.current + amount } : g
      ),
      investFlowOpen: false,
    }));
  },

  // Notifications panel
  notificationsOpen: false,
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),

  // Chart period
  chartPeriod: '1Y',
  setChartPeriod: (period) => set({ chartPeriod: period }),

  // Goal creation
  goalCreationOpen: false,
  setGoalCreationOpen: (open) => set({ goalCreationOpen: open }),

  // Additional Panels
  moneyFitnessOpen: false,
  setMoneyFitnessOpen: (open) => set({ moneyFitnessOpen: open }),
  signalCheckOpen: false,
  setSignalCheckOpen: (open) => set({ signalCheckOpen: open }),
  circleOpen: false,
  setCircleOpen: (open) => set({ circleOpen: open }),
  explanationOpen: false,
  explanationData: null,
  openExplanation: (data) => set({ explanationOpen: true, explanationData: data }),
  closeExplanation: () => set({ explanationOpen: false, explanationData: null }),

  learningOpen: false,
  learningData: null,
  openLearning: (data) => set({ learningOpen: true, learningData: data }),
  closeLearning: () => set({ learningOpen: false, learningData: null }),
  markLearned: () => set((state) => ({
    moneyFitness: {
      ...state.moneyFitness,
      conceptsLearned: state.moneyFitness.conceptsLearned + 1
    }
  })),

  investmentDetailOpen: false,
  investmentData: null,

  moneyWrappedOpen: false,
  setMoneyWrappedOpen: (open) => set({ moneyWrappedOpen: open }),
}));
