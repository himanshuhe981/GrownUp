'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/data';
import type { Goal } from '@/lib/types';

type CreationStep = 'name' | 'amount' | 'date' | 'contribution' | 'preview';

const goalPresets = [
  { name: 'Emergency Fund', color: '#00D09C' },
  { name: 'Travel Fund', color: '#5B8DEF' },
  { name: 'First Car', color: '#F5A623' },
  { name: 'Higher Studies', color: '#9B59B6' },
  { name: 'House Down Payment', color: '#E74C3C' },
  { name: 'Wedding Fund', color: '#E91E8A' },
];

export function GoalCreation() {
  const { setGoalCreationOpen, addGoal } = useAppStore();
  const [step, setStep] = useState<CreationStep>('name');
  const [goalName, setGoalName] = useState('');
  const [goalColor, setGoalColor] = useState('#00D09C');
  const [targetAmount, setTargetAmount] = useState(100000);
  const [targetDate, setTargetDate] = useState('2028-12');
  const [monthlyContribution, setMonthlyContribution] = useState(3000);

  const handleCreate = () => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      name: goalName,
      icon: 'trending-up',
      target: targetAmount,
      current: 0,
      monthlyContribution,
      targetDate,
      color: goalColor,
    };
    addGoal(newGoal);
    setGoalCreationOpen(false);
  };

  const handleBack = () => {
    switch (step) {
      case 'amount': setStep('name'); break;
      case 'date': setStep('amount'); break;
      case 'contribution': setStep('date'); break;
      case 'preview': setStep('contribution'); break;
    }
  };

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col animate-fade-in"
      style={{ background: '#F7F7F2' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        {step !== 'name' ? (
          <button 
            onClick={handleBack}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'white', border: '1px solid #E5E5E0' }}
            aria-label="Go back"
          >
            <ArrowLeft size={18} style={{ color: '#111111' }} />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <h2 className="text-base font-semibold" style={{ color: '#111111' }}>Create a goal</h2>
        <button 
          onClick={() => setGoalCreationOpen(false)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'white', border: '1px solid #E5E5E0' }}
          aria-label="Close"
        >
          <X size={18} style={{ color: '#111111' }} />
        </button>
      </div>

      <div className="flex-1 px-5 pb-8 flex flex-col">
        {/* Step 1: Name */}
        {step === 'name' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              What&apos;s this goal for?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#888888' }}>
              Pick a preset or name your own.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {goalPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => { setGoalName(preset.name); setGoalColor(preset.color); }}
                  className="p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.97] border-2"
                  style={{
                    background: goalName === preset.name ? `${preset.color}10` : 'white',
                    borderColor: goalName === preset.name ? preset.color : '#E5E5E0',
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ background: preset.color }}
                  />
                  <span className="text-sm font-semibold" style={{ color: '#111111' }}>
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor="custom-goal" className="text-xs font-medium mb-1.5 block" style={{ color: '#888888' }}>
                Or type your own
              </label>
              <input
                id="custom-goal"
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g., New Laptop"
                className="w-full py-3 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ 
                  background: 'white', 
                  border: '1.5px solid #E5E5E0',
                  color: '#111111',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#00D09C'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E0'; }}
              />
            </div>

            {goalName && (
              <button
                onClick={() => setStep('amount')}
                className="mt-auto w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98] animate-slide-up"
                style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Step 2: Amount */}
        {step === 'amount' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              How much do you need?
            </h3>
            <p className="text-sm mb-8" style={{ color: '#888888' }}>
              Set a target amount for &ldquo;{goalName}&rdquo;
            </p>

            <div className="text-center mb-8">
              <p className="text-[48px] font-bold number-display" style={{ color: '#111111' }}>
                {formatCurrency(targetAmount)}
              </p>
            </div>

            <div className="flex gap-2 justify-center mb-6 flex-wrap">
              {[50000, 100000, 200000, 500000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTargetAmount(amt)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: targetAmount === amt ? '#111111' : 'white',
                    color: targetAmount === amt ? 'white' : '#111111',
                    border: `1.5px solid ${targetAmount === amt ? '#111111' : '#E5E5E0'}`,
                  }}
                >
                  {formatCurrency(amt)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('date')}
              className="mt-auto w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Date */}
        {step === 'date' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              When do you need it?
            </h3>
            <p className="text-sm mb-8" style={{ color: '#888888' }}>
              A rough timeline helps us plan better.
            </p>

            <div className="space-y-3">
              {[
                { id: '2027-06', label: 'By mid 2027', desc: '~8 months from now' },
                { id: '2028-01', label: 'By early 2028', desc: '~1.5 years from now' },
                { id: '2028-12', label: 'By end of 2028', desc: '~2 years from now' },
                { id: '2030-12', label: 'By 2030', desc: '~4 years from now' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTargetDate(option.id)}
                  className="w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: targetDate === option.id ? '#E6FAF5' : 'white',
                    borderColor: targetDate === option.id ? '#00D09C' : '#E5E5E0',
                  }}
                >
                  <div className="text-left">
                    <span className="text-sm font-semibold block" style={{ color: '#111111' }}>
                      {option.label}
                    </span>
                    <span className="text-xs" style={{ color: '#888888' }}>
                      {option.desc}
                    </span>
                  </div>
                  {targetDate === option.id && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#00D09C' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('contribution')}
              className="mt-auto w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4: Monthly contribution */}
        {step === 'contribution' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              How much can you put in monthly?
            </h3>
            <p className="text-sm mb-8" style={{ color: '#888888' }}>
              Even a small amount helps build the habit.
            </p>

            <div className="text-center mb-8">
              <p className="text-[48px] font-bold number-display" style={{ color: '#111111' }}>
                {formatCurrency(monthlyContribution)}
              </p>
              <p className="text-sm" style={{ color: '#888888' }}>/month</p>
            </div>

            <div className="flex gap-2 justify-center mb-6 flex-wrap">
              {[1000, 2000, 3000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setMonthlyContribution(amt)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: monthlyContribution === amt ? '#111111' : 'white',
                    color: monthlyContribution === amt ? 'white' : '#111111',
                    border: `1.5px solid ${monthlyContribution === amt ? '#111111' : '#E5E5E0'}`,
                  }}
                >
                  {formatCurrency(amt)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('preview')}
              className="mt-auto w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
            >
              See preview
            </button>
          </div>
        )}

        {/* Step 5: Preview */}
        {step === 'preview' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 mt-4" style={{ color: '#111111' }}>
              Your goal plan
            </h3>

            <div className="p-5 rounded-2xl mb-4" style={{ background: 'white', border: '1px solid #E5E5E0' }}>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${goalColor}15` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: goalColor }} />
                </div>
                <h4 className="text-lg font-bold" style={{ color: '#111111' }}>{goalName}</h4>
              </div>

              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #F0F0EB' }}>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#888888' }}>Target</span>
                  <span className="text-sm font-semibold number-display" style={{ color: '#111111' }}>
                    {formatCurrency(targetAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#888888' }}>Timeline</span>
                  <span className="text-sm font-semibold" style={{ color: '#111111' }}>{targetDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#888888' }}>Monthly</span>
                  <span className="text-sm font-semibold number-display" style={{ color: '#00D09C' }}>
                    {formatCurrency(monthlyContribution)}/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Simple projection */}
            <div className="p-4 rounded-xl mb-4" style={{ background: '#E6FAF5', border: '1px solid rgba(0,208,156,0.2)' }}>
              <p className="text-xs font-medium mb-1" style={{ color: '#00D09C' }}>Estimated projection</p>
              <p className="text-sm" style={{ color: '#555555' }}>
                At {formatCurrency(monthlyContribution)}/month, you could reach your goal in approximately{' '}
                <span className="font-bold" style={{ color: '#111111' }}>
                  {Math.ceil(targetAmount / monthlyContribution)} months
                </span>.
              </p>
              <p className="text-[10px] mt-2" style={{ color: '#888888' }}>
                This is a simplified estimate. Actual results depend on investment returns and market conditions.
              </p>
            </div>

            <button
              onClick={handleCreate}
              className="mt-auto w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
            >
              Create goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
