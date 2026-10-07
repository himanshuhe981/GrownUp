'use client';

import { useAppStore } from '@/lib/store';
import { mockUser, mockChartData, formatCurrency, formatCompactCurrency, mockInvestmentOptions, learnArticles, exploreCategories } from '@/lib/data';
import { 
  Home, Search, Target, BarChart3, Plus, Bell, Sparkles, 
  TrendingUp, CircleDollarSign, BookOpen, ArrowUpRight, ArrowDownRight,
  Shield, Plane, Clock, ChevronRight, Settings, User, LogOut,
  PieChart, BarChart2, Layers, CircleDot, Users, CheckCircle2, Flame, ArrowRight, HelpCircle, Activity
} from 'lucide-react';
import { MiniChart } from './ui/MiniChart';
import { InvestFlow } from './screens/InvestFlow';
import { AIChat } from './screens/AIChat';
import { NotificationsPanel } from './ui/NotificationsPanel';
import { GoalCreation } from './screens/GoalCreation';
import type { AppScreen } from '@/lib/types';
import { useState } from 'react';

const categoryIcons: Record<string, typeof PieChart> = {
  'pie-chart': PieChart,
  'bar-chart-2': BarChart2,
  'layers': Layers,
  'trending-up': TrendingUp,
  'circle-dot': CircleDot,
  'book-open': BookOpen,
};

