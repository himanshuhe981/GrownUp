'use client';

import { useAppStore } from '@/lib/store';
import { X, Flame, CheckCircle2, Circle, Trophy, ArrowRight, Target, BookOpen, Calendar } from 'lucide-react';

export function MoneyFitnessSheet() {
  const { moneyFitness, setMoneyFitnessOpen, goals } = useAppStore();

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-base font-semibold text-[#111111]">Your Money Fitness</h2>
        <button 
          onClick={() => setMoneyFitnessOpen(false)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
          aria-label="Close"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 phone-scroll">
        <div className="px-5 py-6">
          
          {/* Main Streak */}
          <div className="text-center mb-10 mt-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF4E5] mb-4">
              <Flame size={40} className="text-[#F5A623]" />
            </div>
            <h1 className="text-3xl font-black text-[#111111] mb-2">{moneyFitness.streakMonths} months</h1>
            <p className="text-[15px] font-medium text-[#555555]">consistent investing streak.</p>
          </div>

          {/* Current Habits */}
          <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">Current Habits</h3>
          <div className="bg-white rounded-[24px] p-5 border border-[#E5E5E0] mb-8 space-y-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-[#111111]" />
                  <p className="text-[14px] font-bold text-[#111111]">Monthly investing</p>
                </div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-[#00D09C]">
                  <CheckCircle2 size={14} /> Complete
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#F0F0EB]" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target size={18} className="text-[#111111]" />
                  <p className="text-[14px] font-bold text-[#111111]">Goal contribution</p>
                </div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-[#00D09C]">
                  <CheckCircle2 size={14} /> Complete
                </div>
              </div>
              <p className="text-[12px] text-[#888888] ml-7">{goals.length} active goals progressing</p>
            </div>

            <div className="h-[1px] w-full bg-[#F0F0EB]" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-[#111111]" />
                  <p className="text-[14px] font-bold text-[#111111]">Learn concepts</p>
                </div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-[#555555]">
                  2 / 3 complete
                </div>
              </div>
              <p className="text-[12px] text-[#888888] ml-7">{moneyFitness.conceptsLearned} total concepts learned</p>
            </div>
          </div>

          {/* Next Challenge */}
          <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">Next Challenge</h3>
          <div className="bg-[#111111] rounded-[24px] p-5 mb-8 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <BookOpen size={100} />
            </div>
            <p className="text-[12px] font-bold text-[#00D09C] mb-1">LEARNING CHALLENGE</p>
            <h4 className="text-[18px] font-bold mb-4">Understand Before You Invest</h4>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex-1 h-2 bg-[#333333] rounded-full overflow-hidden">
                <div className="h-full w-[66%] bg-[#00D09C] rounded-full" />
              </div>
              <span className="text-[12px] font-bold">2 of 3</span>
            </div>
            <button className="w-full py-3.5 bg-white text-[#111111] rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
              Continue challenge <ArrowRight size={16} />
            </button>
          </div>

          {/* Milestones */}
          <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">Milestones</h3>
          <div className="bg-white rounded-[24px] p-5 border border-[#E5E5E0] space-y-4">
            
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#E6FAF5] flex items-center justify-center">
                <CheckCircle2 size={16} className="text-[#00D09C]" />
              </div>
              <p className="text-[14px] font-bold text-[#111111] line-through">3 months consistent</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFF4E5] border-2 border-[#F5A623] flex items-center justify-center">
                <Trophy size={14} className="text-[#F5A623]" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#111111]">6 months consistent</p>
                <p className="text-[11px] text-[#5B8DEF]">Next milestone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#E5E5E0] flex items-center justify-center">
                <Circle size={10} className="text-[#E5E5E0] fill-current" />
              </div>
              <p className="text-[14px] font-bold text-[#888888]">12 months consistent</p>
            </div>

          </div>

          {/* Monthly Reflection */}
          <div className="mt-8 mb-4">
            <button 
              onClick={() => useAppStore.setState({ moneyWrappedOpen: true })}
              className="w-full py-4 bg-white border border-[#E5E5E0] text-[#111111] rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              View your Money Month <ArrowRight size={16} />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
