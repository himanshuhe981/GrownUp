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
      {/* Background subtle decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #00D09C 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #00D09C 0%, transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <div className="text-xl font-bold tracking-tight" style={{ color: '#111111' }}>
          Grown<span style={{ color: '#00D09C' }}>Up</span>
        </div>
        <button
          onClick={() => setViewMode('desktop')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
          style={{ 
            background: 'white', 
            color: '#111111',
            border: '1px solid #E5E5E0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          Desktop mode
        </button>
      </div>

      {/* Phone Frame */}
      <div className="relative mt-16 mb-8">
        {/* Phone outer shell */}
        <div 
          className="relative rounded-[52px] p-[12px]"
          style={{ 
            background: '#1A1A1A',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          {/* Dynamic island */}
          <div 
            className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] rounded-full z-20"
            style={{ background: '#000000' }}
          />

          {/* Phone screen */}
          <div 
            className="relative rounded-[40px] overflow-hidden"
            style={{ 
              width: '390px', 
              height: '800px',
              background: '#F7F7F2',
            }}
          >
            <div className="phone-scroll h-full overflow-y-auto overflow-x-hidden">
              <MobileApp isInFrame />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="text-center pb-8 animate-fade-in">
        <p className="text-sm" style={{ color: '#888888' }}>
          Interactive prototype — Case study for Groww
        </p>
      </div>
    </div>
  );
}