export function DesktopApp() {
  const {
    currentScreen, setScreen,
    portfolioValue, portfolioGain,
    goals, holdings,
    transactions, notifications,
    chartPeriod, setChartPeriod,
    setAiOpen, setInvestFlowOpen, setNotificationsOpen, setGoalCreationOpen,
    investFlowOpen, aiOpen, notificationsOpen, goalCreationOpen,
    onboardingComplete, completeOnboarding,
    moneyFitness, circleTrends
  } = useAppStore();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const unreadCount = notifications.filter(n => !n.read).length;

  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.current, 0);

  if (!onboardingComplete) {
    completeOnboarding();
  }

  const navItems: { id: AppScreen; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#F7F7F2' }}>
      {/* Sidebar Navigation */}
      <aside 
        className="w-[260px] shrink-0 flex flex-col h-screen sticky top-0 px-5 py-6 z-10"
        style={{ borderRight: '1px solid #E5E5E0', background: 'white' }}
      >
        <div className="mb-8 pl-2">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#111111' }}>
            Grown<span style={{ color: '#00D09C' }}>Up</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-1.5" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive ? '#111111' : 'transparent',
                  color: isActive ? 'white' : '#555555',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => setInvestFlowOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold mt-6 transition-all duration-200 active:scale-[0.98]"
            style={{ background: '#00D09C', color: 'white' }}
          >
            <Plus size={18} strokeWidth={2.5} />
            Invest
          </button>
        </nav>

        <div className="space-y-1.5 pt-4 border-t border-[#F0F0EB]">
          <button
            onClick={() => setAiOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 hover:bg-[#F0F0EB]"
            style={{ color: '#555555' }}
          >
            <Sparkles size={18} />
            Ask AI
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold hover:bg-[#F0F0EB]" style={{ color: '#555555' }}>
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="mt-4 pt-4 flex items-center gap-3 border-t border-[#F0F0EB] px-2">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: '#111111', color: 'white' }}
          >
            {mockUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold truncate" style={{ color: '#111111' }}>{mockUser.name}</p>
            <p className="text-[11px]" style={{ color: '#888888' }}>{mockUser.location}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden relative">
        <header 
          className="shrink-0 flex items-center justify-between px-10 py-6"
        >
          <div>
            <h2 className="text-xl font-bold" style={{ color: '#111111' }}>
              {greeting}, {mockUser.name}
            </h2>
            <p className="text-sm" style={{ color: '#888888' }}>Let&apos;s make your money move.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-sm"
              style={{ background: 'white', color: '#111111', border: '1px solid #E5E5E0' }}
            >
              <Sparkles size={16} style={{ color: '#00D09C' }} />
              Ask Groww AI
            </button>
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="relative w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ background: 'white', border: '1px solid #E5E5E0' }}
              aria-label="Notifications"
            >
              <Bell size={18} style={{ color: '#111111' }} />
              {unreadCount > 0 && (
                <div 
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: '#EB5757', color: 'white' }}
                >
                  {unreadCount}
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto desktop-scroll px-10 pb-10">
          
          {/* HOME */}
          {currentScreen === 'home' && (
            <div className="animate-fade-in max-w-[1000px] mx-auto">
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Portfolio value - spans 2 cols */}
                <div 
                  className="col-span-2 p-8 rounded-[24px]"
                  style={{ background: 'white', border: '1px solid #E5E5E0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
                >
                  <p className="text-sm font-medium mb-1 uppercase tracking-widest text-[#888888]">Total portfolio value</p>
                  <p className="text-[54px] font-bold leading-none number-display mb-2 text-[#111111] tracking-tight">
                    {formatCurrency(portfolioValue)}
                  </p>
                  <div className="flex items-center gap-2 mb-8">
                    <ArrowUpRight size={18} style={{ color: '#00D09C' }} />
                    <span className="text-[16px] font-bold" style={{ color: '#00D09C' }}>+{formatCurrency(portfolioGain)}</span>
                    <span className="text-sm text-[#888888]">all time</span>
                  </div>
                  
                  <div className="h-[220px] mb-4">
                    <MiniChart data={mockChartData[chartPeriod] || mockChartData['1Y']} height={220} />
                  </div>
                  
                  <div className="flex gap-2 p-1.5 rounded-xl bg-[#F0F0EB] w-fit">
                    {['1D', '1W', '1M', '1Y', 'ALL'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setChartPeriod(period)}
                        className="px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                        style={{
                          background: chartPeriod === period ? 'white' : 'transparent',
                          color: chartPeriod === period ? '#111111' : '#888888',
                          boxShadow: chartPeriod === period ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                        }}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right column: Fitness + Actions */}
                <div className="space-y-6">
                  {/* Money Fitness block */}
                  <div className="p-6 rounded-[24px]" style={{ background: 'white', border: '1px solid #E5E5E0' }}>
                    <h3 className="text-[15px] font-bold mb-4 text-[#111111]">Your Money Fitness</h3>
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#F0F0EB]">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FFF4E5]">
                        <Flame size={24} style={{ color: '#F5A623' }} />
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-[#111111]">{moneyFitness.streakMonths} months</p>
                        <p className="text-xs text-[#888888]">investing streak</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} style={{ color: '#00D09C', marginTop: '2px' }} />
                        <p className="text-[13px] font-bold text-[#111111]">SIP completed this month</p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} style={{ color: '#00D09C', marginTop: '2px' }} />
                        <p className="text-[13px] font-bold text-[#111111]">{goals.length} goals progressing</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Invest', icon: CircleDollarSign, action: () => setInvestFlowOpen(true), color: '#00D09C' },
                      { label: 'Start SIP', icon: TrendingUp, action: () => setInvestFlowOpen(true), color: '#5B8DEF' },
                      { label: 'Explore', icon: Search, action: () => setScreen('explore'), color: '#111111' },
                      { label: 'Learn', icon: BookOpen, action: () => setScreen('explore'), color: '#8B5CF6' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-[20px] transition-all border hover:border-[#111111]"
                        style={{ background: 'white', borderColor: '#E5E5E0' }}
                      >
                        <item.icon size={22} style={{ color: item.color }} />
                        <span className="text-[12px] font-bold" style={{ color: '#555555' }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom row: Trending + Activity */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-base font-bold mb-4 text-[#111111]">Recent activity</h3>
                  <div className="rounded-[24px] border overflow-hidden" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                    {transactions.slice(0, 4).map((tx, i) => (
                      <div key={tx.id} className="flex items-center justify-between p-5" style={{ borderBottom: i < 3 ? '1px solid #F0F0EB' : 'none' }}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tx.type === 'sip' ? '#E6FAF5' : tx.type === 'goal' ? '#EBF3FF' : '#FFF8E6' }}>
                            {tx.type === 'sip' && <TrendingUp size={18} style={{ color: '#00D09C' }} />}
                            {tx.type === 'investment' && <ArrowUpRight size={18} style={{ color: '#5B8DEF' }} />}
                            {tx.type === 'goal' && <CircleDollarSign size={18} style={{ color: '#5B8DEF' }} />}
                            {tx.type === 'dividend' && <ArrowDownRight size={18} style={{ color: '#F5A623' }} />}
                          </div>
                          <div>
                            <p className="text-[15px] font-bold text-[#111111]">{tx.title}</p>
                            <p className="text-xs text-[#888888]">{tx.description} · {tx.date}</p>
                          </div>
                        </div>
                        <span className="text-[15px] font-bold number-display text-[#111111]">{formatCurrency(tx.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold mb-4 text-[#111111] flex items-center gap-2">
                    <Users size={18} style={{ color: '#5B8DEF' }} /> Trending in your Circle
                  </h3>
                  <div className="space-y-3">
                    {circleTrends.map((trend) => (
                      <div key={trend.id} className="p-5 rounded-[24px] border" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                        <p className="text-[15px] font-bold mb-1 text-[#111111]">{trend.topic}</p>
                        <p className="text-[12px] text-[#5B8DEF] mb-4">
                          {trend.count} {trend.description}
                        </p>
                        <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#F0F0EB] text-[#111111]">
                          Learn why
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXPLORE */}
          {currentScreen === 'explore' && (
            <div className="animate-fade-in max-w-[1000px] mx-auto">
              <div className="mb-8">
                <h1 className="text-[36px] font-bold tracking-tight mb-2" style={{ color: '#111111' }}>Explore</h1>
                <p className="text-[15px]" style={{ color: '#888888' }}>What are you curious about?</p>
              </div>

              <div className="relative mb-8 max-w-[600px]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} style={{ color: '#888888' }} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search investments, topics, or ask AI..." 
                  className="w-full pl-12 pr-4 py-4 rounded-[20px] text-[15px] outline-none shadow-sm"
                  style={{ background: 'white', border: '1px solid #E5E5E0', color: '#111111' }}
                />
              </div>

              <div className="grid grid-cols-6 gap-4 mb-10">
                {exploreCategories.map((cat) => {
                  const Icon = categoryIcons[cat.icon] || BookOpen;
                  return (
                    <button key={cat.id} className="flex flex-col items-center p-5 rounded-[24px] transition-all hover:-translate-y-1 hover:shadow-md border border-[#E5E5E0] bg-white">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#F0F0EB' }}>
                        <Icon size={24} style={{ color: '#555555' }} />
                      </div>
                      <span className="text-[13px] font-bold text-center" style={{ color: '#111111' }}>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-5 text-[#111111]">Popular right now</h3>
                  <div className="space-y-4">
                    {mockInvestmentOptions.map((opt) => (
                      <div key={opt.id} className="p-6 rounded-[24px] border" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F7F7F2]">
                              <TrendingUp size={20} style={{ color: '#00D09C' }} />
                            </div>
                            <div>
                              <p className="text-base font-bold text-[#111111]">{opt.name}</p>
                              <p className="text-[13px] text-[#888888]">{opt.category}</p>
                            </div>
                          </div>
                          {opt.returns1Y && (
                            <span className="text-[15px] font-bold text-[#00D09C]">
                              {opt.returns1Y} <span className="text-[11px] font-normal text-[#888888]">1Y</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-[#555555] mb-4 leading-relaxed">
                          {opt.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg" style={{ 
                            background: opt.risk === 'Low' ? '#E6FAF5' : opt.risk === 'Moderate' ? '#F7F7F2' : '#FFF0F0',
                            color: opt.risk === 'Low' ? '#00B386' : opt.risk === 'Moderate' ? '#555555' : '#EB5757',
                          }}>
                            {opt.risk} risk
                          </span>
                          <span className="text-[11px] font-bold text-[#888888] px-3 py-1.5 rounded-lg bg-[#F7F7F2]">
                            Min. ₹{opt.minInvestment}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-5 text-[#111111]">Learn without the noise</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {learnArticles.map((article) => (
                      <div key={article.id} className="flex flex-col p-5 rounded-[24px] border relative overflow-hidden" style={{ background: 'white', borderColor: '#E5E5E0' }}>
                        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: '#00D09C' }} />
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-md self-start mb-3 uppercase tracking-widest bg-[#111111] text-white">
                          {article.category}
                        </span>
                        <h4 className="text-[16px] font-bold mb-2 leading-snug text-[#111111]">
                          {article.title}
                        </h4>
                        <p className="text-[13px] mb-4 text-[#555555]">
                          {article.subtitle}
                        </p>
                        <div className="mt-auto flex items-center gap-1.5 pt-4 border-t border-[#F0F0EB]">
                          <Clock size={14} style={{ color: '#888888' }} />
                          <span className="text-[12px] font-medium text-[#888888]">{article.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PORTFOLIO & GOALS */}
          {(currentScreen === 'portfolio' || currentScreen === 'goals') && (
            <div className="animate-fade-in max-w-[1000px] mx-auto">
              <div className="mb-8">
                <h1 className="text-[36px] font-bold tracking-tight mb-2 text-[#111111]">
                  {currentScreen === 'portfolio' ? 'Portfolio' : 'Goals'}
                </h1>
                <p className="text-[15px] text-[#888888]">
                  {currentScreen === 'portfolio' ? 'Your investments at a glance.' : 'What you are working towards.'}
                </p>
              </div>

              {currentScreen === 'portfolio' ? (
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-6">
                    <div className="p-8 rounded-[24px] border bg-white shadow-sm" style={{ borderColor: '#E5E5E0' }}>
                      <p className="text-[13px] font-bold text-[#888888] mb-1 uppercase tracking-widest">Current Value</p>
                      <p className="text-[54px] font-bold leading-none tracking-tight text-[#111111] mb-6">
                        {formatCurrency(portfolioValue)}
                      </p>
                      <div className="flex items-center justify-between pb-6 border-b border-[#F0F0EB]">
                        <div>
                          <p className="text-[13px] text-[#555555] mb-1">All time gain</p>
                          <div className="flex items-center gap-1.5">
                            <ArrowUpRight size={20} style={{ color: '#00D09C' }} />
                            <p className="text-[20px] font-bold text-[#00D09C]">+{formatCurrency(portfolioGain)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] text-[#555555] mb-1">Invested</p>
                          <p className="text-[20px] font-bold text-[#111111]">{formatCurrency(totalInvested)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-base font-bold text-[#111111] mb-4">My investments</h3>
                        <div className="space-y-4">
                          {holdings.map((holding) => {
                            const gain = holding.current - holding.invested;
                            const isPositive = gain >= 0;
                            return (
                              <div key={holding.id} className="p-4 rounded-xl border flex items-center justify-between hover:border-[#111111] transition-colors" style={{ background: '#F7F7F2', borderColor: '#E5E5E0' }}>
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm">
                                    <TrendingUp size={18} style={{ color: holding.type === 'Mutual Fund' ? '#00D09C' : '#5B8DEF' }} />
                                  </div>
                                  <div>
                                    <p className="text-[15px] font-bold text-[#111111]">{holding.name}</p>
                                    <p className="text-[12px] text-[#888888]">{holding.type}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-[16px] font-bold text-[#111111]">{formatCurrency(holding.current)}</p>
                                  <p className={`text-[12px] font-bold mt-0.5 ${isPositive ? 'text-[#00D09C]' : 'text-[#EB5757]'}`}>
                                    {isPositive ? '+' : ''}{formatCurrency(gain)}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-[24px] border bg-white" style={{ borderColor: '#E5E5E0' }}>
                      <h3 className="text-base font-bold text-[#111111] mb-4">Monthly check-in</h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl border flex flex-col justify-between" style={{ background: '#F7F7F2', borderColor: '#E5E5E0' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 size={16} style={{ color: '#00D09C' }} />
                            <span className="text-[14px] font-bold text-[#111111]">On track</span>
                          </div>
                          <p className="text-[12px] text-[#555555]">
                            {moneyFitness.streakMonths} months consistency streak
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border flex flex-col justify-between" style={{ background: '#F7F7F2', borderColor: '#E5E5E0' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 size={16} style={{ color: '#00D09C' }} />
                            <span className="text-[14px] font-bold text-[#111111]">SIPs paid</span>
                          </div>
                          <p className="text-[12px] text-[#555555]">
                            All contributions processed this month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  {goals.map((goal) => {
                    const percent = Math.round((goal.current / goal.target) * 100);
                    return (
                      <div key={goal.id} className="p-6 rounded-[24px] border bg-white" style={{ borderColor: '#E5E5E0' }}>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[18px] font-bold text-[#111111]">{goal.name}</p>
                          <span className="text-[14px] font-bold px-3 py-1 rounded-full bg-[#111111] text-white">
                            {percent}%
                          </span>
                        </div>
                        <p className="text-[28px] font-bold text-[#111111] mb-2">{formatCurrency(goal.current)}</p>
                        <p className="text-[14px] text-[#888888] mb-6">Target: {formatCurrency(goal.target)}</p>
                        <div className="w-full h-3 rounded-full bg-[#F0F0EB] overflow-hidden mb-4">
                          <div className="h-full rounded-full" style={{ width: `${percent}%`, background: '#00D09C' }} />
                        </div>
                        <div className="pt-4 border-t border-[#F0F0EB] flex justify-between items-center">
                          <p className="text-[13px] font-bold text-[#555555]">Contribution</p>
                          <p className="text-[14px] font-bold text-[#111111]">{formatCurrency(goal.monthlyContribution)}/mo</p>
                        </div>
                      </div>
                    );
                  })}
                  <button onClick={() => setGoalCreationOpen(true)} className="p-6 rounded-[24px] border-2 border-dashed border-[#E5E5E0] bg-transparent flex flex-col items-center justify-center min-h-[280px] hover:border-[#111111] hover:bg-white transition-all">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#111111] text-white mb-4">
                      <Plus size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-[16px] font-bold text-[#111111]">Create a new goal</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* AI Chat Drawer */}
      {aiOpen && (
        <div className="w-[420px] shrink-0 h-screen sticky top-0 bg-[#F7F7F2] border-l border-[#E5E5E0] shadow-2xl z-50">
          <div className="h-full relative overflow-hidden">
            <AIChat />
          </div>
        </div>
      )}

      {/* Modals */}
      {investFlowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-[420px] h-[700px] rounded-3xl overflow-hidden shadow-2xl relative">
            <InvestFlow />
          </div>
        </div>
      )}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-[420px] h-[700px] rounded-3xl overflow-hidden shadow-2xl relative">
            <NotificationsPanel />
          </div>
        </div>
      )}
      {goalCreationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-[420px] h-[700px] rounded-3xl overflow-hidden shadow-2xl relative">
            <GoalCreation />
          </div>
        </div>
      )}
    </div>
  );
}
