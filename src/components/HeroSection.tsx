import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles, Terminal as TerminalIcon, Cloud, Shield, Heart } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

interface HeroSectionProps {
  onNavigateToLab: () => void;
  onNavigateToProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToLab, onNavigateToProjects }) => {
  const [copied, setCopied] = useState(false);
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'reeee --status',
      output: 'SYSTEM: ALL_SERVICES_NOMINAL\nUPTIME: 99.98%\nEDGE: Cloudflare Pages Ready\nSTATUS: Building useful things & exploring the web'
    }
  ]);

  const handleCopyEmail = () => {
    soundEngine.playSparkle();
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const executeCommand = (cmdToRun: string) => {
    soundEngine.playClick(850, 0.05);
    const trimmed = cmdToRun.trim().toLowerCase();
    let res = '';

    switch (trimmed) {
      case 'status':
      case 'sys-status':
      case 'reeee --status':
        res = '🟢 ALL SYSTEMS OPTIMAL\n• Infrastructure: Edge CDN & Docker\n• DNS Resolution: 2.4ms avg\n• Memory Footprint: Lean (Zero Bloat)';
        break;
      case 'whoami':
        res = 'reeee.dev :: Developer who enjoys building useful things and exploring what the web can do.';
        break;
      case 'tech':
      case 'skills':
        res = 'CORE STACK: [React 19, TypeScript, Vite, Linux/Bash, PowerShell, Cloudflare Workers, Docker, Vanilla CSS tokens]';
        break;
      case 'ping':
      case 'ping 8.8.8.8':
        res = '64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=4.21 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=4.08 ms\n--- 0.0% packet loss ---';
        break;
      case 'email':
      case 'contact':
        res = `EMAIL: ${PORTFOLIO_INFO.email} (Ready for collaborations & projects)`;
        break;
      case 'palette':
        res = 'Active Palette: #FFDBDA (Soft Blush), #DB7F8E (Old Rose), #D5C5C8 (Pale Slate), #9DA3A4 (Cool Steel), #604D53 (Taupe Grey)';
        break;
      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;
      case 'help':
        res = 'Available commands: status, whoami, skills, ping, email, palette, clear';
        break;
      default:
        res = `Command not recognized: "${cmdToRun}". Type "help" or click command pills below.`;
    }

    setTermHistory((prev) => [...prev, { cmd: cmdToRun, output: res }]);
    setTermInput('');
  };

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    executeCommand(termInput);
  };

  return (
    <section style={{
      position: 'relative',
      padding: '44px 20px 64px',
      maxWidth: '1200px',
      margin: '0 auto',
      overflow: 'hidden',
    }}>
      {/* Decorative Y2K Background Sparkles */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '25px',
        color: 'var(--color-old-rose)',
        opacity: 0.7,
        pointerEvents: 'none',
      }}>
        <Sparkles size={32} className="animate-sparkle" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        alignItems: 'center',
      }} className="hero-grid">
        
        {/* Left Column: Introductions & Branding */}
        <div>
          {/* Status Pill Badge */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }} className="hero-status-row">
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#52b788',
                display: 'inline-block',
                boxShadow: '0 0 6px #52b788',
              }}></span>
              reeee.dev • Online
            </span>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)' }}>
              <Cloud size={13} color="var(--color-old-rose)" /> Cloudflare Ready
            </span>
          </div>

          {/* Big Headline with Distinct Font Sizing */}
          <h1 style={{
            lineHeight: 1.15,
            marginBottom: '20px',
            color: 'var(--color-taupe-grey)',
            letterSpacing: '-0.03em',
          }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 5.6vw, 4.3rem)',
              fontWeight: 800,
              color: 'var(--color-taupe-grey)',
              lineHeight: 1.1,
              marginBottom: '6px',
            }}>
              Code, creativity,
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(1.45rem, 3.2vw, 2.3rem)',
              fontWeight: 700,
              color: 'var(--color-old-rose)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}>
              and everything in between.
            </span>
          </h1>

          {/* Short Bio */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.12rem)',
            lineHeight: 1.65,
            color: 'var(--color-taupe-grey)',
            maxWidth: '580px',
            marginBottom: '28px',
          }}>
            Just a developer who enjoys building useful things and exploring what the web can do. At <strong style={{ color: 'var(--color-taupe-grey)' }}>reeee.dev</strong>, I share my projects, experiments, and the ideas I bring to life through code.
          </p>

          {/* Call to Action Buttons */}
          <div className="hero-cta-group">
            <button
              onClick={() => {
                soundEngine.playClick(700, 0.05);
                onNavigateToProjects();
              }}
              className="retro-btn hero-cta-btn-1"
            >
              <span>Explore Projects</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle();
                onNavigateToLab();
              }}
              className="retro-btn retro-btn-secondary hero-cta-btn-2"
            >
              <Sparkles size={16} color="var(--color-old-rose)" />
              <span>Creative Lab</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="retro-btn retro-btn-secondary hero-cta-btn-3"
              title={`Copy ${PORTFOLIO_INFO.email}`}
            >
              {copied ? <Check size={16} color="#2b9348" /> : <Copy size={16} />}
              <span>{copied ? 'Copied Email! ✨' : PORTFOLIO_INFO.email}</span>
            </button>
          </div>

          {/* 3 Mobile-Friendly Decorative Badges */}
          <div className="hero-badges-group">
            <span className="retro-pill hero-badge-item">
              <Shield size={12} color="var(--color-old-rose)" /> Zero-Trust Mindset
            </span>
            <span className="retro-pill hero-badge-item">
              <Heart size={12} color="var(--color-old-rose)" /> Retro Y2K Aesthetic
            </span>
            <span className="retro-pill hero-badge-item">
              <Sparkles size={12} color="var(--color-old-rose)" /> TypeScript &amp; React 19
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Retro Terminal Widget */}
        <div id="hero-terminal" className="retro-box" style={{
          backgroundColor: 'var(--color-pale-slate)',
          padding: '0',
          overflow: 'hidden',
          width: '100%',
        }}>
          {/* Window Title Bar */}
          <div style={{
            backgroundColor: 'var(--color-taupe-grey)',
            color: 'var(--color-soft-blush)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            fontWeight: 700,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TerminalIcon size={16} color="var(--color-old-rose)" />
              <span>reeee-os :: diagnostic_terminal.exe</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-cool-steel)' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-old-rose)' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-soft-blush)' }}></span>
            </div>
          </div>

          {/* Terminal Body */}
          <div style={{
            padding: '16px',
            minHeight: '210px',
            maxHeight: '280px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            backgroundColor: '#2b2326',
            color: 'var(--color-soft-blush)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ color: 'var(--color-cool-steel)', fontSize: '0.75rem', borderBottom: '1px dashed rgba(219, 127, 142, 0.3)', paddingBottom: '6px' }}>
              reeee.dev kernel 6.8.0-rt // type commands or tap shortcuts below
            </div>

            {termHistory.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', gap: '8px', color: 'var(--color-old-rose)', fontWeight: 600 }}>
                  <span>reeee@net:~$</span>
                  <span style={{ color: 'var(--color-soft-blush)' }}>{item.cmd}</span>
                </div>
                <pre style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  color: 'var(--color-pale-slate)',
                  fontSize: '0.8rem',
                  lineHeight: 1.45,
                }}>
                  {item.output}
                </pre>
              </div>
            ))}

            {/* Input Form */}
            <form onSubmit={handleTermSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
              <span style={{ color: 'var(--color-old-rose)', fontWeight: 700 }}>reeee@net:~$</span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="type 'help', 'email', 'skills'..."
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--color-soft-blush)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                }}
              />
            </form>
          </div>

          {/* Interactive Quick-Chip Buttons Bar */}
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'var(--color-pale-slate)',
            borderTop: '2px solid var(--color-taupe-grey)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-taupe-grey)' }}>
              CMD:
            </span>
            {['status', 'whoami', 'skills', 'email', 'palette', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-soft-blush)',
                  border: '1.5px solid var(--color-taupe-grey)',
                  color: 'var(--color-taupe-grey)',
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0px var(--color-taupe-grey)',
                  transition: 'all 0.1s ease',
                }}
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop: Buttons aligned in the same single column */
        .hero-cta-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 28px;
        }

        .hero-cta-btn-1,
        .hero-cta-btn-2,
        .hero-cta-btn-3 {
          width: auto;
          min-width: 200px;
          justify-content: flex-start;
          padding: 10px 20px !important;
        }

        .hero-badges-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .hero-badge-item {
          background-color: var(--color-soft-blush);
        }

        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }

        /* Mobile Layout: 2 buttons on top, 1 centered button on bottom */
        @media (max-width: 640px) {
          .hero-cta-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 24px;
            width: 100%;
          }

          .hero-cta-btn-1 {
            grid-column: 1;
            min-width: unset;
            justify-content: center;
            padding: 10px 12px !important;
            font-size: 0.88rem !important;
          }

          .hero-cta-btn-2 {
            grid-column: 2;
            min-width: unset;
            justify-content: center;
            padding: 10px 12px !important;
            font-size: 0.88rem !important;
          }

          .hero-cta-btn-3 {
            grid-column: 1 / -1;
            justify-self: center;
            width: 100%;
            max-width: 320px;
            justify-content: center;
            padding: 10px 16px !important;
            font-size: 0.88rem !important;
          }

          /* Mobile Badges: Clean, left-aligned matching the headline and text flow */
          .hero-badges-group {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 8px;
            width: 100%;
          }

          .hero-badge-item {
            font-size: 0.74rem !important;
            padding: 4px 10px !important;
          }

          .hero-status-row {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
