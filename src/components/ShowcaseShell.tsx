'use client';

import { useAppStore } from '@/lib/store';
import { MobileApp } from './MobileApp';

export function ShowcaseShell() {
  const { setViewMode } = useAppStore();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#F7F7F2' }}
    >
      {/* Background subtle decoration & Editorial Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Soft ambient rings */}
        <div 
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #00D09C 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #00D09C 0%, transparent 70%)' }}
        />
        {/* Editorial Text */}
        <h1 
          className="text-[12vw] font-black tracking-tighter whitespace-nowrap opacity-[0.02] select-none"
          style={{ color: '#111111' }}
        >
          BUILD YOUR MONEY HABIT
        </h1>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <div className="text-xl font-bold tracking-tight" style={{ color: '#111111' }}>
          Grown<span style={{ color: '#00D09C' }}>Up</span>
        </div>
      </div>

      {/* Phone Frame */}
      <div className="flex-1 flex items-center justify-center w-full py-10 z-10">
        {/* Phone outer shell — both width and height computed from viewport, content cannot change them */}
        <div 
          className="relative rounded-[52px] p-[12px] flex flex-col overflow-hidden"
          style={{ 
            background: '#1A1A1A',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.05)',
            height: 'calc(100vh - 80px)',
            width: 'calc((100vh - 80px) * 430 / 844)',
          }}
        >
          {/* Dynamic island */}
          <div 
            className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[25%] h-[3.5%] min-h-[24px] max-h-[32px] rounded-full z-20"
            style={{ background: '#000000' }}
          />

          {/* Phone screen */}
          <div className="relative rounded-[40px] overflow-hidden flex-1 w-full bg-[#F7F7F2]">
            <MobileApp isInFrame />
          </div>
        </div>
      </div>

      {/* Utility Area (Bottom right) */}
      <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end gap-3 animate-fade-in">
        <button
          onClick={() => setViewMode('desktop')}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-bold transition-all duration-200 hover:scale-[1.02] shadow-sm"
          style={{ 
            background: '#111111', 
            color: 'white',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          Switch to Desktop App
        </button>
      </div>
    </div>
  );
}
