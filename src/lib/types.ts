export interface User {
  name: string;
  age: number;
  location: string;
  avatar: string;
}

export interface Goal {
  id: string;
  name: string;
  icon: string;
  target: number;
  current: number;
  monthlyContribution: number;
  targetDate: string;
  color: string;
}

export interface Holding {
  id: string;
  name: string;
  type: 'Mutual Fund' | 'Stock' | 'ETF' | 'Other';
  invested: number;
  current: number;
  units?: number;
}

export interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: 'sip' | 'investment' | 'goal' | 'dividend';
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface InvestmentOption {
  id: string;
  name: string;
  type: 'Mutual Fund' | 'Stock' | 'ETF';
  category: string;
  risk: 'Low' | 'Moderate' | 'High';
  returns1Y?: string;
  returns3Y?: string;
  minInvestment: number;
  description: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
}

export type OnboardingGoal = 'emergency' | 'travel' | 'car' | 'studies' | 'wealth' | 'exploring';
export type TimeHorizon = '<1' | '1-3' | '3-5' | '5+';
export type RiskComfort = 'sell' | 'wait' | 'stay';
export type RiskProfile = 'Conservative' | 'Balanced' | 'Growth';
export type ViewMode = 'mobile' | 'desktop';
export type AppScreen = 'onboarding' | 'home' | 'explore' | 'goals' | 'portfolio' | 'invest' | 'ai';
export type OnboardingStep = 0 | 1 | 2 | 3 | 4;

export interface MoneyFitness {
  streakMonths: number;
  monthlyConsistent: boolean;
  conceptsLearned: number;
  milestone: string;
}

export interface CircleTrend {
  id: string;
  topic: string;
  count: number;
  type: 'exploring' | 'started SIP' | 'holding';
  description: string;
}

export interface CircleActivity {
  id: string;
  user: string;
  action: string;
  context: string;
  time: string;
}
