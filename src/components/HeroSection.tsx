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
      output: 'SYSTEM: ALL_SERVICES_NOMINAL\nUPTIME: 99.98%\nEDGE: Cloudflare Pages Subdomain Ready\nSECURITY: Zero-Trust Strict Enforced'
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
        res = 'reeee.dev :: Full-Stack IT Systems Specialist & Creative Web Developer.';
        break;
      case 'tech':
      case 'skills':
        res = 'CORE STACK: [React 19, TypeScript, Vite, Linux/Bash, PowerShell, Cloudflare Workers, Docker, Vanilla CSS tokens]';
        break;
      case 'ping':
      case 'ping 8.8.8.8':
        res = '64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=4.21 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=4.08 ms\n--- 0.0% packet loss ---';
        break;
      case 'palette':
        res = 'Active Palette: #FFDBDA (Soft Blush), #DB7F8E (Old Rose), #D5C5C8 (Pale Slate), #9DA3A4 (Cool Steel), #604D53 (Taupe Grey)';
        break;
      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;
      case 'help':
        res = 'Available commands: status, whoami, skills, ping, palette, clear';
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
      padding: '48px 24px 64px',
      maxWidth: '1200px',
      margin: '0 auto',
      overflow: 'hidden',
    }}>
      {/* Decorative Y2K Background Sparkles */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '40px',
        color: 'var(--color-old-rose)',
        opacity: 0.7,
        pointerEvents: 'none',
      }}>
        <Sparkles size={36} className="animate-sparkle" />
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#52b788',
                display: 'inline-block',
                boxShadow: '0 0 6px #52b788',
              }}></span>
              reeee.dev • Online &amp; Systems Nominal
            </span>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)' }}>
              <Cloud size={13} color="var(--color-old-rose)" /> Cloudflare Ready
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: '20px',
            color: 'var(--color-taupe-grey)',
            letterSpacing: '-0.03em',
          }}>
            Systems rigor.<br />
            <span style={{
              color: 'var(--color-old-rose)',
              position: 'relative',
              display: 'inline-block',
            }}>
              Romantic web craft.
            </span>
          </h1>

          {/* Subtitle / Bio */}
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.65,
            color: 'var(--color-taupe-grey)',
            maxWidth: '560px',
            marginBottom: '28px',
          }}>
            I'm a full-stack IT specialist and creative engineer. At <strong style={{ color: 'var(--color-taupe-grey)' }}>reeee.dev</strong>, I combine hardened infrastructure (Linux, networking, zero-trust security) with playful, nostalgic interactive web experiences.
          </p>

          {/* Call to Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '32px',
          }}>
            <button
              onClick={() => {
                soundEngine.playClick(700, 0.05);
                onNavigateToProjects();
              }}
              className="retro-btn"
            >
              Explore Projects
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle();
                onNavigateToLab();
              }}
              className="retro-btn retro-btn-secondary"
            >
              <Sparkles size={16} color="var(--color-old-rose)" />
              Creative Lab 🧪
            </button>

            <button
              onClick={handleCopyEmail}
              className="retro-btn retro-btn-secondary"
              title="Copy hello@reeee.dev"
            >
              {copied ? <Check size={16} color="#2b9348" /> : <Copy size={16} />}
              <span>{copied ? 'Copied Email! ✨' : 'hello@reeee.dev'}</span>
            </button>
          </div>

          {/* Decorative Y2K Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)' }}>
              <Shield size={12} /> Zero-Trust Mindset
            </span>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)' }}>
              <Heart size={12} color="var(--color-old-rose)" /> Retro Y2K Aesthetic
            </span>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)' }}>
              <Sparkles size={12} /> TypeScript &amp; React 19
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Retro Terminal Widget */}
        <div id="hero-terminal" className="retro-box" style={{
          backgroundColor: 'var(--color-pale-slate)',
          padding: '0',
          overflow: 'hidden',
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
            minHeight: '230px',
            maxHeight: '300px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            backgroundColor: '#2b2326', // Deep taupe for retro terminal interior
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
                placeholder="type 'help', 'status', 'ping'..."
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
            <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-taupe-grey)' }}>
              QUICK CMD:
            </span>
            {['status', 'whoami', 'skills', 'ping', 'palette', 'clear'].map((cmd) => (
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

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
};
