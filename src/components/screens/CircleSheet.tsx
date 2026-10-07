'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { X, Users, Plus, UserPlus, TrendingUp, ChevronRight, Lock } from 'lucide-react';

export function CircleSheet() {
  const { setCircleOpen, circleTrends, circleActivity } = useAppStore();
  const [view, setView] = useState<'main' | 'create' | 'join'>('main');
  const [joinCode, setJoinCode] = useState('');
  const [inCircle, setInCircle] = useState(false); // mock state for demo

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up bg-[#F7F7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-[#E5E5E0]">
        <div className="w-9" />
        <h2 className="text-base font-semibold text-[#111111]">
          {view === 'main' ? 'Your Circle' : view === 'create' ? 'Create a Circle' : 'Join a Circle'}
        </h2>
        <button 
          onClick={() => {
            if (view === 'main') setCircleOpen(false);
            else setView('main');
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E5E5E0]"
        >
          <X size={18} className="text-[#111111]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 phone-scroll">
        
        {view === 'main' && (
          <div className="px-5 py-6 space-y-6">
            {!inCircle ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#EBF3FF] flex items-center justify-center mx-auto mb-4">
                  <Users size={28} className="text-[#5B8DEF]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#111111] mb-2">Investing is better together</h3>
                <p className="text-[13px] text-[#555555] mb-8">
                  Join a small group of friends or family to see what's trending and build habits.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => setView('join')}
                    className="w-full py-3.5 bg-[#111111] text-white rounded-xl text-[14px] font-bold active:scale-[0.98]"
                  >
                    Join a Circle
                  </button>
                  <button 
                    onClick={() => setView('create')}
                    className="w-full py-3.5 bg-white text-[#111111] border border-[#E5E5E0] rounded-xl text-[14px] font-bold active:scale-[0.98]"
                  >
                    Create a Circle
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6 p-5 bg-white rounded-[24px] border border-[#E5E5E0]">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#111111] mb-1">College Money Circle</h3>
                    <p className="text-[12px] text-[#888888]">5 members • 3 online</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-[#F0F0EB] border-2 border-white flex items-center justify-center">
                        <Users size={12} className="text-[#888888]" />
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4 text-[#888888]">Recent Activity</h3>
                <div className="space-y-3 mb-8">
                  {circleActivity.map(act => (
                    <div key={act.id} className="p-4 bg-white rounded-2xl border border-[#E5E5E0] flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                        <TrendingUp size={14} className="text-[#5B8DEF]" />
                      </div>
                      <div>
                        <p className="text-[13px] text-[#111111]">
                          <span className="font-bold">{act.user}</span> {act.action}
                        </p>
                        <p className="text-[11px] text-[#888888]">{act.context} • {act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'create' && (
          <div className="px-5 py-6">
            <h3 className="text-[22px] font-bold text-[#111111] mb-2">Create your Circle</h3>
            <p className="text-[14px] text-[#555555] mb-8">Invite friends to learn and discover together.</p>

            <div className="p-6 bg-white rounded-[24px] border border-[#E5E5E0] text-center mb-8">
              <p className="text-[11px] font-bold tracking-widest uppercase mb-2 text-[#888888]">YOUR JOIN CODE</p>
              <p className="text-[32px] font-black tracking-widest text-[#111111]">AB7K9</p>
            </div>

            <button 
              onClick={() => {
                setInCircle(true);
                setView('main');
              }}
              className="w-full py-4 bg-[#00D09C] text-white rounded-xl text-[15px] font-bold active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        )}

        {view === 'join' && (
          <div className="px-5 py-6">
            <h3 className="text-[22px] font-bold text-[#111111] mb-2">Join a Circle</h3>
            <p className="text-[14px] text-[#555555] mb-8">Enter the 5-digit code from your friend.</p>

            <input 
              type="text" 
              placeholder="e.g. AB7K9"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              maxLength={5}
              className="w-full p-5 text-center text-[24px] font-bold tracking-widest bg-white border border-[#E5E5E0] rounded-[24px] mb-8 outline-none focus:border-[#00D09C]"
            />

            <button 
              onClick={() => {
                setInCircle(true);
                setView('main');
              }}
              disabled={joinCode.length < 5}
              className="w-full py-4 bg-[#00D09C] text-white rounded-xl text-[15px] font-bold active:scale-[0.98] disabled:opacity-50"
            >
              Join
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
