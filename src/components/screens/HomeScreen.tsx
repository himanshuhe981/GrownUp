'use client';

import { useAppStore } from '@/lib/store';
import { mockUser, mockChartData, formatCurrency } from '@/lib/data';
import { Bell, Sparkles, TrendingUp, CircleDollarSign, Search, BookOpen, ArrowUpRight, ArrowDownRight, Flame, Users, CheckCircle2 } from 'lucide-react';
import { MiniChart } from '../ui/MiniChart';

export function HomeScreen() {
  const { 
    portfolioValue, 
    portfolioGain, 
    goals, 
    transactions, 
    setScreen, 
    setAiOpen, 
    setInvestFlowOpen,
    setNotificationsOpen,
    notifications,
    chartPeriod,
    setChartPeriod,
    moneyFitness,
    circleTrends
  } = useAppStore();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="px-5 pt-14 pb-8">
      {/* 1. TOP: Greeting + profile + notifications */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: '#00D09C', color: 'white' }}
          >
            {mockUser.avatar}
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: '#111111' }}>
              {greeting}, {mockUser.name}
            </h2>
            <p className="text-[11px]" style={{ color: '#888888' }}>
              Let&apos;s make your money move.
            </p>
          </div>
        </div>
        <button 
          onClick={() => setNotificationsOpen(true)}
          className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ background: 'white', border: '1px solid #E5E5E0' }}
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        >
          <Bell size={16} style={{ color: '#111111' }} />
          {unreadCount > 0 && (
            <div 
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold"
              style={{ background: '#EB5757', color: 'white' }}
            >
              {unreadCount}
            </div>
          )}
        </button>
      </div>

      {/* 2. AI ENTRY POINT: Compact pill */}
      <button 
        onClick={() => setAiOpen(true)}
        className="w-full flex items-center justify-between p-3.5 rounded-full mb-6 transition-all duration-200 active:scale-[0.98] animate-slide-up"
        style={{ background: '#111111', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-center gap-2.5">
          <Sparkles size={16} style={{ color: '#00D09C' }} />
          <span className="text-sm font-medium">Ask GrownUp AI</span>
        </div>
        <span className="text-xs" style={{ color: '#888888' }}>Explain something about your money</span>
      </button>

      {/* 3. PORTFOLIO VALUE & PERFORMANCE */}
      <div 
        className="mb-6 animate-slide-up"
        style={{ animationDelay: '0.1s' }}
      >
        <p className="text-xs font-medium mb-1" style={{ color: '#888888' }}>Total portfolio value</p>
        <p className="text-[40px] font-bold leading-none number-display mb-1 tracking-tight" style={{ color: '#111111' }}>
          {formatCurrency(portfolioValue)}
        </p>
        <div className="flex items-center gap-1.5 mb-5">
          <ArrowUpRight size={14} style={{ color: '#00D09C' }} />
          <span className="text-sm font-semibold" style={{ color: '#00D09C' }}>
            +{formatCurrency(portfolioGain)}
          </span>
          <span className="text-xs" style={{ color: '#888888' }}>all time</span>
        </div>

        {/* Chart */}
        <div className="h-[140px] mb-4">
          <MiniChart data={mockChartData[chartPeriod] || mockChartData['1Y']} height={140} />
        </div>

        {/* Period controls */}
        <div className="flex gap-1.5 p-1 rounded-xl" style={{ background: '#F0F0EB' }}>
          {['1D', '1W', '1M', '1Y', 'ALL'].map((period) => (
            <button
              key={period}
              onClick={() => setChartPeriod(period)}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: chartPeriod === period ? 'white' : 'transparent',
                color: chartPeriod === period ? '#111111' : '#888888',
                boxShadow: chartPeriod === period ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MONEY FITNESS (Goals / progress / habits) */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: '#111111' }}>Your Money Fitness</h3>
        </div>
        
        <div className="p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E5E5E0' }}>
          {/* Top stats row */}
          <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid #F0F0EB' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FFF4E5' }}>
                <Flame size={20} style={{ color: '#F5A623' }} />
              </div>
              <div>
                <p className="text-base font-bold" style={{ color: '#111111' }}>{moneyFitness.streakMonths} months</p>
                <p className="text-[11px]" style={{ color: '#888888' }}>investing streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: '#111111' }}>Next milestone</p>
              <p className="text-[11px]" style={{ color: '#5B8DEF' }}>{moneyFitness.milestone}</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} style={{ color: moneyFitness.monthlyConsistent ? '#00D09C' : '#E5E5E0', marginTop: '2px' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: '#111111' }}>SIP completed this month</p>
                <p className="text-[11px]" style={{ color: '#888888' }}>Consistency builds wealth.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} style={{ color: '#00D09C', marginTop: '2px' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: '#111111' }}>{goals.length} goals progressing</p>
                <p className="text-[11px]" style={{ color: '#888888' }}>Emergency fund is 36% funded.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} style={{ color: '#00D09C', marginTop: '2px' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: '#111111' }}>{moneyFitness.conceptsLearned} concepts learned</p>
                <p className="text-[11px]" style={{ color: '#888888' }}>Knowledge is compounding.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#111111' }}>Quick actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Invest', icon: CircleDollarSign, action: () => setInvestFlowOpen(true), color: '#00D09C' },
            { label: 'Start SIP', icon: TrendingUp, action: () => setInvestFlowOpen(true), color: '#5B8DEF' },
            { label: 'Explore', icon: Search, action: () => setScreen('explore'), color: '#111111' },
            { label: 'Learn', icon: BookOpen, action: () => setScreen('explore'), color: '#8B5CF6' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center gap-2 py-3 transition-all duration-200 active:scale-95"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{ background: 'white', borderColor: '#E5E5E0' }}
              >
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <span className="text-[11px] font-medium" style={{ color: '#555555' }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. TRENDING IN YOUR CIRCLE */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} style={{ color: '#5B8DEF' }} />
          <h3 className="text-sm font-semibold" style={{ color: '#111111' }}>Trending in your Circle</h3>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 phone-scroll -mx-5 px-5">
          {circleTrends.map((trend) => (
            <button
              key={trend.id}
              onClick={() => setScreen('explore')}
              className="min-w-[160px] p-4 rounded-2xl text-left border"
              style={{ background: 'white', borderColor: '#E5E5E0' }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: '#111111' }}>{trend.topic}</p>
              <p className="text-[11px] mb-3" style={{ color: '#5B8DEF' }}>
                {trend.count} {trend.description}
              </p>
              <span className="text-[10px] font-medium px-2 py-1 rounded-md" style={{ background: '#F0F0EB', color: '#555555' }}>
                Learn why
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 7. RECENT ACTIVITY */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: '#111111' }}>Recent activity</h3>
          <span className="text-[11px] font-medium" style={{ color: '#00D09C' }}>View all</span>
        </div>
        <div className="rounded-2xl overflow-hidden border" style={{ background: 'white', borderColor: '#E5E5E0' }}>
          {transactions.slice(0, 3).map((tx, i) => (
            <div 
              key={tx.id}
              className="flex items-center justify-between p-4"
              style={{ borderBottom: i < 2 ? '1px solid #F0F0EB' : 'none' }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: tx.type === 'sip' ? '#E6FAF5' : tx.type === 'goal' ? '#EBF3FF' : '#FFF8E6' }}
                >
                  {tx.type === 'sip' && <TrendingUp size={16} style={{ color: '#00D09C' }} />}
                  {tx.type === 'investment' && <ArrowUpRight size={16} style={{ color: '#5B8DEF' }} />}
                  {tx.type === 'goal' && <CircleDollarSign size={16} style={{ color: '#5B8DEF' }} />}
                  {tx.type === 'dividend' && <ArrowDownRight size={16} style={{ color: '#F5A623' }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111111' }}>{tx.title}</p>
                  <p className="text-[10px]" style={{ color: '#888888' }}>{tx.description}</p>
                </div>
              </div>
              <span className="text-sm font-bold number-display" style={{ color: '#111111' }}>
                {formatCurrency(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. LEARNING / INSIGHT */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#111111' }}>Learn without the noise</h3>
        <button 
          onClick={() => setAiOpen(true)}
          className="w-full text-left p-4 rounded-2xl border"
          style={{ background: '#F0F0EB', borderColor: '#E5E5E0' }}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: '#111111', color: 'white' }}>
                BASICS
              </span>
              <p className="text-sm font-bold mb-1" style={{ color: '#111111' }}>What exactly is an ETF?</p>
              <p className="text-xs" style={{ color: '#555555' }}>Like a mutual fund, but trades like a stock.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
              <Sparkles size={14} style={{ color: '#00D09C' }} />
            </div>
          </div>
        </button>
      </div>

    </div>
  );
}
