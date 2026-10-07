'use client';

import { useAppStore } from '@/lib/store';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function LearningSheet() {
  const { learningOpen, learningData, closeLearning, setAiOpen, markLearned } = useAppStore();
  const [marked, setMarked] = useState(false);

  if (!learningOpen || !learningData) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#888888]">
          {learningData.category || 'Learning'}
        </h2>
        <button 
          onClick={() => {
            closeLearning();
            setTimeout(() => setMarked(false), 300);
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 phone-scroll">
        <div className="px-5 py-6 animate-fade-in">
          
          <h1 className="text-[28px] font-bold text-[#111111] mb-2 leading-tight">{learningData.title}</h1>
          <p className="text-[13px] text-[#00D09C] font-bold mb-8">
            Estimated time: {learningData.readTime || '2 min'}
          </p>

          <div className="space-y-8 mb-10">
            {learningData.sections?.map((section: any, index: number) => (
              <div key={index}>
                <h3 className="text-[16px] font-bold text-[#111111] mb-2">{section.heading}</h3>
                <p className="text-[15px] text-[#555555] leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 bg-white border border-[#E5E5E0] rounded-[24px] mb-8">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#888888] mb-2">Still Confused?</h3>
            <p className="text-[14px] text-[#111111] mb-4">You can ask GrownUp AI to explain any concept in simpler terms.</p>
            <button 
              onClick={() => {
                closeLearning();
                setAiOpen(true);
              }}
              className="w-full py-3 bg-[#F0F0EB] text-[#111111] rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Sparkles size={16} className="text-[#00D09C]" />
              Ask GrownUp AI
            </button>
          </div>

          <button 
            onClick={() => {
              if (!marked) {
                setMarked(true);
                markLearned();
              }
            }}
            disabled={marked}
            className={`w-full py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
              marked 
                ? 'bg-[#E6FAF5] text-[#00D09C]' 
                : 'bg-[#111111] text-white'
            }`}
          >
            {marked ? (
              <>
                <CheckCircle2 size={18} />
                Learned
              </>
            ) : (
              'Mark as learned'
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
