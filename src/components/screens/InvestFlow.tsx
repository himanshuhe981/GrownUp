'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { formatCurrency } from '@/lib/data';
import { X, ArrowLeft, Check, TrendingUp, Layers, BarChart2, CircleDollarSign, Repeat } from 'lucide-react';

type InvestStep = 'type' | 'method' | 'amount' | 'confirm' | 'success';

export function InvestFlow() {
  const { setInvestFlowOpen, completeSIP, riskProfile, selectedGoal, selectedHorizon } = useAppStore();
  const [step, setStep] = useState<InvestStep>('type');
  const [investType, setInvestType] = useState<string>('');
  const [investMethod, setInvestMethod] = useState<string>('');
  const [amount, setAmount] = useState<number>(1000);

  const handleComplete = () => {
    completeSIP(amount);
    setStep('success');
  };

  const handleClose = () => {
    setInvestFlowOpen(false);
  };

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col animate-fade-in bg-[#F7F7F2]"
    >
      {/* Header */}
      {step !== 'success' && (
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          {step !== 'type' ? (
            <button 
              onClick={() => {
                if (step === 'method') setStep('type');
                if (step === 'amount') setStep('method');
                if (step === 'confirm') setStep('amount');
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'white', border: '1px solid #E5E5E0' }}
              aria-label="Go back"
            >
              <ArrowLeft size={18} style={{ color: '#111111' }} />
            </button>
          ) : (
            <div />
          )}
          <h2 className="text-base font-semibold" style={{ color: '#111111' }}>Invest</h2>
          <button 
            onClick={handleClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'white', border: '1px solid #E5E5E0' }}
            aria-label="Close"
          >
            <X size={18} style={{ color: '#111111' }} />
          </button>
        </div>
      )}

      <div className="flex-1 px-5 pb-8 flex flex-col">
        {/* Step 1: Type */}
        {step === 'type' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              What do you want to invest in?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#888888' }}>
              Pick a category to get started.
            </p>

            <div className="space-y-3 flex-1">
              {[
                { id: 'mutual-funds', label: 'Mutual Funds', desc: 'Professionally managed, diversified', icon: Layers, color: '#00D09C' },
                { id: 'stocks', label: 'Stocks', desc: 'Own a piece of a company', icon: BarChart2, color: '#5B8DEF' },
                { id: 'etfs', label: 'ETFs', desc: 'Trade like stocks, diversified like funds', icon: TrendingUp, color: '#F5A623' },
              ].map((item) => {
                const isSelected = investType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setInvestType(item.id)}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left active:scale-[0.98]"
                    style={{
                      background: isSelected ? '#E6FAF5' : 'white',
                      borderColor: isSelected ? '#00D09C' : '#E5E5E0',
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: isSelected ? '#00D09C' : `${item.color}15` }}
                    >
                      <item.icon size={22} color={isSelected ? 'white' : item.color} />
                    </div>
                    <div>
                      <p className="text-base font-semibold" style={{ color: '#111111' }}>{item.label}</p>
                      <p className="text-xs" style={{ color: '#888888' }}>{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {investType && (
              <button
                onClick={() => setStep('method')}
                className="mt-4 w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98] animate-slide-up"
                style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Step 2: Method */}
        {step === 'method' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              How would you like to invest?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#888888' }}>
              Choose your investment style.
            </p>

            <div className="space-y-3 flex-1">
              {[
                { id: 'onetime', label: 'One-time', desc: 'Invest a single amount now', icon: CircleDollarSign },
                { id: 'sip', label: 'Monthly SIP', desc: 'Invest a fixed amount every month', icon: Repeat },
              ].map((item) => {
                const isSelected = investMethod === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setInvestMethod(item.id)}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left active:scale-[0.98]"
                    style={{
                      background: isSelected ? '#E6FAF5' : 'white',
                      borderColor: isSelected ? '#00D09C' : '#E5E5E0',
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: isSelected ? '#00D09C' : '#F0F0EB' }}
                    >
                      <item.icon size={22} color={isSelected ? 'white' : '#555555'} />
                    </div>
                    <div>
                      <p className="text-base font-semibold" style={{ color: '#111111' }}>{item.label}</p>
                      <p className="text-xs" style={{ color: '#888888' }}>{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {investMethod && (
              <button
                onClick={() => setStep('amount')}
                className="mt-4 w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98] animate-slide-up"
                style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Step 3: Amount */}
        {step === 'amount' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: '#111111' }}>
              {investMethod === 'sip' ? 'How much per month?' : 'How much would you like to invest?'}
            </h3>
            <p className="text-sm mb-8" style={{ color: '#888888' }}>
              {investMethod === 'sip' ? 'Start with what feels comfortable.' : 'You can start small.'}
            </p>

            {/* Amount display */}
            <div className="text-center mb-8">
              <p className="text-[48px] font-bold number-display" style={{ color: '#111111' }}>
                {formatCurrency(amount)}
              </p>
              {investMethod === 'sip' && (
                <p className="text-sm" style={{ color: '#888888' }}>/month</p>
              )}
            </div>

            {/* Amount pills */}
            <div className="flex gap-2 justify-center mb-8 flex-wrap">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: amount === amt ? '#111111' : 'white',
                    color: amount === amt ? 'white' : '#111111',
                    border: `1.5px solid ${amount === amt ? '#111111' : '#E5E5E0'}`,
                  }}
                >
                  {formatCurrency(amt)}
                </button>
              ))}
            </div>

            {investMethod === 'sip' && (
              <div className="p-4 rounded-xl mb-4" style={{ background: '#F0F0EB' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#555555' }}>Frequency</span>
                  <span className="text-xs font-semibold" style={{ color: '#111111' }}>Monthly</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs" style={{ color: '#555555' }}>SIP date</span>
                  <span className="text-xs font-semibold" style={{ color: '#111111' }}>5th of every month</span>
                </div>
              </div>
            )}

            <div className="mt-auto">
              <button
                onClick={() => setStep('confirm')}
                className="w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
                style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
              >
                Review plan
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 'confirm' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 mt-4" style={{ color: '#111111' }}>
              Your plan
            </h3>

            <div className="p-5 rounded-2xl mb-4" style={{ background: 'white', border: '1px solid #E5E5E0' }}>
              <div className="text-center mb-4">
                <p className="text-[40px] font-bold number-display" style={{ color: '#111111' }}>
                  {formatCurrency(amount)}
                </p>
                {investMethod === 'sip' && (
                  <p className="text-sm" style={{ color: '#888888' }}>/month</p>
                )}
              </div>

              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #F0F0EB' }}>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#888888' }}>Type</span>
                  <span className="text-sm font-medium" style={{ color: '#111111' }}>
                    {investType === 'mutual-funds' ? 'Mutual Funds' : investType === 'stocks' ? 'Stocks' : 'ETFs'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#888888' }}>Method</span>
                  <span className="text-sm font-medium" style={{ color: '#111111' }}>
                    {investMethod === 'sip' ? 'Monthly SIP' : 'One-time'}
                  </span>
                </div>
                {riskProfile && (
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#888888' }}>Risk profile</span>
                    <span className="text-sm font-medium" style={{ color: '#00D09C' }}>{riskProfile}</span>
                  </div>
                )}
                {selectedHorizon && (
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#888888' }}>Time horizon</span>
                    <span className="text-sm font-medium" style={{ color: '#111111' }}>
                      {selectedHorizon === '<1' ? '<1 year' : selectedHorizon === '5+' ? '5+ years' : `${selectedHorizon} years`}
                    </span>
                  </div>
                )}
                {investMethod === 'sip' && (
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#888888' }}>SIP date</span>
                    <span className="text-sm font-medium" style={{ color: '#111111' }}>5th of every month</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl mb-4" style={{ background: '#FFF8E6' }}>
              <p className="text-[11px] leading-relaxed" style={{ color: '#8B7000' }}>
                This is a simulated investment for prototype purposes. No real money is involved.
              </p>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
                style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
              >
                {investMethod === 'sip' ? 'Start simulated SIP' : 'Confirm simulated investment'}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in px-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: '#E6FAF5' }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: '#00D09C' }}
              >
                <Check size={28} color="white" strokeWidth={3} />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2" style={{ color: '#111111' }}>
              You&apos;re officially started.
            </h2>
            <p className="text-sm mb-8" style={{ color: '#555555' }}>
              {investMethod === 'sip' 
                ? `${formatCurrency(amount)}/month has been added to your plan.`
                : `${formatCurrency(amount)} has been invested.`
              }
            </p>

            <button
              onClick={handleClose}
              className="w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#00D09C', color: 'white', boxShadow: '0 4px 12px rgba(0,208,156,0.3)' }}
            >
              See my progress
            </button>

            <button
              onClick={handleClose}
              className="mt-3 text-sm font-medium"
              style={{ color: '#888888' }}
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
