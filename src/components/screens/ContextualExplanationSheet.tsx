'use client';

import { useAppStore } from '@/lib/store';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function ContextualExplanationSheet() {
  const { setAiOpen, setScreen, explanationOpen, explanationData, closeExplanation } = useAppStore();

  if (!explanationOpen || !explanationData) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#888888]">
          {explanationData.title || 'Context'}
        </h2>
        <button 
          onClick={() => closeExplanation()}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 phone-scroll">
        <div className="px-5 py-6 animate-fade-in">
          
          <h1 className="text-[24px] font-bold text-[#111111] mb-2">{explanationData.headline}</h1>
          <p className="text-[14px] text-[#555555] mb-8 leading-relaxed">
            {explanationData.intro}
          </p>

          {explanationData.pros && (
            <div className="mb-8">
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">
                Why people may explore it
              </h3>
              <ul className="space-y-3">
                {explanationData.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex gap-3 text-[14px] text-[#111111] font-medium">
                    <span className="text-[#00D09C]">•</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {explanationData.cons && (
            <div className="mb-8">
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">
                Things to understand
              </h3>
              <ul className="space-y-3">
                {explanationData.cons.map((con: string, i: number) => (
                  <li key={i} className="flex gap-3 text-[14px] text-[#111111] font-medium">
                    <span className="text-[#F5A623]">•</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3 pt-6 border-t border-[#E5E5E0]">
            <button 
              onClick={() => {
                closeExplanation();
                setAiOpen(true);
              }}
              className="w-full py-4 bg-white border border-[#E5E5E0] text-[#111111] rounded-xl text-[14px] font-bold flex items-center gap-2 justify-center active:scale-[0.98]"
            >
              <Sparkles size={16} className="text-[#00D09C]" />
              Ask GrownUp AI
            </button>
            <button 
              onClick={() => {
                closeExplanation();
                setScreen('explore');
              }}
              className="w-full py-4 bg-[#111111] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Explore {explanationData.topic} <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
