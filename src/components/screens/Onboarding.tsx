'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { goalOptions, timeHorizonOptions, riskOptions, formatCurrency } from '@/lib/data';
import { Shield, Plane, Car, GraduationCap, TrendingUp, Compass, ChevronRight, ArrowLeft, ArrowRight, Activity, Clock, Target, Rocket } from 'lucide-react';
import type { OnboardingGoal, TimeHorizon, RiskComfort } from '@/lib/types';

const goalIcons: Record<string, typeof Shield> = {
  'shield': Shield,
  'plane': Plane,
  'car': Car,
  'graduation-cap': GraduationCap,
  'trending-up': TrendingUp,
  'compass': Compass,
};

export function Onboarding() {
  const { 
    onboardingStep, 
    setOnboardingStep, 
    selectedGoal, 
    setSelectedGoal,
    selectedHorizon,
    setSelectedHorizon,
    selectedRiskComfort,
    setSelectedRiskComfort,
    riskProfile,
    completeOnboarding,
  } = useAppStore();

  const [showRiskResult, setShowRiskResult] = useState(false);

  const handleBack = () => {
    if (onboardingStep > 0) {
      setOnboardingStep((onboardingStep - 1) as 0 | 1 | 2 | 3 | 4);
      if (onboardingStep === 3) setShowRiskResult(false);
    }
  };

  const handleRiskSelect = (comfort: RiskComfort) => {
    setSelectedRiskComfort(comfort);
    setTimeout(() => setShowRiskResult(true), 300);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F7F7F2' }}>
      {/* Header with Back Button */}
      {onboardingStep > 0 && (
        <div className="flex items-center px-6 pt-14 pb-2 animate-fade-in">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors active:bg-gray-200"
            style={{ background: 'transparent' }}
            aria-label="Go back"
          >
            <ArrowLeft size={20} style={{ color: '#111111' }} />
          </button>
        </div>
      )}

      {/* Step 0: Welcome */}
      {onboardingStep === 0 && (
        <div className="flex-1 flex flex-col justify-between px-6 pt-24 pb-12 animate-fade-in">
          <div className="flex-1 flex flex-col justify-center">
            {/* Minimal Brand Mark */}
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#111111' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#00D09C' }} />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] leading-[1.05] font-bold tracking-tight mb-5" style={{ color: '#111111' }}>
              Invest with clarity.
              <br />
              <span style={{ color: '#00D09C' }}>Grow with consistency.</span>
            </h1>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[280px]" style={{ color: '#555555' }}>
              Know what you&apos;re investing in, start small, and build a habit that lasts.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setOnboardingStep(1)}
              className="w-full py-4.5 rounded-2xl text-[15px] font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: '#111111', color: 'white' }}
            >
              Get started
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Goal */}
      {onboardingStep === 1 && (
        <div className="flex-1 flex flex-col px-6 pb-12 animate-slide-up">
          <h2 className="text-[28px] font-bold tracking-tight mb-2 mt-4" style={{ color: '#111111' }}>
            What are you saving for?
          </h2>
          <p className="text-[14px] mb-8" style={{ color: '#888888' }}>
            Choose a starting point.
          </p>

          <div className="flex-1 overflow-y-auto phone-scroll space-y-3 pb-8">
            {goalOptions.map((goal) => {
              const isSelected = selectedGoal === goal.id;
              const Icon = goalIcons[goal.icon] || Target;
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id as OnboardingGoal)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 border"
                  style={{ 
                    background: isSelected ? '#111111' : 'white',
                    borderColor: isSelected ? '#111111' : '#E5E5E0',
                    boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: isSelected ? '#333333' : '#F7F7F2' }}
                  >
                    <Icon size={22} style={{ color: isSelected ? '#00D09C' : '#555555' }} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold mb-0.5" style={{ color: isSelected ? 'white' : '#111111' }}>
                      {goal.label}
                    </p>
                    <p className="text-[12px]" style={{ color: isSelected ? '#AAAAAA' : '#888888' }}>
                      {goal.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setOnboardingStep(2)}
            disabled={!selectedGoal}
            className="w-full py-4 rounded-2xl text-[15px] font-bold transition-all duration-200 disabled:opacity-30 disabled:scale-100 active:scale-[0.98] mt-4"
            style={{ background: '#00D09C', color: 'white' }}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Time Horizon */}
      {onboardingStep === 2 && (
        <div className="flex-1 flex flex-col px-6 pb-12 animate-slide-up">
          <h2 className="text-[28px] font-bold tracking-tight mb-2 mt-4" style={{ color: '#111111' }}>
            When do you need it?
          </h2>
          <p className="text-[14px] mb-8" style={{ color: '#888888' }}>
            Time helps determine the right investment approach.
          </p>

          <div className="flex-1 space-y-3">
            {timeHorizonOptions.map((horizon) => {
              const isSelected = selectedHorizon === horizon.id;
              return (
                <button
                  key={horizon.id}
                  onClick={() => setSelectedHorizon(horizon.id as TimeHorizon)}
                  className="w-full flex items-center justify-between p-5 rounded-2xl text-left transition-all duration-200 border"
                  style={{ 
                    background: isSelected ? '#111111' : 'white',
                    borderColor: isSelected ? '#111111' : '#E5E5E0',
                  }}
                >
                  <div>
                    <p className="text-[15px] font-bold mb-0.5" style={{ color: isSelected ? 'white' : '#111111' }}>
                      {horizon.label}
                    </p>
                    <p className="text-[12px]" style={{ color: isSelected ? '#AAAAAA' : '#888888' }}>
                      {horizon.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#00D09C' }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: 'white' }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setOnboardingStep(3)}
            disabled={!selectedHorizon}
            className="w-full py-4 rounded-2xl text-[15px] font-bold transition-all duration-200 disabled:opacity-30 disabled:scale-100 active:scale-[0.98] mt-4"
            style={{ background: '#00D09C', color: 'white' }}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 3: Risk Assessment */}
      {onboardingStep === 3 && (
        <div className="flex-1 flex flex-col px-6 pb-12 animate-slide-up">
          {!showRiskResult ? (
            <div className="flex-1 flex flex-col animate-fade-in">
              <h2 className="text-[26px] leading-[1.2] font-bold tracking-tight mb-6 mt-4" style={{ color: '#111111' }}>
                Imagine your portfolio drops by 15% in one month. What do you do?
              </h2>
              
              <div className="flex-1 space-y-3">
                {riskOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleRiskSelect(option.id as RiskComfort)}
                    className="w-full p-5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] border"
                    style={{ background: 'white', borderColor: '#E5E5E0' }}
                  >
                    <p className="text-[15px] font-bold mb-1" style={{ color: '#111111' }}>{option.label}</p>
                    <p className="text-[12px]" style={{ color: '#888888' }}>{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center animate-slide-up">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-[#E6FAF5]">
                  <Activity size={32} style={{ color: '#00D09C' }} />
                </div>
                <p className="text-[13px] font-bold tracking-widest uppercase mb-3" style={{ color: '#888888' }}>Here's what we learned</p>
                <h3 className="text-[32px] font-bold mb-4" style={{ color: '#111111' }}>
                  {riskProfile}
                </h3>
                <p className="text-[15px] leading-relaxed px-4" style={{ color: '#555555' }}>
                  Based on your comfort with market ups and downs, a <strong style={{ color: '#111111' }}>{riskProfile?.toLowerCase()}</strong> approach suits you best for this goal.
                </p>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setOnboardingStep(4)}
                  className="w-full py-4.5 rounded-2xl text-[15px] font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ background: '#111111', color: 'white' }}
                >
                  See your plan
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Starting Plan */}
      {onboardingStep === 4 && (
        <div className="flex-1 flex flex-col pb-8 pt-4 animate-fade-in overflow-y-auto phone-scroll">
          <div className="px-6 mb-6">
            <h2 className="text-[28px] font-bold tracking-tight mb-2" style={{ color: '#111111' }}>
              Your starting plan
            </h2>
            <p className="text-[14px]" style={{ color: '#888888' }}>
              A simple path to get you started.
            </p>
          </div>

          <div className="px-6 space-y-6">
            {/* The Plan Overview */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl border" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                <Target size={18} style={{ color: '#5B8DEF', mb: 8 }} className="mb-2" />
                <p className="text-[11px] font-semibold mb-0.5" style={{ color: '#888888' }}>Goal</p>
                <p className="text-[13px] font-bold" style={{ color: '#111111' }}>
                  {goalOptions.find(g => g.id === selectedGoal)?.label}
                </p>
              </div>
              <div className="p-4 rounded-2xl border" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                <Clock size={18} style={{ color: '#F5A623', mb: 8 }} className="mb-2" />
                <p className="text-[11px] font-semibold mb-0.5" style={{ color: '#888888' }}>Time</p>
                <p className="text-[13px] font-bold" style={{ color: '#111111' }}>
                  {timeHorizonOptions.find(t => t.id === selectedHorizon)?.label}
                </p>
              </div>
              <div className="p-4 rounded-2xl border" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                <Activity size={18} style={{ color: '#00D09C', mb: 8 }} className="mb-2" />
                <p className="text-[11px] font-semibold mb-0.5" style={{ color: '#888888' }}>Risk</p>
                <p className="text-[13px] font-bold" style={{ color: '#111111' }}>
                  {riskProfile}
                </p>
              </div>
            </div>

            {/* The Habit */}
            <div className="p-6 rounded-2xl border flex items-center justify-between" style={{ background: '#111111', borderColor: '#111111' }}>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-[#888888] mb-1 uppercase">Your starting habit</p>
                <p className="text-[28px] font-bold text-white mb-2">₹1,000 <span className="text-[16px] text-[#888888] font-normal">/ month</span></p>
                <p className="text-[12px] text-[#AAAAAA]">An example starting point. Adjust anytime.</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#222222]">
                <Rocket size={20} style={{ color: '#00D09C' }} />
              </div>
            </div>

            {/* Explore Section */}
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#888888] mb-3 uppercase">Explore options</p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border flex items-center justify-between" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                  <div>
                    <p className="text-[15px] font-bold mb-1" style={{ color: '#111111' }}>Diversified Mutual Funds</p>
                    <p className="text-[12px]" style={{ color: '#555555' }}>Professionally managed for {riskProfile?.toLowerCase()} risk.</p>
                  </div>
                  <ChevronRight size={18} style={{ color: '#CCCCCC' }} />
                </div>
                
                <div className="p-4 rounded-2xl border flex items-center justify-between" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                  <div>
                    <p className="text-[15px] font-bold mb-1" style={{ color: '#111111' }}>Index Investing</p>
                    <p className="text-[12px]" style={{ color: '#555555' }}>Low cost, tracks the top market companies.</p>
                  </div>
                  <ChevronRight size={18} style={{ color: '#CCCCCC' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 px-6">
            <button
              onClick={completeOnboarding}
              className="w-full py-4.5 rounded-2xl text-[15px] font-bold transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#00D09C', color: 'white' }}
            >
              Start investing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
