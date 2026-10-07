'use client';

import { useAppStore } from '@/lib/store';
import { formatCurrency, mockChartData } from '@/lib/data';
import { ArrowUpRight, ArrowDownRight, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MiniChart } from '../ui/MiniChart';
import { useState } from 'react';

export function PortfolioScreen() {
  const { portfolioValue, portfolioGain, holdings, moneyFitness } = useAppStore();
  
  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalGain = portfolioGain;
  const gainPercent = ((totalGain / totalInvested) * 100).toFixed(2);

  return (
    <div className="px-5 pt-14 pb-8">
      {/* HEADER & BALANCE */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-[28px] font-bold tracking-tight mb-2" style={{ color: '#111111' }}>
          Portfolio
        </h1>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[12px] font-medium text-[#888888] mb-1 uppercase tracking-widest">Current Value</p>
            <p className="text-[44px] font-bold leading-none tracking-tight text-[#111111]">
              {formatCurrency(portfolioValue)}
            </p>
          </div>
        </div>
      </div>

      {/* GAINS & CHART */}
      <div className="p-5 rounded-2xl mb-8 border animate-slide-up" style={{ background: 'white', borderColor: '#E5E5E0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[12px] text-[#555555] mb-0.5">All time gain</p>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight size={16} style={{ color: '#00D09C' }} />
              <p className="text-[16px] font-bold text-[#00D09C]">
                +{formatCurrency(totalGain)}
              </p>
              <span className="text-[12px] font-semibold bg-[#E6FAF5] text-[#00B386] px-2 py-0.5 rounded-md ml-1">
                +{gainPercent}%
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-[#555555] mb-0.5">Invested</p>
            <p className="text-[16px] font-bold text-[#111111]">{formatCurrency(totalInvested)}</p>
          </div>
        </div>
        
        <div className="h-[120px] mb-2 -mx-2">
          <MiniChart data={mockChartData['1Y']} height={120} />
        </div>
      </div>

      {/* MONTHLY MONEY FITNESS */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-[14px] font-bold text-[#111111] mb-4">Monthly check-in</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl border flex flex-col justify-between" style={{ background: 'white', borderColor: '#E5E5E0', minHeight: '90px' }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} style={{ color: '#00D09C' }} />
              <span className="text-[13px] font-bold text-[#111111]">On track</span>
            </div>
            <p className="text-[11px] text-[#555555] leading-relaxed">
              {moneyFitness.streakMonths} months consistency streak
            </p>
          </div>
          <div className="p-4 rounded-2xl border flex flex-col justify-between" style={{ background: 'white', borderColor: '#E5E5E0', minHeight: '90px' }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} style={{ color: '#00D09C' }} />
              <span className="text-[13px] font-bold text-[#111111]">SIPs paid</span>
            </div>
            <p className="text-[11px] text-[#555555] leading-relaxed">
              All contributions processed this month
            </p>
          </div>
        </div>
      </div>

      {/* MY INVESTMENTS */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-bold text-[#111111]">My investments</h3>
        </div>
        
        <div className="space-y-3">
          {holdings.map((holding) => {
            const gain = holding.current - holding.invested;
            const holdingGainPercent = ((gain / holding.invested) * 100).toFixed(2);
            const isPositive = gain >= 0;

            return (
              <div
                key={holding.id}
                className="p-4 rounded-2xl border flex flex-col transition-all active:scale-[0.98]"
                style={{ background: 'white', borderColor: '#E5E5E0' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F7F7F2]"
                    >
                      <TrendingUp size={18} style={{ color: holding.type === 'Mutual Fund' ? '#00D09C' : '#5B8DEF' }} />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#111111]">{holding.name}</p>
                      <p className="text-[12px] text-[#888888]">{holding.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-bold text-[#111111]">{formatCurrency(holding.current)}</p>
                    <p className={`text-[12px] font-medium flex items-center justify-end gap-0.5 mt-0.5 ${isPositive ? 'text-[#00D09C]' : 'text-[#EB5757]'}`}>
                      {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {Math.abs(Number(holdingGainPercent))}%
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#F0F0EB' }}>
                  <p className="text-[11px] text-[#888888]">
                    Invested: <span className="font-semibold text-[#555555]">{formatCurrency(holding.invested)}</span>
                  </p>
                  <p className="text-[11px] text-[#888888]">
                    Gain: <span className={`font-semibold ${isPositive ? 'text-[#00D09C]' : 'text-[#EB5757]'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(gain)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
