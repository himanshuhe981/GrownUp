'use client';

import { useAppStore } from '@/lib/store';
import { Home, Search, Target, BarChart3, Plus } from 'lucide-react';
import type { AppScreen } from '@/lib/types';

const navItems: { id: AppScreen; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
];

export function BottomNav() {
  const { currentScreen, setScreen, setInvestFlowOpen } = useAppStore();

  return (
    <nav 
      className="absolute bottom-0 left-0 right-0 z-30 glass"
      style={{ 
        borderTop: '1px solid #E5E5E0',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.slice(0, 2).map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] transition-colors duration-200"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 1.8}
                color={isActive ? '#00D09C' : '#888888'} 
              />
              <span 
                className="text-[10px] font-medium"
                style={{ color: isActive ? '#00D09C' : '#888888' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Central Invest button */}
        <button
          onClick={() => setInvestFlowOpen(true)}
          className="flex flex-col items-center gap-0.5 -mt-4 transition-transform duration-200 active:scale-95"
          aria-label="Invest"
        >
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ 
              background: '#00D09C',
              boxShadow: '0 4px 12px rgba(0,208,156,0.3)',
            }}
          >
            <Plus size={24} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: '#00D09C' }}>
            Invest
          </span>
        </button>

        {navItems.slice(2).map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] transition-colors duration-200"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 1.8}
                color={isActive ? '#00D09C' : '#888888'} 
              />
              <span 
                className="text-[10px] font-medium"
                style={{ color: isActive ? '#00D09C' : '#888888' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
