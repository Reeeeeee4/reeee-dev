import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Shield, Clock, MapPin } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleCopyEmail = () => {
    soundEngine.playSparkle();
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    soundEngine.playClick(800, 0.05);
    setStatus('submitting');

    setTimeout(() => {
      soundEngine.playSparkle();
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 700);
  };

  return (
    <section id="contact" style={{
      padding: '64px 24px 80px',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="retro-pill">
            <Sparkles size={12} color="var(--color-old-rose)" /> Get In Touch
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
          Let's Talk!
        </h2>
        <p style={{ maxWidth: '580px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: '1.05rem' }}>
          Have something in mind? Well, tell me about it :P
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px',
      }} className="contact-grid">

        {/* Left Column: Direct Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Main Direct Email Card */}
          <div className="retro-box" style={{
            padding: '24px',
            backgroundColor: 'var(--color-pale-slate)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-soft-blush)',
                border: '2px solid var(--color-taupe-grey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Mail size={18} color="var(--color-old-rose)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-taupe-grey)' }}>Direct Dispatch</h3>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-grey)', marginBottom: '16px' }}>
              Drop an email for the carrier pigeon
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: 'var(--color-soft-blush)',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--color-taupe-grey)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 700 }}>
                {PORTFOLIO_INFO.email}
              </span>

              <button
                onClick={handleCopyEmail}
                className="retro-btn"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} color="#52b788" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick IT Info Details */}
          <div className="retro-box" style={{
            padding: '24px',
            backgroundColor: 'var(--color-pale-slate)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} color="var(--color-old-rose)" />
              <span style={{ fontSize: '0.88rem' }}><strong>Response Time:</strong> Whenever I check my email</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="var(--color-old-rose)" />
              <span style={{ fontSize: '0.88rem' }}><strong>Base:</strong> Global Cloud / Remote</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={16} color="var(--color-old-rose)" />
              <span style={{ fontSize: '0.88rem' }}><strong>Security:</strong> PGP Encrypted communications supported</span>
            </div>
          </div>

          {/* Cloudflare Pages note */}
          <div style={{
            padding: '14px 18px',
            backgroundColor: 'rgba(255, 219, 218, 0.7)',
            borderRadius: 'var(--radius-md)',
            border: '1.5px dashed var(--color-taupe-grey)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-taupe-grey)',
          }}>
            ☁️ <strong>Hosting Strategy:</strong> Engineered for seamless deployment to Cloudflare Pages free tier with zero cold-starts.
          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="retro-box" style={{
          padding: '28px',
          backgroundColor: 'var(--color-pale-slate)',
        }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Send a Message</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-grey)', marginBottom: '20px' }}>
            Fill out the form below to initiate an inquiry. All fields are sanitized on client submission.
          </p>

          {status === 'success' ? (
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-soft-blush)',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-taupe-grey)',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>💌</span>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Message Dispatched!</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-grey)' }}>
                Thank you for reaching out to <strong>reeee.dev</strong>. I will get back to your inquiry promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  YOUR NAME:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Meow"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '0.95rem',
                    backgroundColor: 'var(--color-soft-blush)',
                    border: '1.5px solid var(--color-taupe-grey)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  YOUR EMAIL:
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="meow@email.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '0.95rem',
                    backgroundColor: 'var(--color-soft-blush)',
                    border: '1.5px solid var(--color-taupe-grey)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  SUBJECT:
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Meow Meow"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '0.95rem',
                    backgroundColor: 'var(--color-soft-blush)',
                    border: '1.5px solid var(--color-taupe-grey)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  YOUR MESSAGE:
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Meow meow meow meow..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '0.95rem',
                    backgroundColor: 'var(--color-soft-blush)',
                    border: '1.5px solid var(--color-taupe-grey)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="retro-btn"
                style={{ width: '100%', marginTop: '6px' }}
              >
                <Send size={16} />
                <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

      <style>{`
        @media (min-width: 820px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
