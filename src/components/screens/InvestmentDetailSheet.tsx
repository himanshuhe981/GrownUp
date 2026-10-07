'use client';

import { useAppStore } from '@/lib/store';
import { X, TrendingUp, AlertCircle, Sparkles, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/data';
import { MiniChart } from '../ui/MiniChart';
import { mockChartData } from '@/lib/data';

export function InvestmentDetailSheet() {
  const { investmentDetailOpen, investmentData, setInvestFlowOpen, setAiOpen } = useAppStore();

  if (!investmentDetailOpen || !investmentData) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-[14px] font-bold text-[#111111]">
          {investmentData.category}
        </h2>
        <button 
          onClick={() => useAppStore.setState({ investmentDetailOpen: false, investmentData: null })}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 phone-scroll">
        <div className="px-5 py-6">
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white border border-[#E5E5E0]">
              <TrendingUp size={24} className="text-[#00D09C]" />
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-[#111111] mb-1 leading-tight">{investmentData.name}</h1>
              <p className="text-[13px] font-bold text-[#00D09C]">
                {investmentData.returns1Y} <span className="text-[#888888] font-normal">in 1 Year (simulated)</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[24px] border border-[#E5E5E0] mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-bold tracking-widest text-[#888888] uppercase">Value trend</span>
            </div>
            <div className="h-[140px]">
              <MiniChart data={mockChartData['1Y']} height={140} />
            </div>
            <p className="text-center text-[10px] text-[#888888] mt-2">Mock data for demonstration</p>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-[12px] font-bold px-3 py-1.5 rounded-lg" style={{ 
              background: investmentData.risk === 'Low' ? '#E6FAF5' : investmentData.risk === 'Moderate' ? '#F0F0EB' : '#FFF0F0',
              color: investmentData.risk === 'Low' ? '#00B386' : investmentData.risk === 'Moderate' ? '#555555' : '#EB5757',
            }}>
              {investmentData.risk} Risk
            </span>
            <span className="text-[12px] font-bold text-[#888888] px-3 py-1.5 rounded-lg bg-white border border-[#E5E5E0]">
              Min. ₹{investmentData.minInvestment}
            </span>
          </div>

          <h3 className="text-[11px] font-bold tracking-widest uppercase mb-3 text-[#888888]">About this</h3>
          <p className="text-[14px] text-[#555555] leading-relaxed mb-6">
            {investmentData.description}
          </p>

          <div className="space-y-3 pt-6 border-t border-[#E5E5E0] mb-8">
            <button 
              onClick={() => {
                useAppStore.setState({ investmentDetailOpen: false });
                const explanation = {
                  headline: `Why am I seeing ${investmentData.name}?`,
                  intro: `This is a popular ${investmentData.category.toLowerCase()} that is currently trending among investors.`,
                  pros: [
                    'Considered a standard choice in its category',
                    'Often used by beginners',
                    'Offers a way to participate in broader market movements'
                  ],
                  cons: [
                    'Past performance does not guarantee future results',
                    'Carries market risk',
                    'Requires a minimum investment of ₹' + investmentData.minInvestment
                  ],
                  topic: investmentData.name,
                };
                useAppStore.setState({ explanationOpen: true, explanationData: explanation });
              }}
              className="w-full py-4 bg-white border border-[#E5E5E0] text-[#111111] rounded-xl text-[14px] font-bold flex items-center justify-between px-5 active:scale-[0.98]"
            >
              Why am I seeing this? <AlertCircle size={16} className="text-[#888888]" />
            </button>
            <button 
              onClick={() => {
                useAppStore.setState({ investmentDetailOpen: false });
                setAiOpen(true);
              }}
              className="w-full py-4 bg-white border border-[#E5E5E0] text-[#111111] rounded-xl text-[14px] font-bold flex items-center justify-between px-5 active:scale-[0.98]"
            >
              Explain this with AI <Sparkles size={16} className="text-[#00D09C]" />
            </button>
          </div>

        </div>
      </div>
      
      {/* Sticky Bottom Actions */}
      <div className="p-5 bg-white border-t border-[#E5E5E0] pb-8">
        <button 
          onClick={() => {
            useAppStore.setState({ investmentDetailOpen: false });
            setInvestFlowOpen(true);
          }}
          className="w-full py-4 bg-[#00D09C] text-white rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Plus size={18} />
          Invest in this
        </button>
      </div>
    </div>
  );
}
