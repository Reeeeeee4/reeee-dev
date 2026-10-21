import React from 'react';
import { Sparkles, Cloud, ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    soundEngine.playClick(600, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const palette = [
    { name: 'Soft Blush', hex: '#FFDBDA' },
    { name: 'Old Rose', hex: '#DB7F8E' },
    { name: 'Pale Slate', hex: '#D5C5C8' },
    { name: 'Cool Steel', hex: '#9DA3A4' },
    { name: 'Taupe Grey', hex: '#604D53' },
  ];

  return (
    <footer style={{
      borderTop: '2px solid var(--color-taupe-grey)',
      backgroundColor: 'var(--color-pale-slate)',
      padding: '48px 24px 36px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}>
        {/* Top Section */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          {/* Brand & Wordmark */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-old-rose)',
                color: 'var(--color-soft-blush)',
                border: '1.5px solid var(--color-taupe-grey)',
              }}>
                <Sparkles size={16} />
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--color-taupe-grey)',
                letterSpacing: '-0.02em',
              }}>
                reeee.dev
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-grey)', maxWidth: '420px', lineHeight: 1.5 }}>
              Personal IT systems &amp; web developer portfolio. Handcrafted with React, Vite &amp; TypeScript.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            {['Home', 'Projects', 'IT Skills', 'Experience', 'Creative Lab 🧪', 'Contact'].map((item) => {
              const id = item.toLowerCase().replace(/[^a-z]/g, '');
              const targetId = id.includes('creative') ? 'lab' : id.includes('itskills') ? 'skills' : id;
              return (
                <button
                  key={item}
                  onClick={() => {
                    soundEngine.playClick(700, 0.04);
                    onNavigate(targetId);
                  }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'var(--color-taupe-grey)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 6px',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="retro-btn retro-btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            title="Scroll to top of page"
          >
            <ArrowUp size={15} /> Top
          </button>
        </div>

        {/* Brand Colour Palette Swatches Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '16px 20px',
          backgroundColor: 'var(--color-soft-blush)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-taupe-grey)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-taupe-grey)' }}>
              OFFICIAL PALETTE TOKENS:
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            {palette.map((p) => (
              <div
                key={p.hex}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--color-pale-slate)',
                  border: '1px solid var(--color-taupe-grey)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-taupe-grey)',
                }}
              >
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: p.hex,
                  border: '1px solid var(--color-taupe-grey)',
                  display: 'inline-block',
                }}></span>
                <span>{p.name}</span>
                <span style={{ opacity: 0.7 }}>({p.hex})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Credits & Cloudflare Badge */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(96, 77, 83, 0.2)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-taupe-grey)',
        }}>
          <div>
            © {new Date().getFullYear()} <strong>reeee.dev</strong>. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)', fontSize: '0.72rem' }}>
              <Cloud size={12} color="var(--color-old-rose)" /> Cloudflare Pages Ready
            </span>
            <span>TypeScript + Vite</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
