import React from 'react';
import { Server, Code2, CloudCheck, ShieldAlert, Sparkles, CheckCheck } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Server size={22} color="var(--color-old-rose)" />;
      case 1: return <Code2 size={22} color="var(--color-old-rose)" />;
      case 2: return <CloudCheck size={22} color="var(--color-old-rose)" />;
      case 3: return <ShieldAlert size={22} color="var(--color-old-rose)" />;
      default: return <Server size={22} color="var(--color-old-rose)" />;
    }
  };

  return (
    <section id="skills" style={{
      padding: '64px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="retro-pill">
            <Sparkles size={12} color="var(--color-old-rose)" /> Technical Competencies
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
          IT &amp; Developer Skillset
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: '1.05rem' }}>
          A rigorous blend of low-level systems administration, resilient cloud pipelines, and modern frontend architecture.
        </p>
      </div>

      {/* 4 Category Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {SKILL_CATEGORIES.map((category, idx) => (
          <div
            key={category.title}
            className="retro-box"
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-pale-slate)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-soft-blush)',
                  border: '2px solid var(--color-taupe-grey)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px var(--color-taupe-grey)',
                }}>
                  {getCategoryIcon(idx)}
                </div>
                <h3 style={{ fontSize: '1.18rem', color: 'var(--color-taupe-grey)' }}>
                  {category.title}
                </h3>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)', marginBottom: '20px' }}>
                {category.description}
              </p>

              {/* Skills List with Progress */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-taupe-grey)' }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-soft-blush)',
                        border: '1px solid var(--color-taupe-grey)',
                        color: 'var(--color-taupe-grey)',
                      }}>
                        {skill.tag}
                      </span>
                    </div>

                    {/* Progress Bar in Brand Palette */}
                    <div style={{
                      height: '8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-soft-blush)',
                      border: '1.5px solid var(--color-taupe-grey)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        backgroundColor: 'var(--color-old-rose)',
                        borderRadius: 'var(--radius-full)',
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IT Philosophy & Certification Banner */}
      <div className="retro-box" style={{
        backgroundColor: 'var(--color-soft-blush)',
        padding: '24px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <div style={{ maxWidth: '650px' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '6px', color: 'var(--color-taupe-grey)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛠️</span>
            <span>Infrastructure Engineering Philosophy</span>
          </h4>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)', lineHeight: 1.55 }}>
            Automate routine maintenance with PowerShell and Bash, treat infrastructure as reproducible code, harden edge endpoints with zero-trust principles, and guarantee sub-second load times on free Cloudflare tiers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)' }}>
            <CheckCheck size={14} color="#2b9348" /> Zero Data Loss Track Record
          </span>
          <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)' }}>
            <CheckCheck size={14} color="#2b9348" /> Fast DNS &amp; Cloudflare Edge Ops
          </span>
          <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)' }}>
            <CheckCheck size={14} color="#2b9348" /> Clean TypeScript Architectures
          </span>
        </div>
      </div>
    </section>
  );
};
