import React from 'react';
import { Shield, Heart, Sparkles, Cloud, Terminal, Cpu, Zap, Code2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const MarqueeBanner: React.FC = () => {
  const items = [
    { label: 'Curious By Nature', icon: Sparkles },
    { label: 'Retro Pixels & Digital Dreams', icon: Heart },
    { label: 'Code • Create • Experiment', icon: Code2 },
    { label: 'Building For The Web', icon: Cloud },
    { label: 'Always Learning Something New', icon: Terminal },
    { label: 'Logic Meets Creativity', icon: Cpu },
    { label: 'Turning Ideas Into Projects', icon: Zap },
    { label: 'Powered By Curiosity', icon: Shield },
  ];

  // Duplicate items array to make a seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--color-pale-slate)',
      borderTop: '2px solid var(--color-taupe-grey)',
      borderBottom: '2px solid var(--color-taupe-grey)',
      padding: '12px 0',
      overflow: 'hidden',
      position: 'relative',
      userSelect: 'none',
    }}
    className="marquee-container"
    >
      <div style={{
        display: 'flex',
        width: 'max-content',
        gap: '16px',
        animation: 'marquee-scroll 24s linear infinite',
      }}
      className="marquee-track"
      >
        {duplicatedItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => soundEngine.playClick(600 + (idx % 8) * 40, 0.03)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-soft-blush)',
                border: '1.5px solid var(--color-taupe-grey)',
                boxShadow: '2px 2px 0px var(--color-taupe-grey)',
                color: 'var(--color-taupe-grey)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
              }}
            >
              <Icon size={14} color="var(--color-old-rose)" />
              <span>{item.label}</span>
              <span style={{ color: 'var(--color-old-rose)', opacity: 0.8, marginLeft: '4px' }}>✦</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
