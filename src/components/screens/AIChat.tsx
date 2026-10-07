'use client';

import { useAppStore } from '@/lib/store';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ArrowRight, Info } from 'lucide-react';

export function AIChat() {
  const { aiMessages, sendAiMessage, setAiOpen } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    'What is a SIP?',
    'Why is my portfolio down?',
    'What does risk mean?',
    'How do Index Funds work?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isTyping]);

  const handleSend = (message: string) => {
    if (!message.trim()) return;
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      sendAiMessage(message.trim());
      setIsTyping(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div 
      className="absolute inset-x-0 bottom-0 top-12 z-50 flex flex-col animate-slide-up rounded-t-3xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
      style={{ background: '#F7F7F2' }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-5 pt-5 pb-4 bg-white"
        style={{ borderBottom: '1px solid #E5E5E0' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            style={{ background: '#111111' }}
          >
            <Sparkles size={18} style={{ color: '#00D09C' }} />
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: '#111111' }}>Groww AI</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00D09C' }} />
              <p className="text-[10px] font-medium" style={{ color: '#888888' }}>Intelligent product guidance</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setAiOpen(false)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
          style={{ background: '#F0F0EB' }}
          aria-label="Close AI assistant"
        >
          <X size={18} style={{ color: '#111111' }} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 phone-scroll bg-[#F7F7F2]">
        {aiMessages.length === 0 && (
          <div className="animate-fade-in mb-8">
            <div className="mb-6 p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E5E5E0' }}>
              <div className="flex gap-3 mb-2">
                <Sparkles size={18} style={{ color: '#00D09C', marginTop: '2px' }} />
                <p className="text-sm font-semibold" style={{ color: '#111111' }}>
                  Hi Aarav. I can help you understand your money better.
                </p>
              </div>
              <p className="text-xs ml-7" style={{ color: '#555555' }}>
                I explain investing concepts simply, so you can decide what to do next.
              </p>
            </div>
            
            {/* Contextual prompt chips */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold tracking-wider mb-3 ml-1" style={{ color: '#888888' }}>SUGGESTED FOR YOU</p>
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] border"
                  style={{ background: 'white', borderColor: '#E5E5E0' }}
                >
                  <span className="text-sm font-medium" style={{ color: '#111111' }}>{q}</span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#F0F0EB' }}>
                    <ArrowRight size={12} style={{ color: '#555555' }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {aiMessages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-5 animate-slide-up ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div
              className={`max-w-[88%] ${msg.role === 'user' ? 'rounded-2xl rounded-tr-sm px-4 py-3' : 'rounded-3xl rounded-tl-sm p-4'}`}
              style={{
                background: msg.role === 'user' ? '#111111' : 'white',
                color: msg.role === 'user' ? 'white' : '#111111',
                border: msg.role === 'assistant' ? '1px solid #E5E5E0' : 'none',
                boxShadow: msg.role === 'assistant' ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
              }}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} style={{ color: '#00D09C' }} />
                  <span className="text-[10px] font-bold tracking-wider" style={{ color: '#888888' }}>AI EXPLANATION</span>
                </div>
              )}
              
              <p className="text-sm leading-relaxed whitespace-pre-line font-medium text-[#222222]">
                {msg.content}
              </p>
              
              {/* Context indicator if applicable */}
              {msg.role === 'assistant' && msg.content.includes('portfolio') && (
                <div className="mt-3 pt-3 flex items-start gap-2 border-t" style={{ borderColor: '#F0F0EB' }}>
                  <Info size={14} style={{ color: '#5B8DEF', marginTop: '1px' }} />
                  <p className="text-[10px]" style={{ color: '#555555' }}>
                    Based on your current portfolio allocation of 60% Mutual Funds.
                  </p>
                </div>
              )}

              {/* Suggestions */}
              {msg.role === 'assistant' && msg.suggestions && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="text-[11px] font-medium py-1.5 px-3 rounded-full border transition-all active:scale-95"
                      style={{ 
                        background: '#F0F0EB',
                        borderColor: '#E5E5E0',
                        color: '#111111'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-5 animate-fade-in">
            <div 
              className="rounded-3xl rounded-tl-sm px-5 py-4"
              style={{ background: 'white', border: '1px solid #E5E5E0' }}
            >
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#00D09C', animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#00D09C', animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#00D09C', animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div 
        className="px-5 py-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.02)]"
        style={{ borderTop: '1px solid #E5E5E0' }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 py-3.5 px-4 rounded-2xl text-sm outline-none transition-all duration-200 bg-[#F7F7F2]"
            style={{ 
              color: '#111111',
              border: '1px solid transparent'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#00D09C';
              e.currentTarget.style.background = 'white';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.background = '#F7F7F2';
            }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 disabled:opacity-40"
            style={{ background: input.trim() ? '#111111' : '#E5E5E0' }}
            aria-label="Send message"
          >
            <Send size={18} color="white" className={input.trim() ? 'ml-0.5' : ''} />
          </button>
        </form>
      </div>
    </div>
  );
}
