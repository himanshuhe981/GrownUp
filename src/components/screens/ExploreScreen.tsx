'use client';

import { useAppStore } from '@/lib/store';
import { exploreCategories, learnArticles, mockInvestmentOptions } from '@/lib/data';
import { Search, Sparkles, Users, BookOpen, Clock, ChevronRight, TrendingUp, HelpCircle } from 'lucide-react';

export function ExploreScreen() {
  const { setAiOpen, circleTrends } = useAppStore();

  return (
    <div className="px-5 pt-14 pb-8">
      {/* Header & Search */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-[28px] font-bold tracking-tight mb-2" style={{ color: '#111111' }}>
          Explore
        </h1>
        <p className="text-[14px]" style={{ color: '#888888' }}>
          What are you curious about?
        </p>
      </div>

      <div className="relative mb-6 animate-slide-up">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} style={{ color: '#888888' }} />
        </div>
        <input 
          type="text" 
          placeholder="Search investments or topics..." 
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[14px] outline-none"
          style={{ background: 'white', border: '1px solid #E5E5E0', color: '#111111' }}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-5 px-5 phone-scroll mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {exploreCategories.filter(c => c.id !== 'learning').map((cat) => (
          <button
            key={cat.id}
            className="shrink-0 px-4 py-2.5 rounded-xl border text-[13px] font-semibold whitespace-nowrap transition-all duration-200 active:scale-95"
            style={{ background: 'white', borderColor: '#E5E5E0', color: '#111111' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* AI Help */}
      <button 
        onClick={() => setAiOpen(true)}
        className="w-full flex items-center justify-between p-4 rounded-2xl mb-8 animate-slide-up border transition-all active:scale-[0.98]"
        style={{ background: '#F0F0EB', borderColor: '#E5E5E0' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <HelpCircle size={16} style={{ color: '#5B8DEF' }} />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-bold text-[#111111]">Not sure what you're looking for?</p>
            <p className="text-[11px] text-[#555555]">Ask Groww AI to guide you.</p>
          </div>
        </div>
        <Sparkles size={16} style={{ color: '#00D09C' }} />
      </button>

      {/* TRENDING IN YOUR CIRCLE */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} style={{ color: '#5B8DEF' }} />
          <h3 className="text-[14px] font-bold" style={{ color: '#111111' }}>Trending in your Circle</h3>
        </div>
        
        <div className="space-y-3">
          {circleTrends.map((trend) => (
            <div
              key={trend.id}
              className="p-4 rounded-2xl border flex items-center justify-between"
              style={{ background: 'white', borderColor: '#E5E5E0' }}
            >
              <div>
                <p className="text-[14px] font-bold mb-1" style={{ color: '#111111' }}>{trend.topic}</p>
                <p className="text-[11px]" style={{ color: '#5B8DEF' }}>
                  {trend.count} {trend.description}
                </p>
              </div>
              <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors" style={{ background: '#F0F0EB', color: '#111111' }}>
                Learn why
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LEARN WITHOUT THE NOISE */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-[14px] font-bold mb-4" style={{ color: '#111111' }}>Learn without the noise</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 phone-scroll">
          {learnArticles.map((article) => (
            <div
              key={article.id}
              className="shrink-0 w-[240px] flex flex-col p-4 rounded-2xl border relative overflow-hidden"
              style={{ background: 'white', borderColor: '#E5E5E0' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#00D09C' }} />
              
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md self-start mb-3 uppercase tracking-wider" style={{ background: '#F0F0EB', color: '#555555' }}>
                {article.category}
              </span>
              
              <h4 className="text-[15px] font-bold mb-1.5 leading-snug" style={{ color: '#111111' }}>
                {article.title}
              </h4>
              <p className="text-[12px] mb-4 text-[#555555] line-clamp-2">
                {article.subtitle}
              </p>
              
              <div className="mt-auto flex items-center gap-1.5 pt-3 border-t" style={{ borderColor: '#F0F0EB' }}>
                <Clock size={12} style={{ color: '#888888' }} />
                <span className="text-[10px]" style={{ color: '#888888' }}>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPULAR RIGHT NOW */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-[14px] font-bold mb-4" style={{ color: '#111111' }}>Popular right now</h3>
        <div className="space-y-3">
          {mockInvestmentOptions.slice(0, 3).map((opt) => (
            <div 
              key={opt.id}
              className="p-4 rounded-2xl border"
              style={{ background: 'white', borderColor: '#E5E5E0' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F7F7F2]"
                  >
                    <TrendingUp size={18} style={{ color: '#00D09C' }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#111111]">{opt.name}</p>
                    <p className="text-[11px] text-[#888888]">{opt.category}</p>
                  </div>
                </div>
                {opt.returns1Y && (
                  <span className="text-[13px] font-bold text-[#00D09C]">
                    {opt.returns1Y} <span className="text-[10px] font-normal text-[#888888]">1Y</span>
                  </span>
                )}
              </div>
              
              <p className="text-[12px] text-[#555555] mb-3 leading-relaxed">
                {opt.description}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2 py-1 rounded-md" style={{ 
                  background: opt.risk === 'Low' ? '#E6FAF5' : opt.risk === 'Moderate' ? '#F7F7F2' : '#FFF0F0',
                  color: opt.risk === 'Low' ? '#00B386' : opt.risk === 'Moderate' ? '#555555' : '#EB5757',
                }}>
                  {opt.risk} risk
                </span>
                <span className="text-[10px] font-medium text-[#888888] px-2 py-1 rounded-md" style={{ background: '#F7F7F2' }}>
                  Min. ₹{opt.minInvestment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
