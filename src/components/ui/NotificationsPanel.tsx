'use client';

import { useAppStore } from '@/lib/store';
import { X, Bell, TrendingUp, Target, BookOpen, BarChart3 } from 'lucide-react';

const notificationIcons: Record<string, typeof Bell> = {
  'SIP Executed': TrendingUp,
  'Goal Milestone': Target,
  'Market Update': BarChart3,
  'Learning': BookOpen,
};

export function NotificationsPanel() {
  const { notifications, markNotificationRead, setNotificationsOpen } = useAppStore();

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col animate-fade-in"
      style={{ background: '#F7F7F2' }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-5 pt-14 pb-4"
        style={{ borderBottom: '1px solid #E5E5E0' }}
      >
        <h2 className="text-lg font-bold" style={{ color: '#111111' }}>Notifications</h2>
        <button 
          onClick={() => setNotificationsOpen(false)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'white', border: '1px solid #E5E5E0' }}
          aria-label="Close notifications"
        >
          <X size={18} style={{ color: '#111111' }} />
        </button>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 phone-scroll">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div 
              className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: '#F0F0EB' }}
            >
              <Bell size={24} style={{ color: '#888888' }} />
            </div>
            <p className="text-sm font-medium" style={{ color: '#555555' }}>No notifications yet</p>
            <p className="text-xs mt-1" style={{ color: '#888888' }}>We&apos;ll let you know when something happens.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification, i) => {
              const Icon = notificationIcons[notification.title] || Bell;
              return (
                <button
                  key={notification.id}
                  onClick={() => markNotificationRead(notification.id)}
                  className="w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.99] animate-slide-up"
                  style={{ 
                    background: notification.read ? 'white' : '#E6FAF5',
                    border: `1px solid ${notification.read ? '#E5E5E0' : 'rgba(0,208,156,0.2)'}`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: notification.read ? '#F0F0EB' : 'rgba(0,208,156,0.15)' }}
                  >
                    <Icon size={16} style={{ color: notification.read ? '#888888' : '#00D09C' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold" style={{ color: '#111111' }}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#00D09C' }} />
                      )}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>
                      {notification.message}
                    </p>
                    <p className="text-[10px] mt-1.5" style={{ color: '#888888' }}>
                      {notification.time}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
