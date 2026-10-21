import React from 'react';
import { Calendar, Briefcase, GraduationCap, Laptop, Sparkles, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const getCompanyIcon = (role: string, period: string) => {
    if (role.toLowerCase().includes('diploma') || role.toLowerCase().includes('degree')) {
      return <GraduationCap size={15} color="var(--color-old-rose)" />;
    }
    if (period.toLowerCase().includes('ongoing')) {
      return <Laptop size={15} color="var(--color-old-rose)" />;
    }
    return <Briefcase size={15} color="var(--color-old-rose)" />;
  };

  return (
    <section id="experience" style={{
      padding: '64px 24px',
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="retro-pill">
            <Sparkles size={12} color="var(--color-old-rose)" /> Career &amp; Education
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
          Experience &amp; Education
        </h2>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          My journey in computer science and web development, from academic foundations to hands-on industry experience and independent projects.
        </p>
      </div>

      {/* Timeline List */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="retro-box"
            style={{
              padding: '28px',
              backgroundColor: 'var(--color-pale-slate)',
              position: 'relative',
            }}
          >
            {/* Top Period & Role Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '14px',
            }}>
              <div>
                <span className="retro-pill" style={{
                  backgroundColor: 'var(--color-old-rose)',
                  color: 'var(--color-soft-blush)',
                  marginBottom: '8px',
                }}>
                  <Calendar size={12} />
                  {exp.period}
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-taupe-grey)', marginTop: '4px' }}>
                  {exp.role}
                </h3>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--color-taupe-grey)',
                backgroundColor: 'var(--color-soft-blush)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--color-taupe-grey)',
              }}>
                {getCompanyIcon(exp.role, exp.period)}
                {exp.company}
              </div>
            </div>

            <p style={{ fontSize: '0.96rem', color: 'var(--color-taupe-grey)', marginBottom: '18px', lineHeight: 1.6 }}>
              {exp.description}
            </p>

            {/* Key Achievements / Areas of Study */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                display: 'block',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--color-taupe-grey)',
                marginBottom: '10px',
                letterSpacing: '0.5px',
              }}>
                {exp.highlightsLabel || 'KEY HIGHLIGHTS:'}
              </span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {exp.achievements.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--color-taupe-grey)' }}>
                    <CheckCircle2 size={16} color="var(--color-old-rose)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(96, 77, 83, 0.2)',
            }}>
              {exp.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-soft-blush)',
                    border: '1px solid var(--color-taupe-grey)',
                    color: 'var(--color-taupe-grey)',
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
