'use client';

import { useAppStore } from '@/lib/store';
import { X, Flame, Target, BookOpen, CalendarCheck, Share2 } from 'lucide-react';

export function MoneyWrappedSheet() {
  const { moneyFitness, goals, setMoneyWrappedOpen } = useAppStore();

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-[14px] font-bold text-[#111111]">
          Money Wrapped
        </h2>
        <button 
          onClick={() => setMoneyWrappedOpen(false)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 phone-scroll">
        <div className="px-5 py-6">
          
          <h1 className="text-[32px] font-black text-[#111111] mb-2 leading-tight">YOUR MONEY MONTH</h1>
          <p className="text-[15px] font-medium text-[#555555] mb-8">
            Here's how you built your wealth habit this October.
          </p>

          <div className="space-y-4 mb-8">
            
            <div className="bg-white p-5 rounded-[24px] border border-[#E5E5E0] flex items-center gap-4 animate-slide-up">
              <div className="w-12 h-12 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
                <Flame size={24} className="text-[#F5A623]" />
              </div>
              <div>
                <p className="text-[20px] font-black text-[#111111]">{moneyFitness.streakMonths} months</p>
                <p className="text-[13px] font-bold text-[#888888] uppercase tracking-wide">Consistent Investing</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] border border-[#E5E5E0] flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                <Target size={24} className="text-[#5B8DEF]" />
              </div>
              <div>
                <p className="text-[20px] font-black text-[#111111]">{goals.length} Goals</p>
                <p className="text-[13px] font-bold text-[#888888] uppercase tracking-wide">Actively Progressing</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] border border-[#E5E5E0] flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-[#F0F0EB] flex items-center justify-center shrink-0">
                <BookOpen size={24} className="text-[#111111]" />
              </div>
              <div>
                <p className="text-[20px] font-black text-[#111111]">{moneyFitness.conceptsLearned} Concepts</p>
                <p className="text-[13px] font-bold text-[#888888] uppercase tracking-wide">Learned & Understood</p>
              </div>
            </div>

            <div className="bg-[#111111] p-5 rounded-[24px] flex items-center gap-4 animate-slide-up text-white" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CalendarCheck size={24} className="text-[#00D09C]" />
              </div>
              <div>
                <p className="text-[20px] font-black text-[#00D09C]">Habit complete</p>
                <p className="text-[13px] font-bold text-[#888888] uppercase tracking-wide">Strongest habit: Consistency</p>
              </div>
            </div>
            
          </div>

          <button className="w-full py-4 bg-white border border-[#E5E5E0] text-[#111111] rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[0.98]">
            <Share2 size={18} />
            Share Milestone
          </button>

        </div>
      </div>
    </div>
  );
}
