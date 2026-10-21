import React from 'react';
import { Code2, Globe, Database, Palette, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Code2 size={22} color="var(--color-old-rose)" />;
      case 1: return <Globe size={22} color="var(--color-old-rose)" />;
      case 2: return <Database size={22} color="var(--color-old-rose)" />;
      case 3: return <Palette size={22} color="var(--color-old-rose)" />;
      default: return <Code2 size={22} color="var(--color-old-rose)" />;
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
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          A growing toolkit spanning software development, web technologies, databases, cloud platforms, data science, and creative computing.
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
            }}
          >
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-soft-blush)',
                border: '2px solid var(--color-taupe-grey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '2px 2px 0px var(--color-taupe-grey)',
                flexShrink: 0,
              }}>
                {getCategoryIcon(idx)}
              </div>
              <h3 style={{ fontSize: '1.18rem', color: 'var(--color-taupe-grey)', lineHeight: 1.3 }}>
                {category.title}
              </h3>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--color-taupe-grey)', marginBottom: '18px', opacity: 0.9 }}>
              {category.description}
            </p>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    padding: '9px 12px',
                    backgroundColor: 'rgba(255, 219, 218, 0.55)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(var(--color-taupe-grey-rgb), 0.25)',
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--color-taupe-grey)' }}>
                    {skill.name}
                  </span>
                  <span style={{ color: 'var(--color-taupe-grey)', opacity: 0.65, margin: '0 6px' }}>—</span>
                  <span style={{ color: 'var(--color-taupe-grey)', opacity: 0.88 }}>
                    {skill.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* IT Philosophy & Certification Banner */}
      <div className="retro-box" style={{
        backgroundColor: 'var(--color-soft-blush)',
        padding: '28px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      }}>
        <div style={{ maxWidth: '680px' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-taupe-grey)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛠️</span>
            <span>My Development Philosophy</span>
          </h4>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-taupe-grey)', lineHeight: 1.6 }}>
            I enjoy learning how different technologies work together, from writing application logic and designing databases to building websites and experimenting with data. I focus on practical projects, continuous learning, and creating useful, accessible digital experiences.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)', fontSize: '0.82rem', fontWeight: 600 }}>
            <Sparkles size={13} color="var(--color-old-rose)" /> Full-Stack Exploration
          </span>
          <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)', fontSize: '0.82rem', fontWeight: 600 }}>
            <Sparkles size={13} color="var(--color-old-rose)" /> Data-Driven Thinking
          </span>
          <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)', fontSize: '0.82rem', fontWeight: 600 }}>
            <Sparkles size={13} color="var(--color-old-rose)" /> Creative Problem-Solving
          </span>
        </div>
      </div>
    </section>
  );
};
