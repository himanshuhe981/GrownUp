'use client';

import { useAppStore } from '@/lib/store';
import { ShowcaseShell } from '@/components/ShowcaseShell';
import { MobileApp } from '@/components/MobileApp';
import { DesktopApp } from '@/components/DesktopApp';
import { useEffect, useState } from 'react';

export default function Home() {
  const { viewMode, setViewMode } = useAppStore();
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkViewport = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F7F7F2' }}>
        <div className="text-center">
          <div className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#111111' }}>
            Grown<span style={{ color: '#00D09C' }}>Up</span>
          </div>
          <div className="text-sm" style={{ color: '#888888' }}>Loading...</div>
        </div>
      </div>
    );
  }

  // Real mobile device — render app edge-to-edge
  if (isMobileViewport) {
    return <MobileApp />;
  }

  // Desktop: show based on view mode
  if (viewMode === 'desktop') {
    return (
      <div className="min-h-screen" style={{ background: '#F7F7F2' }}>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setViewMode('mobile')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              background: 'white', 
              color: '#111111',
              border: '1px solid #E5E5E0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            Mobile mode
          </button>
        </div>
        <DesktopApp />
      </div>
    );
  }

  // Desktop: showcase shell with phone frame
  return <ShowcaseShell />;
}
