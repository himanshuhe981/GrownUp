'use client';

import { useAppStore } from '@/lib/store';
import { formatCurrency, formatCompactCurrency } from '@/lib/data';
import { Plus, Shield, Plane, TrendingUp, Target } from 'lucide-react';

const goalIcons: Record<string, typeof Shield> = {
  'shield': Shield,
  'plane': Plane,
  'trending-up': TrendingUp,
};

export function GoalsScreen() {
  const { goals, setGoalCreationOpen } = useAppStore();

  const totalInvested = goals.reduce((sum, g) => sum + g.current, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);

  return (
    <div className="px-5 pt-14 pb-4">
      <div className="flex items-center justify-between mb-1 animate-fade-in">
        <h1 className="text-[28px] font-bold tracking-tight" style={{ color: '#111111' }}>
          Goals
        </h1>
        <button
          onClick={() => setGoalCreationOpen(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
          style={{ background: '#00D09C' }}
          aria-label="Create new goal"
        >
          <Plus size={18} color="white" strokeWidth={2.5} />
        </button>
      </div>
      <p className="text-sm mb-6 animate-fade-in" style={{ color: '#888888' }}>
        Give your money a purpose.
      </p>

      {/* Summary */}
      <div 
        className="p-5 rounded-2xl mb-6 animate-slide-up"
        style={{ background: 'white', border: '1px solid #E5E5E0' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} style={{ color: '#00D09C' }} />
          <span className="text-xs font-medium" style={{ color: '#888888' }}>All goals combined</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold number-display" style={{ color: '#111111' }}>
            {formatCurrency(totalInvested)}
          </span>
          <span className="text-sm" style={{ color: '#888888' }}>
            / {formatCurrency(totalTarget)}
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#F0F0EB' }}>
          <div 
            className="h-full rounded-full transition-all duration-700"
            style={{ 
              width: `${Math.round((totalInvested / totalTarget) * 100)}%`,
              background: 'linear-gradient(90deg, #00D09C, #00B386)',
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: '#888888' }}>
          {Math.round((totalInvested / totalTarget) * 100)}% of your total goals
        </p>
      </div>

      {/* Goal Cards */}
      <div className="space-y-3">
        {goals.map((goal, index) => {
          const Icon = goalIcons[goal.icon] || Target;
          const percent = Math.round((goal.current / goal.target) * 100);
          
          return (
            <div
              key={goal.id}
              className="p-5 rounded-2xl animate-slide-up"
              style={{ 
                background: 'white', 
                border: '1px solid #E5E5E0',
                animationDelay: `${(index + 1) * 0.1}s`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${goal.color}15` }}
                  >
                    <Icon size={20} style={{ color: goal.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#111111' }}>{goal.name}</p>
                    <p className="text-xs" style={{ color: '#888888' }}>
                      Target: {goal.targetDate}
                    </p>
                  </div>
                </div>
                <span 
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${goal.color}15`, color: goal.color }}
                >
                  {percent}%
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-xl font-bold number-display" style={{ color: '#111111' }}>
                  {formatCompactCurrency(goal.current)}
                </span>
                <span className="text-xs" style={{ color: '#888888' }}>
                  / {formatCompactCurrency(goal.target)}
                </span>
              </div>

              <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: '#F0F0EB' }}>
                <div 
                  className="h-full rounded-full transition-all duration-700"
                  style={{ 
                    width: `${percent}%`, 
                    background: goal.color,
                  }}
                />
              </div>

              <p className="text-xs" style={{ color: '#888888' }}>
                {formatCurrency(goal.monthlyContribution)}/month
              </p>
            </div>
          );
        })}
      </div>

      {/* Create goal CTA */}
      <button
        onClick={() => setGoalCreationOpen(true)}
        className="w-full mt-4 p-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
        style={{ 
          background: '#F0F0EB', 
          border: '2px dashed #E5E5E0',
        }}
      >
        <Plus size={18} style={{ color: '#888888' }} />
        <span className="text-sm font-medium" style={{ color: '#555555' }}>Create a new goal</span>
      </button>
    </div>
  );
}
