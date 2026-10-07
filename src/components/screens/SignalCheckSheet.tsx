'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { X, Search, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function SignalCheckSheet() {
  const { setSignalCheckOpen, setAiOpen } = useAppStore();
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleCheck = () => {
    if (!input) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-base font-semibold text-[#111111]">Signal Check</h2>
        <button 
          onClick={() => setSignalCheckOpen(false)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll">
        {!analyzed ? (
          <div className="px-5 py-6">
            <h3 className="text-[24px] font-bold text-[#111111] mb-2">Seen something about investing online?</h3>
            <p className="text-[14px] text-[#555555] mb-8">
              Paste a claim, headline or idea. We'll help you cut through the noise.
            </p>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 'This stock will double in 6 months' or 'Everyone says SIPs are safest'"
              className="w-full h-32 p-4 bg-white border border-[#E5E5E0] rounded-[20px] resize-none mb-6 text-[15px] outline-none focus:border-[#00D09C]"
            />

            <button
              onClick={handleCheck}
              disabled={!input || analyzing}
              className="w-full py-4 bg-[#111111] text-white rounded-xl text-[15px] font-bold active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {analyzing ? 'Checking...' : 'Check the idea'}
            </button>
            
            <p className="text-center text-[11px] text-[#888888] mt-4">This provides educational clarity, not financial advice.</p>
          </div>
        ) : (
          <div className="px-5 py-6 animate-fade-in">
            <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">THE CLAIM</h3>
            <div className="p-4 bg-white rounded-[20px] border border-[#E5E5E0] mb-8">
              <p className="text-[15px] font-medium text-[#111111]">"{input}"</p>
            </div>

            <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">WHAT IT MEANS</h3>
            <p className="text-[14px] text-[#111111] mb-8 leading-relaxed">
              This is a prediction about future performance, not a guaranteed outcome. Market movements are influenced by unpredictable variables.
            </p>

            <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">WHAT TO QUESTION</h3>
            <ul className="space-y-3 mb-8">
              {[
                'What evidence supports it?',
                'What assumptions are being made?',
                'What happens if those assumptions are wrong?'
              ].map((q, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-[#555555]">
                  <span className="font-bold text-[#111111]">{i + 1}.</span> {q}
                </li>
              ))}
            </ul>

            <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">RISK / UNCERTAINTY</h3>
            <div className="flex items-center gap-2 text-[#F5A623] mb-8 bg-[#FFF4E5] p-3 rounded-xl w-fit">
              <AlertCircle size={16} />
              <span className="text-[13px] font-bold">High uncertainty</span>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#E5E5E0]">
              <button 
                onClick={() => {
                  setSignalCheckOpen(false);
                  setAiOpen(true);
                }}
                className="w-full py-4 bg-white border border-[#E5E5E0] text-[#111111] rounded-xl text-[14px] font-bold flex items-center justify-between px-5 active:scale-[0.98]"
              >
                Explain further with AI <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
