import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Terminal } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'IT Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'lab', label: 'Creative Lab' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick(750, 0.04);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      backgroundColor: 'rgba(255, 219, 218, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid var(--color-taupe-grey)',
      boxShadow: '0 4px 12px rgba(96, 77, 83, 0.08)'
    }}>
      <div style={{
        width: '100%',
        margin: 0,
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
      }}>
        {/* Brand Wordmark Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 8px',
          }}
          title="reeee.dev home"
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            borderRadius: '9px',
            backgroundColor: 'var(--color-old-rose)',
            color: 'var(--color-soft-blush)',
            border: '2px solid var(--color-taupe-grey)',
            boxShadow: '2px 2px 0px var(--color-taupe-grey)',
          }}>
            <Sparkles size={16} className="animate-sparkle" />
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--color-taupe-grey)',
          }}>
            reeee.dev
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flex: 1,
          minWidth: 0,
          gap: '4px',
        }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '7px 10px',
                  flex: 1,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '2px solid var(--color-taupe-grey)' : '2px solid transparent',
                  backgroundColor: isActive ? 'var(--color-old-rose)' : 'transparent',
                  color: isActive ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                  boxShadow: isActive ? '2px 2px 0px var(--color-taupe-grey)' : 'none',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions: Audio Toggle & Quick Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '8px', flexShrink: 0 }}>
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Sound muted (click to enable retro chimes)' : 'Sound enabled'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isMuted ? 'var(--color-pale-slate)' : 'var(--color-soft-blush)',
              border: '1.5px solid var(--color-taupe-grey)',
              boxShadow: '2px 2px 0px var(--color-taupe-grey)',
              color: 'var(--color-taupe-grey)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} color="var(--color-old-rose)" />}
            <span style={{ fontFamily: 'var(--font-mono)' }}>{isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          {/* Quick Terminal Launcher Indicator */}
          <button
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                const term = document.getElementById('hero-terminal');
                if (term) term.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            title="Jump to System Terminal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-pale-slate)',
              border: '1.5px solid var(--color-taupe-grey)',
              boxShadow: '2px 2px 0px var(--color-taupe-grey)',
              fontSize: '0.78rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
            }}
          >
            <Terminal size={13} />
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#52b788',
              boxShadow: '0 0 5px #52b788'
            }}></span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--color-taupe-grey)',
              backgroundColor: 'var(--color-pale-slate)',
              boxShadow: '2px 2px 0px var(--color-taupe-grey)',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={{
          padding: '14px 18px',
          backgroundColor: 'var(--color-pale-slate)',
          borderTop: '2px solid var(--color-taupe-grey)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: activeTab === item.id ? '2px solid var(--color-taupe-grey)' : '1px solid rgba(96, 77, 83, 0.15)',
                backgroundColor: activeTab === item.id ? 'var(--color-old-rose)' : 'var(--color-soft-blush)',
                color: activeTab === item.id ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Media query styling */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
