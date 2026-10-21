import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playClick(500, 0.04);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(96, 77, 83, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}
    onClick={() => {
      soundEngine.playClick(500, 0.04);
      onClose();
    }}
    >
      <div
        className="retro-box"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-soft-blush)',
          padding: '0',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          backgroundColor: 'var(--color-taupe-grey)',
          color: 'var(--color-soft-blush)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="var(--color-old-rose)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700 }}>
              ARCHITECTURE_SPECS :: {project.id}.spec
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick(500, 0.04);
              onClose();
            }}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-soft-blush)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px' }}>
          {/* Badge & Title */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-old-rose)', color: 'var(--color-soft-blush)' }}>
              {project.category}
            </span>
            <span className="retro-pill" style={{ backgroundColor: 'var(--color-pale-slate)' }}>
              {project.metrics}
            </span>
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--color-taupe-grey)' }}>
            {project.title}
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-taupe-grey)', marginBottom: '24px' }}>
            {project.description}
          </p>

          {/* Architecture Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            
            {/* The Problem */}
            <div style={{
              backgroundColor: 'var(--color-pale-slate)',
              border: '2px solid var(--color-taupe-grey)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-taupe-grey)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} color="var(--color-old-rose)" />
                Challenge &amp; Context
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)', lineHeight: 1.5 }}>
                {project.details.problem}
              </p>
            </div>

            {/* The Solution & Architecture Breakdown */}
            <div style={{
              backgroundColor: 'var(--color-pale-slate)',
              border: '2px solid var(--color-taupe-grey)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-taupe-grey)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#52b788" />
                Technical Implementation &amp; Pipeline
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)', marginBottom: '10px', lineHeight: 1.5 }}>
                {project.details.solution}
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--color-taupe-grey)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {project.details.architecture.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Impact Metric */}
            <div style={{
              backgroundColor: 'rgba(219, 127, 142, 0.15)',
              border: '2px solid var(--color-old-rose)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '1.4rem' }}>📈</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-taupe-grey)' }}>
                  Measurable Result:
                </strong>
                <span style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)' }}>
                  {project.details.impact}
                </span>
              </div>
            </div>

          </div>

          {/* Tech Tag Pills */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-taupe-grey)', marginBottom: '8px' }}>
              TECHNOLOGY MATRIX:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((t) => (
                <span key={t} className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              onClick={() => {
                soundEngine.playClick(600, 0.04);
                onClose();
              }}
              className="retro-btn retro-btn-secondary"
            >
              Close Spec
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playSparkle()}
              className="retro-btn"
            >
              Inspect Repository
              <ArrowUpRight size={16} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
